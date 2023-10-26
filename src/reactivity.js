const dependencies = new Set();
export const reactive = initialObject => {
  const keyToSymbol = new Map();
  const getDependencySymbolForKey = key => {
    const symbol = keyToSymbol.get(key) ?? Symbol();
    keyToSymbol.set(key, symbol);
    return symbol;
  };
  return new Proxy(initialObject, {
    get: (target, key) => {
      dependencies.add(getDependencySymbolForKey(key));
      return target[key];
    },
    set: (target, key, newValue) => {
      target[key] = newValue;
      const callbacks = dependencyToCallbacks.get(getDependencySymbolForKey(key)) ?? new Set();
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

export const ref = initialValue => reactive({ value: initialValue });

export const computed = getValue => {
  const r = ref();
  watchEffect(() => {
    r.value = getValue();
  });
  return r;
};
