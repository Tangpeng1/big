$(function(){
  $('#go2Reg').on('click',function(){
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })
  $('#go2Login').on('click',function(){
    $('.login-wrap').show()
    $('.reg-wrap').hide()
  })

  //从layui中获取form对象
  let form = layui.form
  let layer = layui.layer
  //通过form.verify() 函数自定义校验规则
  form.verify({
    //自定义了一个叫做pwd校验规则
    pwd:[
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    //校验两次密码是否一致的规则
    repwd:function(value){
      //通过形参拿到的是确认密码框中的内容
      //还需要拿到密码框中的内容
      //然后进行依次等于的判断
      //如果判断失败，则return一个消息提示信息即可
      let pwd = $('.reg-wrap [name=password]').val()
      if(pwd !== value){
        return `两次密码不一致!`
      }
    }  
  })
  //监听注册表单的提交事件
  $('#form_reg').on('submit',function(e){
    e.preventDefault()
    $.post('http://big-event-vue-api-t.itheima.net/api/reg',{username:$('#form_reg[name=username]').val() ,password:$('#form_reg[name=password]').val()},function(res){
      if(res.status !== 0){
        //return console.log(res.message)
        return layer.msg(res.message)
      }
      //console.log('注册成功')
      layer.msg('注册成功，请登录!')
      $('#go2Login').click()
    })
  })

  //监听登录表单的提交事件
  $('#form_login').submit(function(e){
    //阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url:'http://big-event-vue-api-t.itheima.net/api/login',
      method:'POST',
      //快速获取表单中的数据
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('登录失败!')
        }
        layer.msg('登陆成功!')
        //将登陆成功得到的token字符串，保存到localStorage中
        localStorage.setItem('token',res.token)
        //跳转到后台主页
        location.href='/index.html'
      }
    })
  })
})