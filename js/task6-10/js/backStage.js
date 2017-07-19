/**
 * Created by xiaoyudesu on 6/2/2017.
 */

console.log('加载后台页');

var indexApp = angular.module('indexApp');

indexApp.controller('backCtrl', function ($state, $scope, $http, $stateParams) {
    if (localStorage.getItem('loginStatus') != 1) {
        $state.go('login');
    }

    if (localStorage.getItem('liIndex')) {
        $(".side .body li").eq(localStorage.getItem('liIndex')).css("background-color", "#54698c");
    }

    $(".side .body li[active=actived]").css("background-color", "#54698c");
    $(".side .body li").click(function () {

        $(".side .body li").css("background-color", "#08090c");
        $(this).css("background-color", "#54698c");

        console.log($(".side .body li"));
        for (var i = 0; i < $(".side .body li").length; i++) {
            $(".side .body li").eq(i).attr("index", i);
        }
        // console.log($(this).attr("index"));
        localStorage.setItem("liIndex", $(this).attr("index"));
    });



    $scope.user = $stateParams.name;
    $scope.logout = function () {
        $http({
            method: 'post',
            url: '/carrots-admin-ajax/a/logout',
            headers: {'Content-Type': 'Application/json'}
        }).then(function successCallback(res) {
            if (res.data.message === 'success') {
                localStorage.removeItem('loginStatus');
                $state.go('login');
            } else {
                alert('退出失败~');
            }
        })
    };


    for (i = 0; i < 4; i++) {
        if (localStorage.getItem("fold" + i) == 1) {
            $(".head").eq(i).parents(".downMenu").find(".body").css("display", "block");
            $(".head").eq(i).children(".turn").css({
                "transform": "rotate(90deg)"
            });
        } else {
            $(".head").eq(i).parents(".downMenu").find(".body").css("display", "none");
            $(".head").eq(i).children(".turn").css({
                "transform": "rotate(0deg)"
            });
        }
    }

    for (var i = 0; i < $(".head").length; i++) {
        $(".head").eq(i).attr({
            "index": i
        });
    }
    var fold = [];
    $(".head").click(function () {
        i = $(this).attr("index");

        if ($(this).parents(".downMenu").find(".body").css("display") === "none") {
            fold[i] = 1;
            $(this).children(".turn").css({
                "transform": "rotate(90deg)"
            });
        } else {
            fold[i] = 0;
            $(this).children(".turn").css({
                "transform": "rotate(0deg)"
            });
        }
        localStorage.setItem("fold" + i, fold[i]);

        $(this).parents(".downMenu").find(".body").slideToggle(200);
    });



    $(".bars").click(function () {
        $("ul.menus").slideToggle(200);
    });

    $(window).resize(function () {
        if (window.matchMedia('(min-width: 700px)').matches) {
            $("ul.menus").css("display", "block");
        } else if (window.matchMedia('(max-width: 700px)').matches) {
            $("ul.menus").css("display", "none");
        }
    });
});

