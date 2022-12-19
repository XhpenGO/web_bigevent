$(function () {
  var layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image');
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  $('#btnChooseImage').on('click', function () {
    $('#file').click()
  })

  // 为文件选择框绑定change事件
  $('#file').on('change', function (e) {
    // 获取用户选择的文件
    var fileList = e.target.files
    console.log(fileList);
    if (fileList.length === 0) {
      return layer.msg('请选择照片!')
    }


    // 替换图片框里面的照片
    // 1、拿到用户选择的文件
    var file = e.target.files[0]
    // 2、根据选择的文件 创建一个对应的url地址
    var imgURL = URL.createObjectURL(file)
    // 3、先摧毁旧的裁剪区域 再重新设置照片路径 ，之后再创建新的裁剪区域(初始化裁剪区)
    $image
      .cropper('destroy') //先摧毁旧的裁剪区域
      .attr('src', imgURL) //再重新设置照片路径
      .cropper(options) //再创建新的裁剪区域

  })
  // 给确定按钮确定绑定事件（提交服务器）
  $('#btnUpload').on('click', function () {
    // 1、拿到用户裁剪之后的头像 （要转换为base64格式）
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        //创建一个Canvas画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') //将Canvas画布上的内容，转换为base64格式的字符串

    // 2、调用接口 图片上传到服务器 21
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function () {
        if (res.status !== 0) {
          return layer.msg('更换头像失败！')
        }
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
      }
    })

  })
})