/**
 * Created by xiaoyudesu on 5/18/2017.
 */
$(document).ready(function(){
    var characters=JSON.parse(sessionStorage.getItem("character"));
    var data=JSON.parse(sessionStorage.getItem("data"));
    var word1=sessionStorage.getItem("word1");
    var word2=sessionStorage.getItem("word2");
    data.day=Math.ceil(data.path / 4);

    console.log(characters);
    console.log(data);
    console.log(word1);
    console.log(word2);

    $(".info").click(function(){
        alert("并没有什么信息😕");
    });

    $(".home").click(function(){
        location.href="../html/index.html";
    });

    $(".again").click(function(){
        location.href="../html/index.html";
    });

    $(".share").click(function(){
        alert("无此功能😐");
    });


    if(data.killers.length>=data.civilians.length){
        $(".win-message").text("杀手胜利");
        $(".character").text("杀手");
    }else if(data.killers.length==0){
        $(".win-message").text("平民胜利");
        $(".character").text("平民");
    }

    var k=[];
    var c=[];
    for(var i=0;i<characters.length;i++){
        if(characters[i]=="杀手"){
            k.push(characters[i]);
        }else if(characters[i]=="平民"){
            c.push(characters[i]);
        }
    }

    $("ul").html("<li>杀&emsp;手"+k.length+"人</li><li>平&emsp;民"+c.length+"人</li>")

    if(word1){
        $(".killerWord").text(word1);
    }
    if(word2){
        $(".civilianWord").text(word2);
    }

    console.log(data.kill[0].num);

    var str="";
    for(var i=0;i<data.kill.length;i++) {
        str+='<div class="day">'+
        '<p class="title"><span class="the-day">第'+(i+1)+'天</span><span class="time">0小时07分</span></p>'+
        '<p>晚上:'+data.kill[i].num+'被杀手杀死,'+data.kill[i].num+'是'+data.kill[i].chosen+'</p>'+
        '<p>白天:'+data.vote[i].num+'被全民投票投死,'+data.vote[i].num+'是'+data.vote[i].chosen+'</p>'+
        '</div>'
    }

    $(".game-detail").html(str);

});
