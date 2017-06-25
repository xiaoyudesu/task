/**
 * Created by xiaoyudesu on 5/16/2017.
 */

$(document).ready(function(){
    var num=sessionStorage.getItem("num");
    var chosen=sessionStorage.getItem("chosen");
    $(".result").html("<p>"+num+"被杀手杀死了，真实身份是"+chosen+"</p>");
    sessionStorage.setItem("page","interpret");
    console.log(sessionStorage.getItem("page"));

    $(".go-vote").click(function(){
        location.href="chose.html";
    });
});