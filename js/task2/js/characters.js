/**
 * Created by xiaoyudesu on 5/12/2017.
 */
$(document).ready(function(){
    var characters=JSON.parse(sessionStorage.getItem("character"));
    var killerWord=sessionStorage.getItem("word1");
    var doctorWord=sessionStorage.getItem("word2");

    console.log(killerWord);
    console.log(doctorWord);
    var times=1;
    var index;

    $("#page1").show();
    $(".check2").hide();

    $(".close").click(function(){
        location.href="index.html";
    });

    $(".check").click(function(){
        $("#page1").toggle();
        $("#page2").toggle();
        $(".check1").toggle();
        $(".check2").toggle();

        times+=1;
        index=Math.ceil(times/2);

        console.log(characters.length);

        $(".number1").text(index);
        $(".number2").text(index+1);

        $("#character").text(characters[index-1]);

        if((killerWord!=null)&&characters[index-1]=="杀手"){
            $("#word").text(killerWord);
        }

        if((doctorWord!=null)&&characters[index-1]=="医生"){
            $("#word").text(doctorWord);
        }


        console.log(killerWord);
        console.log(doctorWord);



            if(index==characters.length){
                $(".check2").text("法官查看");

                $(".check").click(function(){
                    $(".check").unbind("click");
                    $(".check").click(function(){
                        location.href="judgeDiary.html";
                    });
                });
            }

        }
    );



});








