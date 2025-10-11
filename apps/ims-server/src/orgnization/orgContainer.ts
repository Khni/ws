import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  InjectionMode,
  AwilixContainer,
  Resolver,
} from "awilix";
function enforceClass<T>(
  c: new (...args: any[]) => T
): new (...args: any[]) => T {
  return c;
}

function enforceValue<T>(v: T): T {
  return v;
}

function enforceFunction<T extends (...args: any[]) => any>(f: T): T {
  return f;
}
export const appDeps = {};
type AppDeps = {
  [K in keyof typeof appDeps]: (typeof appDeps)[K] extends Resolver<infer T>
    ? T
    : never;
};

export type AppContainer = AwilixContainer<AppDeps>;

const container: AppContainer = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});
container.register(appDeps);

export default container;
