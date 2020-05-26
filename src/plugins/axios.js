
import 'nprogress/nprogress.css';
import NProgress from 'nprogress'; // https://github.com/rstacruz/nprogress
import axios from 'axios';

let requestsCounter = 0;

NProgress.configure({
  showSpinner: false,
});

const onError = (err) => {
  if (!err || !err.response) return {};
  requestsCounter -= 1;
  if (requestsCounter === 0) {
    NProgress.done();
  }
  return Promise.reject(err.response.data);
};

const onSuccess = (res) => {
  requestsCounter -= 1;
  if (requestsCounter === 0) {
    NProgress.done();
  }
  return Promise.resolve(res.data);
};

const setProgress = ({ loaded, total }) => {
  const progress = (Math.floor(loaded * 1.0) / total);
  NProgress.inc(progress);
};

const setConfig = (config) => {
  requestsCounter += 1;
  NProgress.start();
  return config;
};

axios.defaults.baseURL = process.env.VUE_APP_API || 'https://dog.ceo/api/';
axios.defaults.onUploadProgress = setProgress;
axios.defaults.onDownloadProgress = setProgress;
axios.interceptors.request.use(setConfig);
axios.interceptors.response.use(onSuccess, onError);

export default axios;
