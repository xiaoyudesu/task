/**
 * Created by xiaoyudesu on 6/2/2017.
 */

console.log('加载后台页')
var indexApp = angular.module('indexApp');

indexApp.controller('backCtrl', function () {
    var count = [];
    for (var i = 0; i < $(".head").length; i++) {
        count[i] = 0;
        $(".head").eq(i).attr({
            "index": i
        })
    }

    $(".head").click(function () {
        i = $(this).attr("index");
        count[i] += 1;

        if (count[i] == 2) {
            count[i] = 0;
        }

        console.log(count[i]);


        $(this).children(".turn").css({
            "transform": "rotate(" + 90 * count[i] + "deg)",
        });

        $(this).parents(".downMenu").find(".body").slideToggle(200);
    });


    $(".body").find("aside.a").click(function () {

        $("aside.a").css({
            "background-color": "#08090c"
        });

        $(this).css({
            "background-color": "#54698c"
        });

    });
})



