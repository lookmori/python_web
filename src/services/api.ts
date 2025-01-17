import { request } from '@umijs/max';


const BASEURL = 'http://127.0.0.1:7001';
/** 登录 */
export async function loginUser(options?: { [key: string]: any }) {
  
  return request(`${BASEURL}/user/login`, {
    method: 'POST',
    data: { ...options },
  });
}

// 注册用户
export async function registerUser(options?: { [key: string]: any }) {
  return request('/user/register', {
    method: 'POST',
    ...(options || {}),
  });
}
