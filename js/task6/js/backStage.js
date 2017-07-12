/**
 * Created by xiaoyudesu on 6/2/2017.
 */

console.log('加载后台页');

var indexApp = angular.module('indexApp');

indexApp.controller('backCtrl', function ($state, $scope, $http) {
    if (localStorage.getItem('loginStatus') == 0) {
        $state.go('login');
    }

    $scope.loginout = function () {
        $http({
            method: 'post',
            url: '/proxy/a/logout',
            headers: {'Content-Type': 'Application/json'}
        }).then(function successCallback(res) {
            if (res.data.message === 'success') {
                sessionStorage.removeItem('loginStatus');
                $state.go('login');
            } else {
                alert('退出失败~');
            }
            ;
        })
    };

    var count = [];
    for (var i = 0; i < $(".head").length; i++) {
        count[i] = 0;
        $(".head").eq(i).attr({
            "index": i
        });
    }
    ;

    $(".head").click(function () {
        i = $(this).attr("index");
        count[i] += 1;

        if (count[i] === 2) {
            count[i] = 0;
        }
        ;

        console.log(count[i]);
        console.log(' ');


        $(this).children(".turn").css({
            "transform": "rotate(" + 90 * count[i] + "deg)"
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

    $(".bars").click(function () {
        $("ul.menus").slideToggle(200);
    })

    $(window).resize(function () {
        // console.log($(document).width());
        // console.log($())
        if (window.matchMedia('(min-width: 700px)').matches) {
            $("ul.menus").css("display", "block");
        } else if (window.matchMedia('(max-width: 700px)').matches) {
            $("ul.menus").css("display", "none");
        }
    });
});

