const hasSessionStorage = ('sessionStorage' in window);
const defaultKey = 'appState';

export const clearSession = () => {
  if (hasSessionStorage) {
    sessionStorage.clear();
  }
};

export const getSession = (key = defaultKey) => {
  if (hasSessionStorage) {
    const appStorage = sessionStorage.getItem(key);

    try {
      if (appStorage) {
        return JSON.parse(appStorage);
      }
    } catch (err) {
      return {};
    }
  }

  return {};
};

export const setSession = (key = defaultKey, state = {}) => {
  if (hasSessionStorage) {
    try {
      sessionStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.log('SESSION ERROR: ', err); // eslint-disable-line no-console
      return {};
    }
  }

  return {};
};

export default {
  clearSession,
  getSession,
  setSession,
};
