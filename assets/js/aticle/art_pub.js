$(function () {
  var layer = layui.layer
  var form = layui.form

  initCate()
  // 初始化富文本编辑器
  initEditor()

  // 定义加载文章分类方法
  function initCate() {
    ajax({
      method: 'GET',
      url: '/my/article/cate',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('初始化文章分类失败')
        }
        // 调用模板引擎，渲染下拉菜单
        var htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        // 注意调用form.render()方法，重新渲染28
        form.render()

      }
    })
  }

  // 图片裁剪区域
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image');

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 400 / 592,
    // 指定预览区域
    preview: '.img-preview'
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);


  // 选择文件框 绑定点击事件函数
  $('#btnChooseImage').on('click', function () {
    $('#coverFile').click()
  })

  // 监听coverFile 的change事件 ，获取用户选择的文件列表
  $('#coverFile').on('change', function (e) {
    // 获取文件的列表数组
    var files = e.target.files
    // 判读用户事件是否选择了文件
    if (files.length === 0) {
      return
    }
    // 根据文件 创建对应的URL 地址
    var newImgURL = URL.createObjectURL(files[0])
    // 为裁剪区重新设置图片
    $image
      .cropper('destroy') //先摧毁旧的裁剪区域
      .attr('src', newImgURL) //再重新设置照片路径
      .cropper(options) //再创建新的裁剪区域
  })

  // 定义文章的发布状态
  var art_state = '已发布'

  // 为存为草稿按钮 绑定点击事件处理函数
  $('#btnSave2').on('click', function () {
    art_state = '草稿'
  })

  // 为表单绑定submit提交事件
  $('#form-pud').on('submit', function (e) {
    // 1.阻止表单的默认提交行为
    e.preventDefault()
    // 2.基于form表单 快速创建一个FormDate对象（其中包含了相对于的title之类的数据）
    var fd = new FormData($(this)[0])
    // 3.将文章的发布状态 存在fd中
    fd.append('state', art_state)
    // 4.将裁剪后的封面 输出为一个文件对象
    $image
      .cropper('getCroppedCanvas', {
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {
        // 将画布上的内容 装换为文件对象
        // 得到文件对象后 进行后续的操作

        // 5.将文件对象 存到fd中
        fd.append('cover_img', blob)
        // 6.发起ajax数据请求
        publishArticle(fd)
      })
  })

  // 定义一个发布文章的方法
  function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      // 向服务器提交的是FormData格式的数据 必须添加一下2个属性
      contentType: false,
      precessData: false,
      success: function (res) {
        if (condition) {

        }
      }


    })
  }

})