import axios from 'axios'

// 拦截器
axios.interceptors.response.use(
    res => res.data,
    err => Promise.reject(err),
);
// 获取权限列表
export const getAuth = () => axios.get('/auth');

export default {}