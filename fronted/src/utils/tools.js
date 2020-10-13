import localStorage, { localStorageKey } from './localStorage';

export const getToken = function() {
  return localStorage.get(localStorageKey.token) || {};
};
export const setToken = function(data) {
  localStorage.set(localStorageKey.token, {
    token: data.accessToken,
    expire: new Date().getTime() + data.expiresIn * 1000,
    expiresIn: data.expiresIn,
  });
};
export const delToken = function() {
  localStorage.del(localStorageKey.token);
};

export const convertToParams = function(originData, filters) {
  const newData = { ...originData };
  const emptyValueList = [null, '', undefined];
  let filterList = [];
  filters.forEach(filter => {
    // 时间区间特殊处理
    if (filter.condition === 'between') {
      const newFilter = { ...filter };
      newFilter.from = newData[filter.from] || null;
      newFilter.to = newData[filter.to] || null;
      // 有开始时间或者结束时间才添加这个filter
      if (newFilter.from || newFilter.to) {
        filterList.push(newFilter);
      }
      // 删掉多余的key
      delete newData[filter.from];
      delete newData[filter.to];
    } else if (newData.hasOwnProperty(filter.key)) {
      // 查询条件非null才添加这个filter
      if (!emptyValueList.includes(newData[filter.key])) {
        filterList.push({
          ...filter,
          value: newData[filter.key],
        });
      }
      // 删掉多余的key
      delete newData[filter.key];
    }
  });
  newData.filters = JSON.stringify(filterList);
  return newData;
};
