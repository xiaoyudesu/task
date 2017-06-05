/**
 * Created by xiaoyudesu on 5/20/2017.
 */


/*

// 方法一:原生ajax
var btn=document.getElementsByTagName("button")[0];
btn.addEventListener("click",function(){
    var text=document.getElementsByClassName("text")[0].value;
    var pwd=document.getElementsByClassName("pwd")[0].value;
    var tip=document.getElementsByClassName("tip")[0];
    var  ajax;

    if(window.XMLHttpRequest){
        ajax=new XMLHttpRequest();
    }else{
        ajax=new ActiveXObject();
    }

    ajax.onreadystatechange=function(){
        if((ajax.readyState == 4)&&(ajax.status = 200)){
            // tip.innerHTML=JSON.parse(ajax.responseText).message;
            alert(JSON.parse(ajax.responseText).message);

            if(JSON.parse(ajax.responseText).message=="success"){
                location.href="http://dev.admin.carrots.ptteng.com/";
            }
        }
    }

    ajax.open("POST", "/carrots-admin-ajax//a/login", true);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send("name="+text+"&pwd="+pwd);
});


*/








//方法二，jquery的ajax
$("button").on("click",function(){
    $.post("/carrots-admin-ajax/a/login",{
        name: $(".text").val(),
        pwd: $(".pwd").val(),

    },function(data){
        alert(JSON.parse(data).message);
        if(JSON.parse(data).message=="success"){
            location.href="http://dev.admin.carrots.ptteng.com/";
        }
    });
});



var patt1=/[^\w\d_\s\u4e00-\u9fa5]/g;
var patt2=/[^\w\d_\s]/g;



$(".text").keydown(function(){
    if(patt1.test($(".text").val())){
        $(".p1").text("请输入字母数字或汉字、下划线");
    }else{
        $(".p1").text("");
    }

    if($(".text").val().length < 4){
        $(".p1").text("最少4个字符");
    }
});

$(".pwd").keydown(function(){
    if(patt2.test($(".pwd").val())){
        $(".p2").text("请输入字母数字或下划线");
    }else{
        $(".p2").text("");
    }

    if($(".pwd").val().length < 4){
        $(".p2").text("最少4个字符");
    }
    //checkpassword
    //confug.pwd.tips=
});


