// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/style.less'
import store from './store'
import axios from 'axios';

Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  store
})

axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('accessToken')) { //判断token是否存在
      config.headers.token = localStorage.getItem('accessToken');  //将token设置成请求头
      // console.log(config)
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(response => {
  if (response) {
    var resultCode = response.data.resultCode;
    console.log(resultCode)
    switch (resultCode) {
      case '401': {
        alert(response.data.resultMessage)
        if (localStorage.getItem('userInfo')) {
          localStorage.removeItem('userInfo');
          localStorage.removeItem('accessToken');
          window.location.reload();
        }
        var that = this;
        that.$confirm('登录后即可点赞和收藏，是否前往登录页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//确定，跳转至登录页面
          //储存当前页面路径，登录成功后跳回来
          localStorage.setItem('logUrl', that.$route.fullPath);
          that.$router.push({path: '/Login?login=1'});
        }).catch(() => {

        });
      }
    }
  }
  return response;
}, error => {
  return Promise.reject(error.response.data.resultMessage) //返回接口返回的错误信息
})
