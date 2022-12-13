// 每次调用$.gte() /$.post() /$.ajax()的时候，会先调用ajaxPrefilter（）这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  console.log(options.url);
  // 在发起真正的ajax请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  console.log(options.url);

  // 统一为有权限的接口设置 headers请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }


  // 全局统一挂载complete 回调函数
  options.complete = function (res) {
    console.log('执行了complete回调函数');
    console.log(res);
    // 在complete回调函数中可以使用 res.responseJSON 拿到服务器相应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.massage === '身份认证失败！') {
      // 1.强制清空token
      localStorage.removeItem('token')
      // 2.强制跳转登录页面
      location.href = '/login.html'
    }

  }
})