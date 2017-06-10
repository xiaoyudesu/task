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

 ajax.open("POST", "/daili/a/login", true);
 ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
 ajax.send("name="+text+"&pwd="+pwd);
 });


 */











//方法二，jquery的ajax

function ajax() {

    // console.log(b);
    if (a[a.length - 1] == 1 && b[b.length - 1] == 1) {
        $("button").css({
            "cursor": "pointer",
            "background-color": "#03a9f4"
        });

        //最后一位做个标记
        a[a.length - 2] = 2;
        b[b.length - 2] = 2;

        console.log(a);
        console.log(b);
        // console.log(a);
        //查看上次是否已经循环过了
        if ((a[a.length - 4] !== 2) && (b[b.length - 4] !== 2)) {

            $("button").on("click", function () {
                $.post("http://localhost/daili/a/login", {
                    name: $(".name").val(),
                    pwd: $(".pwd").val(),
                }, function (data) {
                    alert(JSON.parse(data).message);
                    console.log($(".name").val());
                    console.log($(".pwd").val());
                    if (JSON.parse(data).message == "success") {
                        location.href = "http://dev.admin.carrots.ptteng.com/";
                    }
                });
            });
        }

    } else {
        $("button").css({
            "cursor": "not-allowed",
            "background-color": "#29bde0"
        });
    }

}


var patt1 = /^[0-9a-zA-Z\u4e00-\u9fa5_]{4,16}$/g;
var patt2 = /^\w{4,16}$/g;
var a = [], b = [];

$(".name").keyup(function () {
    a[a.length] = 0;

    if ($(this).val().length < 4) {
        $(".p1").text("最少4个字符");
    } else {
        if (!($(".name").val().match(patt1))) {
            $(".p1").text("请输入字母数字或汉字、下划线");
        } else {
            $(".p1").text("");
            a[a.length] = 1;
        }
    }

    ajax();
});

$(".pwd").keyup(function () {
    b[b.length] = 0;

    if ($(this).val().length < 4) {
        $(".p2").text("最少4个字符");
    } else {
        if (!($(".pwd").val().match(patt2))) {
            $(".p2").text("请输入字母数字或汉字、下划线");
        } else {
            $(".p2").text("");
            b[b.length] = 1;
        }
    }

    ajax();
});

