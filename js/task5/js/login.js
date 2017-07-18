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

    //判断输入框是否正确，且是否已经循环。
    if ((a[0] == 1 && b[0] == 1)) {

        if (!(a[1] || b[1])) {
            $("button").on("click", function () {
                $.post("/carrots-admin-ajax/a/login", {
                    name: $(".name").val(),
                    pwd: $(".pwd").val()
                }, function (data) {
                    alert(JSON.parse(data).message);
                    console.log($(".name").val());
                    console.log($(".pwd").val());
                    if (JSON.parse(data).message === "success") {
                        location.href = "http://dev.admin.carrots.ptteng.com/";
                    }
                });
            });
        } else {

            $("button").css({
                "cursor": "pointer",
                "background-color": "#03a9f4"
            });
            //启用按钮
            $("button").attr("disabled", false);

        }

        //循环时做个标记
        a[1] = 2;
        b[1] = 2;

    } else {
        $("button").css({
            "cursor": "not-allowed",
            "background-color": "#29bde0"
        });
        //禁用按钮
        $("button").attr("disabled", true);
    }
}


var patt1 = /^[0-9a-zA-Z\u4e00-\u9fa5_]{4,16}$/g;
var patt2 = /^\w{4,16}$/g;
var a = [], b = [];

$(".name").keyup(function () {
    // console.log("a"+a);
    // console.log("b"+b);
    // console.log(" ");
    a[0] = 0;

    if ($(this).val().length < 4) {
        $(".p1").text("最少4个字符");
    } else {
        if (!($(".name").val().match(patt1))) {
            $(".p1").text("请输入字母数字或汉字、下划线");
        } else {
            $(".p1").text("");
            a[0] = 1;
        }
    }

    ajax();
});

function enterPress(e) {
    var e = e || window.event;
    if (e.keyCode == 13) {
        $(".loginBtn").click();
    }
}

$(".pwd").keyup(function () {

    // console.log("a"+a);
    // console.log("b"+b);
    // console.log(" ");
    b[0] = 0;

    if ($(this).val().length < 4) {
        $(".p2").text("最少4个字符");
    } else {
        if (!($(".pwd").val().match(patt2))) {
            $(".p2").text("请输入字母数字或汉字、下划线");
        } else {
            $(".p2").text("");
            b[0] = 1;
        }
    }
    ajax();
});

