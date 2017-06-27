/**
 * Created by xiaoyudesu on 5/16/2017.
 */
$(document).ready(function () {
    var characters = JSON.parse(sessionStorage.getItem("character"));
    var data = JSON.parse(sessionStorage.getItem("data"));
    var divs = "";
    var chosen;
    var num;

    console.log(characters);
    console.log(data);

    for (var i = 0; i < characters.length; i++) {

        divs += '<div class="big-box">' + '<div class="character-box">' + '<div class="character flex">' + characters[i] + '</div>' + '<div class="number flex">' + '<span id="number">' + (i + 1) + '</span>' + '号</div>' + '</div>' + ' <div class="action-box">' +
            '<span><img src="../images/knife.png" alt="" class="knife"></span>' +
            /*  '<span><img src="../images/search.png" alt="" class="search"></span>'+
             '<span><img src="../images/shoot.png" alt="" class="shoot"></span>'+
             '<span><img src="../images/aid.png" alt="" class="aid"></span>'+*/
            '</div>' + '</div>';
    }
    $(".box").html(divs);

    $(".play").click(function () {
        if ($(".audio")[0].paused) {
            $(".audio")[0].play();
        } else {
            $(".audio")[0].pause();
        }
    });

    $(".close").click(function () {
        location.href = "index.html";
    });


    //action-box的hover效果
    $(".action-box").hide();

    var number = [];
    for (var i = 0; i < data.person.length; i++) {
        number[i] = data.person[i].num;
    }

    $(".big-box").mouseover(function () {
        //判断是否已死亡
        if (number.indexOf($(this).find(".number").text()) == -1) {
            $(this).find(".action-box").show();
        }
    });
    $(".big-box").mouseout(function () {
        $(this).find(".action-box").hide();
    });

    //已选择的person背景变灰
    var index = [];
    for (var i = 0; i < data.person.length; i++) {
        index[i] = parseInt(data.person[i].num) - 1;

        $(".big-box").eq(index[i]).css("opacity", ".5");
        $(".character").eq(index[i]).css("background-color", "rgb(234,205,209)");
        $(".character").eq(index[i]).text(data.person[i].chosen);
        $(".character").eq(index[i]).prepend("😪");
        $(".number").eq(index[i]).css({
            "background-color": "rgb(195,166,203)",
            "color": "rgb(121,61,86)"
        });
    }
    console.log(index);

    //加点特效
    $(".big-box").click(function () {
        //判断是否已死亡
        if (number.indexOf($(this).find(".number").text()) !== -1) {
            alert("我死的好冤~");
        }
    });

    //判断是否为杀手页
    if (data.path % 4 == 2) {
        //action点击后的效果
        $(".knife").click(function () {
            chosen = $(this).parents(".big-box").find(".character").text();
            num = $(this).parents(".big-box").find(".number").text();

            console.log(chosen);
            console.log(num);

            //点击后变色
            if (number && (number.indexOf(num) !== -1)) {
                alert("尊重尸体，不要鞭尸😒");
            } else if (chosen == "杀手") {
                alert("不要手足相残😤");
            } else {
                $(".character-box").css("border-color", "#fff");
                $(this).parents(".big-box").find(".character-box").css("border-color", "red");
            }
        });


        $(".kill").click(function () {
            if (!chosen || (chosen == '杀手')) {
                alert("选择你的猎物");
            } else {
                data.path += 1;
                data.kill.push({
                    "chosen": chosen,
                    "num": num
                });

                data.person = data.person.concat(data.kill[data.kill.length - 1]);

                sessionStorage.setItem("data", JSON.stringify(data));
                location.href = "judgeScript.html";
            }
        });

    } else if (data.path % 4 == 0) {
        //若为投票页面，默认切换
        $(".toggle1").toggle();
        $(".toggle2").toggle();

        $(".knife").click(function () {
            chosen = $(this).parents(".big-box").find(".character").text();
            num = $(this).parents(".big-box").find(".number").text();

            // console.log(Boolean(data.person[0].num));
            var number = [];
            for (var i = 0; i < data.person.length; i++) {
                number[i] = data.person[i].num;
            }
            if (number && (number.indexOf(num) !== -1)) {
                alert("尊重尸体，不要鞭尸");
            } else {
                $(".character-box").css("border-color", "#fff");
                $(this).parents(".big-box").find(".character-box").css("border-color", "red");
            }
        });


        $(".vote").click(function () {
            if (!chosen) {
                alert("投票既是权利，也是义务");
            } else {
                data.path += 1;
                data.vote.push({
                    "chosen": chosen,
                    "num": num
                });

                data.person = data.person.concat(data.vote[data.vote.length - 1]);


                console.log(data.person);

                //获取persons每一项的下标
                var index = [];
                for (var i = 0; i < data.person.length; i++) {
                    index[i] = parseInt(data.person[i].num) - 1;
                }

                //判断有哪些人还幸存，并分类
                var killers = [];
                var civilians = [];
                for (var i = 0; i < characters.length; i++) {
                    if (index.indexOf(i) == -1) {
                        if (characters[i] == "杀手") {
                            killers.push(characters[i]);
                        } else if (characters[i] == "平民") {
                            civilians.push(characters[i]);
                        }
                    }

                }

                console.log(killers);
                console.log(civilians);

                data.killers = killers;
                data.civilians = civilians;
                sessionStorage.setItem("data", JSON.stringify(data));

                if ((killers.length >= civilians.length) || (killers.length == 0)) {
                    location.href = "result.html";
                } else {
                    location.href = "judgeScript.html";
                }

            }
        });


    }

});