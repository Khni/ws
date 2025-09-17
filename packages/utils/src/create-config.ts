// Generic config factory
function hasLogger(
  obj: unknown
): obj is { logger: { info: (msg: string) => void } } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "logger" in obj &&
    typeof (obj as any).logger?.info === "function"
  );
}

export function createConfig<T extends object>(name: string) {
  let _config: T | null = null;

  return {
    set: (options: T) => {
      _config = options;
      if (hasLogger(options)) {
        options.logger.info(`[${name}Config] initialized`);
      } else {
        console.log(`[${name}Config] initialized`);
      }
    },
    get: (): T => {
      if (!_config) throw new Error(`[${name}Config] is not initialized.`);
      return _config;
    },
  };
}
