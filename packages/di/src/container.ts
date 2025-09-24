/*
Dependency Injection Container (TypeScript)

Features:
- Register by token (string | symbol | constructor)
- Lifetimes: singleton, transient, scoped
- Providers: useClass (with explicit deps), useFactory (sync/async), useValue
- Aliases and multiple bindings (resolveAll)
- Child containers (scoped resolution)
- Async-safe resolution with cycle detection
- Disposal hooks (onDispose)

Usage examples at the bottom.
*/

type Token<T = any> = string | symbol | Constructor<T>;

type Constructor<T = any> = new (...args: any[]) => T;

type Lifetime = "singleton" | "transient" | "scoped";

// Provider shapes
interface UseClassProvider<T = any> {
  useClass: Constructor<T>;
  deps?: Token[]; // explicit dependency tokens for constructor
  lifetime?: Lifetime;
}

interface UseFactoryProvider<T = any> {
  useFactory: (container: Container) => T | Promise<T>;
  lifetime?: Lifetime; // factory can still be singleton/transient/scoped
}

interface UseValueProvider<T = any> {
  useValue: T;
  lifetime?: Lifetime; // ignored, value is effectively singleton
}

type Provider<T = any> =
  | UseClassProvider<T>
  | UseFactoryProvider<T>
  | UseValueProvider<T>;

interface Registration<T = any> {
  token: Token<T>;
  provider: Provider<T>;
  multiple?: boolean; // allow registering multiple bindings for the same token
}

class ResolutionError extends Error {}
class CircularDependencyError extends ResolutionError {}

export class Container {
  private registry = new Map<Token, Registration[]>();
  private singletons = new Map<Token, any>();
  private scopedInstances = new Map<Token, any>();
  private disposables = new Map<Token, () => void | Promise<void>>();
  private parent?: Container;

  constructor(parent?: Container) {
    this.parent = parent;
  }

  // --- registration convenience methods ---
  register<T = any>(
    token: Token<T>,
    provider: Provider<T>,
    options?: { multiple?: boolean }
  ) {
    const reg: Registration<T> = {
      token,
      provider,
      multiple: !!options?.multiple,
    };
    const arr = this.registry.get(token) ?? [];
    if (!options?.multiple && arr.length > 0) {
      // overwrite previous registrations (default behaviour)
      this.registry.set(token, [reg]);
    } else {
      arr.push(reg);
      this.registry.set(token, arr);
    }
    return this;
  }

  registerValue<T = any>(token: Token<T>, value: T) {
    return this.register(token, { useValue: value }, { multiple: false });
  }

  registerFactory<T = any>(
    token: Token<T>,
    factory: (c: Container) => T | Promise<T>,
    lifetime: Lifetime = "transient"
  ) {
    return this.register(
      token,
      { useFactory: factory, lifetime },
      { multiple: false }
    );
  }

  registerClass<T = any>(
    token: Token<T>,
    ctor: Constructor<T>,
    deps: Token[] = [],
    lifetime: Lifetime = "transient"
  ) {
    return this.register(
      token,
      { useClass: ctor, deps, lifetime },
      { multiple: false }
    );
  }

  registerSingletonClass<T = any>(
    token: Token<T>,
    ctor: Constructor<T>,
    deps: Token[] = []
  ) {
    return this.registerClass(token, ctor, deps, "singleton");
  }

  registerTransientClass<T = any>(
    token: Token<T>,
    ctor: Constructor<T>,
    deps: Token[] = []
  ) {
    return this.registerClass(token, ctor, deps, "transient");
  }

  registerAlias<T = any>(alias: Token<T>, original: Token<T>) {
    // alias resolves by factory that resolves original
    return this.registerFactory(alias, (c) => c.resolve(original), "transient");
  }

  // allow multiple registrations for a single token (e.g. plugins)
  add<T = any>(token: Token<T>, provider: Provider<T>) {
    return this.register(token, provider, { multiple: true });
  }

  // create child container (scoped)
  createChild() {
    return new Container(this);
  }

  // dispose hook registration
  onDispose<T = any>(token: Token<T>, disposer: () => void | Promise<void>) {
    this.disposables.set(token, disposer);
  }

  async dispose() {
    // run disposers for this container (not parents)
    const disposers = Array.from(this.disposables.values()).reverse();
    for (const d of disposers) {
      await d();
    }
    // clear maps
    this.singletons.clear();
    this.scopedInstances.clear();
    this.disposables.clear();
  }

  // --- resolution ---
  async resolve<T = any>(token: Token<T>): Promise<T> {
    return this._resolve(token, new Map());
  }

  // resolve all bindings for token (for multi-binding scenarios)
  async resolveAll<T = any>(token: Token<T>): Promise<T[]> {
    const regs = this.lookupRegistrations(token);
    if (regs.length === 0) {
      // fallback to parent
      if (this.parent) return this.parent.resolveAll(token);
      return [];
    }
    const results: T[] = [];
    for (const r of regs) {
      results.push(await this._resolveRegistration(r, new Map()));
    }
    return results;
  }

  // internal helpers
  private lookupRegistrations<T>(token: Token<T>): Registration<T>[] {
    const regs = this.registry.get(token) as Registration<T>[] | undefined;
    if (regs && regs.length) return regs;
    if (this.parent) return this.parent.lookupRegistrations(token);
    return [];
  }

