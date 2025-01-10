import axios from 'axios';

const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v0", // 设置统一的请求前缀
    timeout: 5000, // 设置统一的超时时长
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        // 例如，如果有token，可以在这里统一设置
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        // 对请求错误做些什么
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        const res = response.data;
        // 你可以根据自己项目的需要来定制当响应状态码是什么时做哪些操作
        if (res.code !== 200) {
            // 如果返回的状态不是200，则视为错误
            console.error('Error Response:', res.message);
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    error => {
        // 对响应错误做点什么
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

export default service;
