/*eslint-disable*/
import Axios from 'axios';
import qs from 'qs';
import {message} from 'antd';

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map();
const _this = this
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config) => {
    const url = [
        config.method,
        config.url,
    ].join('&');
    config.cancelToken =
        config.cancelToken ||
        new Axios.CancelToken((cancel) => {
            if (!pending.has(url)) {
                // 如果 pending 中不存在当前请求，则添加进去
                pending.set(url, cancel);
            }
        });
};

/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data),
    ].join('&');
    if (pending.has(url)) {
        // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
        const cancel = pending.get(url);
        cancel(url);
        pending.delete(url);
    }
};

const axiosInstance = Axios.create({
    baseURL: 'api',
    timeout: 500000000,
});
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
axiosInstance.clearPending = () => {
    for (const [url, cancel] of pending) {
        cancel(url);
    }
    pending.clear();
};

axiosInstance.defaults.retry = 4;
axiosInstance.defaults.retryDelay = 1000;

axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const accessToken = localStorage.getItem('token') ? localStorage.getItem('token') : 'Basic Y29udHJhY3RfbGliOmNvbnRyYWN0X2xpYg==';
            if (accessToken) {
                config.headers['Authorization'] = accessToken;
            }
            const PAY_UA =  sessionStorage.getItem("PAY_UA")
            // 判断是不是支付接口添加PAY_UA请求头
            if(PAY_UA){
                config.headers['PAY_UA'] = PAY_UA
            }

            removePending(config); // 在请求开始前，对之前的请求做检查取消操作
            // addPending(config); // 将当前请求添加到 pending 中
            return config;
        } catch (e) {
            console.log(e);
        }
    },
    (error) => {
        Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        removePending(response); // 在请求结束后，移除本次请求
        const errorMsg = ['10001'];
        // 统一处理返回的错误数据 //  && response.data.msg !== '找不到该RFID信息'
        if (response.data.code === -1 && errorMsg.indexOf(response.data.msg) === -1) {
            // message.error(response.data.msg);
        }
        return response.data;
    },
    (error) => {
        const code = error.response.status;
        if (error.response.status == 424){
            // message.error('用户状态已过期请重新登录！');
            localStorage.clear();
            return
        }
        if (!error.response) {
            // 断网了
            // message.error({
            //     title: '您的网络有问题，请稍后再试',
            //     duration: 2500,
            // });
            return Promise.reject(error);
        }
        if (error.toString().indexOf('Error: timeout') !== -1) {
            // message.error({
            //     title: '网络请求超时',
            //     duration: 2500,
            // });
            return Promise.reject(error);
        }
        if (error.toString().indexOf('Error: Network Error') !== -1) {
            // message.error({
            //     title: '网络请求错误',
            //     duration: 2500,
            // });
            return Promise.reject(error);
        }
        if (code === 504) {
            // message.error({
            //     title: '服务器异常',
            //     duration: 2500,
            // });
            return Promise.reject(error);
        }
        if (code === 401) {
            // message.error(error.response.data.msg);
            // 未支付
        }else if( code === 402){
            return error.response
        }else if (code === 403) {
            // message.error('拒绝访问');
        }else if( code === 424 ){
            // message.error('身份过期请重新登录');
            localStorage.clear();
        } else {
            const errorMsg = error.response.data.msg;
            const path = error.response.data.path;
            if (errorMsg !== undefined) {
                if (errorMsg === 'No message available') {
                    // message.error('无可用讯息');
                    // message.error(`${path} 接口：暂时无法使用,请联系后台开发人员`);
                } else {
                    // message.error(errorMsg);
                }
            }
        }
    },
);

export default axiosInstance;
