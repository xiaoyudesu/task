/**
 * Created by xiaoyudesu on 5/12/2017.
 */
$(document).ready(function(){
    var characters=JSON.parse(sessionStorage.getItem("character"));
    var killerWord=sessionStorage.getItem("word1");
    var civilianWord=sessionStorage.getItem("word2");

    var times=1;
    var index;

    $("#page1").show();
    $(".check2").hide();

    $(".close").click(function(){
        location.href="index.html";
    });






    $(".check").click(function() {
        times += 1;
        index = Math.ceil(times / 2);

        console.log(characters.length);

        $(".number1").text(index);
        $(".number2").text(index + 1);
        $("#character").text(characters[index - 1]);



        if (index+1 == characters.length) {
            $(".check2").unbind("click");
            $(".check2").text("法官查看");
            $(".check2").click(function(){
                location.href = "judgeDiary.html";
            });
        }else{
            $("#page1").toggle();
            $("#page2").toggle();
            $(".check1").toggle();
            $(".check2").toggle();
        }


        if (characters[index - 1] == "杀手") {
                if (killerWord) {
                    $("#word").text(killerWord);
                } else {
                    $("#word").text("德玛西亚");
                }
            } else if (characters[index - 1] == "平民") {
                if (civilianWord) {
                    $("#word").text(civilianWord);
                } else {
                    $("#word").text("成吉思汗");
                }
            }

            console.log(killerWord);
            console.log(civilianWord);
        }
    );

});








