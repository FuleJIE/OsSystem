import axios from "axios";
axios.defaults.headers["Content-Type"] = "application/json";
//创建axios实例
const requests = axios.create({
  baseURL: "",
  timeout: 10 * 1000,
});

//请求拦截器
requests.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default requests;
