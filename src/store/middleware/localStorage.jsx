const localStorage = (store) => (next) => (action) => {
  const r = next(action);
  const { meta } = action;
  if (meta && meta.localStorage) {
    const { key, value } = meta.localStorage;
    localStorage.setItem(key, JSON.stringify(value));
  }
  return r;
};

export default localStorage;
