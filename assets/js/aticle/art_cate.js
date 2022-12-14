$(function () {
  var layer = layui.layer
  var form = layui.form

  // 获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)

      }
    })
  }

  // 为添加类别按钮绑定点击事件
  var indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '240px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    });
  })

  // 通过代理的形式 为form - add表单绑定submit提交事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),//快速拿到表单里面的值
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('新增失败！')
        }
        initArtCateList()
        layer.msg('新增分类成功！')
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd)
      }
    })
  })

  //通过代理的形式 为btn_edit按钮绑定点击事件
  var indexEdit = null
  $('tbody').on('click', '#btn_edit', function () {
    // 弹出修改文章信息分类的层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '240px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    });
    // attr('data-id') 拿到data-id 的值
    var id = $(this).attr('data-id')
    // 发起请求 获取对应分类数据 2
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data)
      }
    })
  })

  //通过代理的形式 为修改分类的表单按钮绑定submit事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),//快速拿到表单数据
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败')
        }
        return layer.msg('更新分类数据成功')
        layer.close(indexEdit) //关闭弹出层.
        initArtCateList() //重新获取分类列表
      }
    })
  })

  // 通过代理的形式，为删除按钮绑定点击事件
  $('tbody').on('click', 'btn-delete', function () {
    var id = $(this).attr('data-id')
    // 提示用户是否需要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败')
          }
          return layer.msg('删除分类成功')
          layer.close(index);
          initArtCateList()
        }
      })


    });
  })
})