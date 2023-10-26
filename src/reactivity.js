const dependencies = new Set();
export const reactive = initialObject => {
  return new Proxy(initialObject, {
    get: (target, key) => {
      dependencies.add(key);
      return target[key];
    },
    set: (target, key, newValue) => {
      target[key] = newValue;
      const callbacks = dependencyToCallbacks.get(key) ?? new Set();
      for (const callback of callbacks) {
        callback();
      }
      return true;
    },
  });
};

const dependencyToCallbacks = new Map();
export const watchEffect = callback => {
  dependencies.clear();
  callback();

  for (const dep of dependencies) {
    const callbacks = dependencyToCallbacks.get(dep) ?? new Set();
    callbacks.add(callback);
    dependencyToCallbacks.set(dep, callbacks);
  }
};
