/**
 * Created by xiaoyudesu on 2017/6/12.
 */

console.log("加载列表页");
var indexApp = angular.module('indexApp');

indexApp.controller('listCtrl', function ($scope, $http, $state, $stateParams) {
    $scope.date = function (date) {
        var a = new Date(Number(date));
        console.log(a);
        return (a.getFullYear() + '-' + (a.getMonth() < 10 ? 0 : '' + a.getMonth()) + '-' + (a.getDate() < 10 ? 0 : '' + a.getDate()))
    };

    //将url中的数据渲染到页面中。
    // 根据url参数指定page和size
    $scope.page = $stateParams.page;
    $scope.size = $stateParams.size;
    $scope.title = $stateParams.title;
    $scope.author = $stateParams.author;
    $scope.startTime = $scope.date($stateParams.startAt);
    $scope.endTime = $scope.date($stateParams.endAt);
    $scope.type = $stateParams.type;
    $scope.status = $stateParams.status;

    $scope.statuses = {
        1: '草稿',
        2: '上线',
    };

    $scope.types = {
        0: "首页banner",
        1: '找职位banner',
        2: '找精英banner',
        3: '行业大图',
    };


    var a = new Date(1497888000000);
    console.log(a.getFullYear() + '-' + a.getMonth() + '-' + a.getDate())


    //清空
    $scope.clear = function () {
        console.log($stateParams);

        $state.go("backStage.articleList", {

            title: '',
            author: '',
            startAt: '',
            endAt: '',
            type: '',
            status: ''
        });
    };


    //搜索
    $scope.search = function () {
        console.log($stateParams);

        $state.go("backStage.articleList", {

            title: $scope.title,
            author: $scope.author,
            startAt: $scope.startAt,
            endAt: $scope.endAt,
            type: $scope.type,
            status: $scope.status
        });
    };


    $http({
        method: 'get',
        url: '/proxy/a/article/search',
        //根据url地址栏的参数变化刷线http，获取后台数据。
        params: {
            page: $stateParams.page,
            size: $stateParams.size,
            title: $stateParams.title,
            author: $stateParams.author,
            startAt: $stateParams.startAt,
            endAt: $stateParams.endAt,
            type: $stateParams.type,
            status: $stateParams.status
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function successCallback(response) {
        //后台数据
        $scope.data = response.data.data;
        $scope.articleList = response.data.data.articleList;
        $scope.total = response.data.data.total;
        $scope.size = response.data.data.size;


        //分页数据
        //如果按钮总数大于5
        $scope.pageIndexes = [];
        $scope.apg = Math.ceil($scope.total / $scope.size);
        if ($scope.apg > 5) {
            if (($scope.page > 2) && ($scope.apg - $scope.page > 2)) {
                for (var i = 0; i < $scope.apg; i++) {
                    $scope.pageIndexes[i] = i + 1;
                }

                //$scope.page是字符串，必须用Nuber()转化。
                //注意slice()左右取值为数组下标，从零开始。
                $scope.pageIndexes = $scope.pageIndexes.slice(Number($scope.page) - 3, Number($scope.page) + 2);
            } else if ($scope.page <= 2) {
                for (var i = 0; i < $scope.apg; i++) {
                    $scope.pageIndexes[i] = i + 1;
                }

                $scope.pageIndexes = $scope.pageIndexes.slice(0, 5);
            } else if ($scope.apg - $scope.page <= 2) {
                for (var i = 0; i < Math.ceil($scope.total / $scope.size); i++) {
                    $scope.pageIndexes[i] = i + 1;
                }
                $scope.pageIndexes = $scope.pageIndexes.slice(-5);
            }
        } else {

            for (var i = 0; i < $scope.apg; i++) {
                $scope.pageIndexes[i] = i + 1;
            }
        }

        $scope.dotL = Number($scope.page) > 3;
        $scope.dotR = Number($scope.page) < Number($scope.apg) - 3;

    }, function errorCallback(response) {
        console.log("错误");
    });


    //分页各种按键与表单

    //表单验证
    var pattern = /^[1-9][0-9]*$/;
    $scope.sizeCheak = function () {
        if (!($scope.size.match(pattern))) {
            $scope.size = "";
        }
        ;
    };

    var pattern = /^[1-9][0-9]*$/;
    $scope.pageCheak = function () {
        if (!($scope.page.match(pattern))) {
            $scope.page = "";
        }
        ;
    };


    $scope.pageFirst = function () {
        $state.go("backStage.articleList", {
            'page': 1,
            'size': $scope.size
        });
    };

    $scope.pageLast = function () {
        $state.go("backStage.articleList", {
            'page': $scope.apg
        });
    };

    $scope.isHavePagePrve = function () {
        return !(Number($scope.page) == 1);
    }

    $scope.isHavePageNext = function () {
        return !(Number($scope.page) == Number($scope.apg));
    }

    $scope.pagePrev = function () {
        if ($scope.page > 1) {
            $scope.page = Number($scope.page) - 1;
            $state.go("backStage.articleList", {
                'page': $scope.page,
                'size': $scope.size
            });
        } else {
            alert('已是最小页数');
        }
    };

    $scope.pageNext = function () {
        if ($scope.page < Math.ceil($scope.total / $scope.size)) {
            $scope.page = Number($scope.page) + 1;
            $state.go("backStage.articleList", {
                'page': $scope.page,
                'size': $scope.size
            });
        } else {
            alert("已是最大页数")
        }
    };

    $scope.pageIndex = function (num) {
        $state.go("backStage.articleList", {
            'page': num,
            'size': $scope.size
        });
    };


    $scope.ensure = function () {
        if ($scope.pageChosen) {
            if ($scope.pageChosen <= $scope.apg) {
                $state.go("backStage.articleList", {
                    'page': $scope.pageChosen,
                    'size': $scope.size
                });
            } else {
                alert("无此数据");
                $(".page").css('color', 'red');
            }
        } else {
            if ($scope.page <= $scope.apg) {
                $state.go("backStage.articleList", {
                    'page': $scope.page,
                    'size': $scope.size
                });
            } else {
                $state.go("backStage.articleList", {
                    'page': 1,
                    'size': $scope.size
                })
            }
        }
    };


});


//注入过滤器
indexApp.filter('statusFil', function () {
    return function (text) {
        var a;
        switch (text) {
            case 1:
                a = "草稿";
                break;
            case 2:
                a = "上线";
                break;
        }
        return a;
    }
});


indexApp.filter('typeFil', function () {
    return function (text) {
        var a;
        switch (text) {
            case 0:
                a = "首页banner";
                break;
            case 1:
                a = "找职位banner";
                break;
            case 2:
                a = "找精英banner";
                break;
            case 3:
                a = "行业大图";
                break;
        }
        return a;
    }
});


indexApp.filter('industry', function () {
    return function (text) {
        var a;
        switch (text) {
            case 0:
                a = "移动互联网";
                break;
            case 1:
                a = "电子商务";
                break;
            case 2:
                a = "企业服务";
                break;
            case 3:
                a = "O2O";
                break;
            case 4:
                a = "教育";
                break;
            case 5:
                a = "金融";
                break;
            case 6:
                a = "游戏";
                break;
            default:
                a = "来自火星";
        }
        return a;
    }

});

