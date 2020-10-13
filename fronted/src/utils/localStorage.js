const prefix = 'cl-';
const localStorage = {
  // 存
  set(key, val) {
    if (Object.prototype.toString.call(val) !== '[object Undefined]') {
      window.localStorage.setItem(prefix + key, JSON.stringify(val));
    }
  },
  // 取
  get(key) {
    let str = window.localStorage.getItem(prefix + key);
    try {
      return JSON.parse(str);
    } catch (e) {
      return str;
    }
  },
  // 删
  del(key) {
    window.localStorage.removeItem(prefix + key);
  },
};

export default localStorage;

export const localStorageKey = {
  user: 'user',
  token: 'token',
};
