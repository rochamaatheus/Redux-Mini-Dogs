function getLocalStorage(key, initial) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return initial;
  }
}

export default getLocalStorage;
