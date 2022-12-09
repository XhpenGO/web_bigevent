$(function () {
  //点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去注册账号”的链接
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // Layui 中获取 form 对象(前提要导入layui.js脚本)
  var form = layui.form

  var layer = layui.layer
  // 通过 form.verify() 函数来自定义校验规则
  form.verify({
    // 自定义了名称为'pwd' 的校验规则
    'pwd': [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'],
    // 校验密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的确认密码框中的内容
      // 也需要拿到密码框中的内容
      // 然后进行一次等号判断
      // 如果判断失败 则return一个提示消息
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码输入密码不一致!'
      }
    }

  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()//阻止表单默认行为
    // 发起ajax的post请求
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg[name=password]').val() }
    $.post('http://ajax.frontend.ithaima.net/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg('res.message')
      }
      layer.msg('注册成功，请登录！')

      // 模拟人的点击行为
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault() //阻止默认提交行为
    $.ajax({
      url: 'http://ajax.frontend.itheima.net/api/login',
      method: 'POST',
      // serialize()快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        return layer.msg('登录成功')

        // 将登录成功得到的token 字符串 ，保存到locaStorage中
        localStorage.setItem('token', res.token)
        console.log(res.token);
        //跳转到后台主页
        location.href = '/index.html'
      }
    })
  })

})
16