$(function () {
  var form = layui.form
  var layer = layui.layer
  // 自定义昵称验证规则
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间'
      }
    }
  })

  initUserInfo()

  // 初始化用户信息  11
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败')
        }
        console.log(res);

        // 调用form.val()快速为表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }

  //绑定重置按钮的点击事件_____重置表单的数据
  $('#btnReset'), on('click', function (e) {
    // 阻止表单默认重置行为
    e.preventDefault()
    // 再次初始化用户信息
    initUserInfo()
  })

  // 监听表单的提交事件
  $('#layui-form').on('submit', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault()
    // 发起ajax数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      // 这个this代表当前的表单  // .serialize()快速拿到表单数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')

        // 调用父页面中的方法，重新渲染头像及信息
        window.parent.getUserInfo()
      }
    })
  })
})