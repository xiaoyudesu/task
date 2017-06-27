/**
 * Created by xiaoyudesu on 5/15/2017.
 */
$(document).ready(function () {
    var data = JSON.parse(sessionStorage.getItem("data"));
    data.day = Math.ceil(data.path / 4);
    console.log(data);
    console.log(data.day);

    var div = [];
    var num1 = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
    for (var i = 0; i < data.day; i++) {

        //每一天的html视图
        div[i] = '<div class="container day-box">' +
            '<div class="main1">' +
            '<p class="day">第' + num1[i] + '天</p>' +
            '<img class="toggle" src="../images/arrowDown.png" alt="">' +
            '</div>' +
            '<div class="main2">' +
            '<div class="container2">' +
            '<div class="little-dot"></div>' +
            '<div class="night">' +
            '<img  class="moon" src="../images/moon.png" alt="">' +
            '<div class="text-box">' +
            '<div class="word-box" name="kill">' +
            '<div class="tri"></div>' +
            '<div class="text">杀手杀人</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="daytime">' +
            '<img class="sun" src="../images/sun.png" alt="">' +
            '<div class="text-box">' +
            '<div class="word-box" name="word1">' +
            '<div class="tri"></div>' +
            '<div class="text">亡灵发表遗言</div>' +
            '</div>' +
            '<div class="word-box" name="word2">' +
            '<div class="tri"></div>' +
            '<div class="text">玩家依次发言</div>' +
            '</div>' +
            '<div class="word-box" name="vote">' +
            '<div class="tri"></div>' +
            '<div class="text">投票</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        /*        if ()
         $("[name=kill]").eq(i).after("<p class='add'>"+data.kill[i].num+"被杀手杀死了，真实身份是"+data.kill[i].chosen+"</p>");
         $("[name=vote]").eq(i).after("<p class='add'>"+data.vote[i].num+"被水民投死了，真实身份是"+data.vote[i].chosen+"</p>");*/
    }


    //在每天的按钮后显示结果
    for (var i = 0; i < data.kill.length; i++) {
        $("[name=kill]").eq(i).after("<p class='add'>" + data.kill[i].num + "被杀手杀死了，真实身份是" + data.kill[i].chosen + "</p>");
    }

    for (var i = 0; i < data.vote.length; i++) {
        $("[name=vote]").eq(i).after("<p class='add'>" + data.vote[i].num + "被水民投死了，真实身份是" + data.vote[i].chosen + "</p>");
    }

    //连接每天的视图并插入页面中
    $("main").html(div.join(""));
    // console.log(div);


    /*    //为太阳和月亮加点反应
     $(".moon").click(function(){
     $(this).parents(".night").find(".word-box").();
     });
     $(".sun").click(function(){
     $(this).parents(".daytime").find(".word-box").toggle();
     });*/

//css部分

    //设置toggle切换的默认状态
    $(".main2").hide();
    $(".main2").last().show();

    $(".toggle").click(function () {
        $(this).parents(".day-box").find(".main2").slideToggle();
    });


    //设置每个步骤框颜色
    // if ()
    $(".text-box").find(".text").css("background-color", "#0d8ba1");
    $(".text-box").find(".tri").css("border-right-color", "#0d8ba1");

    //设置今天的步骤框默认颜色
    $(".day-box").last().find(".text").css("background-color", "#29bde0");
    $(".day-box").last().find(".tri").css("border-right-color", "#29bde0");


    if (data.click.indexOf($(this).attr("name")) !== -1) {
        //今天已进行的步骤的默认颜色
        $(".text-box").find(".text").css("background-color", "#0d8ba1");
        $(".text-box").find(".tri").css("border-right-color", "#0d8ba1");

    } else {
        //未进行的步骤设置悬浮效果

        //有些动画在手机上有bug，因此我们需要禁用悬浮效果
        if (!(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent))) {
            //设置hover效果
            $(".day-box").last().find(".word-box").hover(function () {
                $(this).find(".text").css("background-color", "#0d8ba1");
                $(this).find(".tri").css("border-right-color", "#0d8ba1");
            }, function () {
                $(this).find(".text").css("background-color", "#29bde0");
                $(this).find(".tri").css("border-right-color", "#29bde0");
            });
        }
    }


    //已完成的步骤的点击效果
    $(".word-box").click(function () {
        //判断所点击的文字框是否是最后一天的文字框
        if ($(this).parents(".day-box").find(".day").text() == $(".day").last().text()) {
            //判断是否已完成此步骤
            if (data.click.indexOf($(this).attr("name")) !== -1) {
                alert("不要缅怀过去了，请往前看");
            }

            console.log(data.click.indexOf($(this).attr("name")) !== -1);
            console.log($(this).attr("name"));
        } else {
            console.log(Boolean($(this).parents(".day-box").find(".day").text() == $(".day").last().text()));
            alert("不要缅怀过去了，请往前看");
        }
    });


    //若此页为杀人页
    if (data.path % 4 == 1) {
        data.click.push("kill");

        //今天的点击效果

        $(".day-box").last().find(".word-box").click(function () {
            if ($(this).attr("name") == "kill") {
                data.path += 1;
                // data.click=[];
                sessionStorage.setItem("data", JSON.stringify(data));
                location.href = "chose.html";
            } else {

                alert("现在是杀人时间，享受杀人的快感吧 😈 ");
            }
        });

    } else if (data.path % 4 == 3) {
        //取消绑定的hover效果
        $("[name=kill]").last().unbind("mouseover");
        $("[name=kill]").last().unbind("mouseout");

        //kill的背景颜色
        $("[name=kill]").last().find(".text").css("background-color", "#0d8ba1");
        $("[name=kill]").last().find(".tri").css("border-right-color", "#0d8ba1");

        console.log($(".kill").eq(0).find(".text").css("background-color"))
        console.log($(".kill").eq(1).find(".text").css("background-color"))

        $(".daytime").last().find(".word-box").click(function () {
            //判断是否word1被第一次点击
            if (!(data.click[1])) {
                if (($(this).attr("name") == "word1")) {
                    alert("游荡的孤魂啊，留下你的箴言");
                    data.click.push("word1");
                    //取消hover
                    $(this).unbind("mouseover");
                    $(this).unbind("mouseout");
                    $(this).find(".text").css("background-color", "#0d8ba1");
                    $(this).find(".tri").css("border-right-color", "#0d8ba1");
                } else {
                    alert("请不要抢游魂的台词");
                }
            } else if (!(data.click[2])) {
                if ($(this).attr("name") == "word2") {
                    alert("幸存的人儿，说出你的感想");
                    data.click.push("word2");
                    $(this).unbind("mouseover");
                    $(this).unbind("mouseout");
                    $(this).find(".text").css("background-color", "#0d8ba1");
                    $(this).find(".tri").css("border-right-color", "#0d8ba1");

                } else if ($(this).attr("name") !== "word1") {
                    alert("直面死亡，才能克服恐惧");
                }
            } else if ($(this).attr("name") == "vote") {
                data.path += 1;
                data.click = [];
                sessionStorage.setItem("data", JSON.stringify(data));
                location.href = "chose.html";
            }
        });
    }


});
