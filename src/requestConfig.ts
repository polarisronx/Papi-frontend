﻿import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message } from 'antd';
import Cookies from 'js-cookie';
// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  baseURL: 'http://localhost:7529',
  // 携带 cookie
  withCredentials: true,
  // 错误处理： umi@3 的错误处理方案。（已被移除）

  // 请求拦截器
  requestInterceptors: [
    // 拦截请求配置，进行个性化处理。
    (url: string, config: RequestOptions) => {
      const newConfig = { ...config };
      newConfig.headers = {
        ...newConfig.headers,
        // 添加请求头
        Authorization: Cookies.get('token')?.toString() || '',
      };
      return { ...config, url, options: newConfig };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      // 打印响应数据用于调试
      console.log('response data:', data);
      const { code } = data;
      // 响应成功，返回响应
      if (data && code === 0) {
        return response;
      } else {
        switch (code) {
          case 40100:
            history.push('/user/login');
            break;
          default:
            // if (location.pathname.includes("/")) {
            //   break
            // }

            message.error(data.message);
            break;
        }
      }
      return response;
    },
  ],
};
