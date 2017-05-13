/**
 * Created by xiaoyudesu on 5/13/2017.
 */
$(document).ready(function(){
    var characters=JSON.parse(sessionStorage.getItem("character"));
    var divs="";

    $(".close").click(function(){
        location.href="index.html";
    });

    console.log(characters);
    for(var i=0;i<characters.length;i++){

        divs+='<div class="big-box">'+'<div class="character-box">'+'<div class="character flex">'+characters[i]+'</div>'+'<div class="number flex">'+'<span id="number">'+(i+1)+'</span>'+'号</div>'
            +'<img class="cover" src="../images/cover.png" alt="">'+
            '</div>'+'</div>';

        $("main").html(divs);

    }



});