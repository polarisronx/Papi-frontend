// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** sendUserMail GET /api/mail/sendCode */
export async function sendUserMailUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendUserMailUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/mail/sendCode', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
