import React from 'react';
import { history, RequestConfig } from 'umi';
import { UseRequestProvider } from 'ahooks';
import { defaultConfig } from './utils/axios';



// https://umijs.org/zh-CN/docs/runtime-config#rootcontainerlastrootcontainer-args
export function rootContainer(container: any) {
  return React.createElement(
    ({ children }) => {
      return (
        <UseRequestProvider value={defaultConfig}>
          {children}
        </UseRequestProvider>
      );
    },
    {},
    container,
  );
}