  private async _resolve(
    token: Token,
    trace: Map<Token, boolean>
  ): Promise<any> {
    const regs = this.lookupRegistrations(token);
    if (regs.length === 0) {
      throw new ResolutionError(
        `No provider registered for token: ${String(token)}`
      );
    }
    // default behaviour: use the first registration
    const reg = regs[0];
    return this._resolveRegistration(reg, trace);
  }

  private async _resolveRegistration(
    reg: Registration,
    trace: Map<Token, boolean>
  ): Promise<any> {
    const token = reg.token;

    // cycle detection
    if (trace.get(token)) {
      const path =
        Array.from(trace.keys())
          .map((t) => String(t))
          .join(" -> ") + ` -> ${String(token)}`;
      throw new CircularDependencyError(
        `Circular dependency detected: ${path}`
      );
    }

    trace.set(token, true);

    // determine lifetime
    const lifetime =
      (reg.provider as any).lifetime ?? inferLifetime(reg.provider);

    if (lifetime === "singleton") {
      const parentHolder = this.getSingletonHolder(token);
      if (parentHolder.has(token)) {
        trace.delete(token);
        return parentHolder.get(token);
      }
      const value = await this.instantiateProvider(reg.provider, trace);
      parentHolder.set(token, value);
      trace.delete(token);
      return value;
    }

    if (lifetime === "scoped") {
      // scoped instances should be stored on the nearest container (this) that asked for the scope
      if (this.scopedInstances.has(token)) {
        const v = this.scopedInstances.get(token);
        trace.delete(token);
        return v;
      }
      const v = await this.instantiateProvider(reg.provider, trace);
      this.scopedInstances.set(token, v);
      trace.delete(token);
      return v;
    }

    // transient
    const val = await this.instantiateProvider(reg.provider, trace);
    trace.delete(token);
    return val;
  }

  private getSingletonHolder(token: Token) {
    // singletons live on the root-most container (so siblings share singletons from ancestor)
    let root: Container = this;
    while (root.parent) root = root.parent;
    return root.singletons;
  }

  private async instantiateProvider(
    provider: Provider,
    trace: Map<Token, boolean>
  ) {
    if ((provider as UseValueProvider).useValue !== undefined) {
      return (provider as UseValueProvider).useValue;
    }
    if ((provider as UseFactoryProvider).useFactory) {
      const f = (provider as UseFactoryProvider).useFactory;
      const res = f(this);
      if (res && typeof (res as any).then === "function") return await res;
      return res;
    }
    if ((provider as UseClassProvider).useClass) {
      const pc = provider as UseClassProvider;
      const deps = pc.deps ?? [];
      const resolvedDeps: any[] = [];
      for (const d of deps) {
        const depVal = await this._resolve(d, trace);
        resolvedDeps.push(depVal);
      }
      return new pc.useClass(...resolvedDeps);
    }

    throw new ResolutionError(
      `Invalid provider for ${String((provider as any).token)}`
    );
  }
}

function inferLifetime(provider: Provider): Lifetime {
  if ((provider as UseValueProvider).useValue !== undefined) return "singleton";
  return (provider as any).lifetime ?? "transient";
}

// ------------------ USAGE EXAMPLES ------------------

// Tokens
const TOK = {
  Config: Symbol("Config"),
  Logger: Symbol("Logger"),
  ServiceA: Symbol("ServiceA"),
  ServiceB: Symbol("ServiceB"),
};

// Interfaces / classes
interface Config {
  baseUrl: string;
}

class Logger {
  constructor(public prefix = "") {}
  log(msg: string) {
    console.log(`${this.prefix}${msg}`);
  }
}

class ServiceA {
  constructor(
    private logger: Logger,
    private cfg: Config
  ) {}
  doWork() {
    this.logger.log(`ServiceA working with ${this.cfg.baseUrl}`);
  }
}

class ServiceB {
  constructor(private a: ServiceA) {}
  run() {
    this.a.doWork();
  }
}

// Build a container and register dependencies
const root = new Container();
root.registerValue(TOK.Config, { baseUrl: "https://example.com" } as Config);
root.registerSingletonClass(TOK.Logger, Logger, []); // no deps
// register ServiceA using useFactory to show flexibility (resolve async if needed)
root.registerFactory(
  TOK.ServiceA,
  async (c) => {
    const logger = await c.resolve<Logger>(TOK.Logger);
    const cfg = await c.resolve<Config>(TOK.Config);
    return new ServiceA(logger, cfg);
  },
  "scoped"
);

root.registerClass(TOK.ServiceB, ServiceB, [TOK.ServiceA], "transient");

(async () => {
  // resolve
  const child = root.createChild();
  const b = await child.resolve<ServiceB>(TOK.ServiceB);
  b.run();

  // multi binding example
  const PLUGIN = Symbol("Plugin");
  root.add(PLUGIN, { useValue: "p1" });
  root.add(PLUGIN, { useValue: "p2" });
  const plugins = await root.resolveAll<string>(PLUGIN);
  console.log("plugins:", plugins);

  // disposal example
  root.onDispose(TOK.Logger, async () => {
    console.log("Logger disposed");
  });

  await root.dispose();
})();
