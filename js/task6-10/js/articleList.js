/**
 * Created by xiaoyudesu on 2017/6/12.
 */
// 'use strict';

console.log("加载列表页");
var indexApp = angular.module('indexApp');

indexApp.controller('listCtrl', function ($scope, $http, $state, $stateParams) {

    //请求后台数据
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
    }).then(function successCallback(res) {
        //后台数据
        $scope.articleList = res.data.data.articleList;

        $scope.total = res.data.data.total;
        $scope.size = res.data.data.size;

        $scope.apg = Math.ceil($scope.total / $scope.size);
        console.log($scope.apg);

        // console.log($scope.apg);
        // console.log($scope.page);
        $scope.noData = !$scope.articleList[0];

        if ($scope.page > $scope.apg) {
            $scope.page = $scope.apg;
        }

        //分页数据
        //如果按钮总数大于5
        $scope.pageIndexes = [];
        // console.log($scope.apg);

        if ($scope.apg > 5) {
            if (($scope.page > 2) && ($scope.apg - $scope.page > 2)) {
                for (var i = 0; i < $scope.apg; i++) {
                    $scope.pageIndexes[i] = i + 1;
                }

                //$scope.page是字符串，必须用Nuber()转化。
                //注意slice()左右取值为数组下标，从零开始。
                $scope.pageIndexes = $scope.pageIndexes.slice(Number($scope.page) - 3, Number($scope.page) + 2);
            } else if ($scope.page > 2) {
                if ($scope.apg - $scope.page <= 2) {
                    for (i = 0; i < Math.ceil($scope.apg); i++) {
                        $scope.pageIndexes[i] = i + 1;
                    }
                    $scope.pageIndexes = $scope.pageIndexes.slice(-5);
                }
            } else {
                for (i = 0; i < $scope.apg; i++) {
                    $scope.pageIndexes[i] = i + 1;
                }

                $scope.pageIndexes = $scope.pageIndexes.slice(0, 5);
            }
        } else {

            for (i = 0; i < $scope.apg; i++) {
                $scope.pageIndexes[i] = i + 1;
            }
        }

        $scope.dotL = Number($scope.page) > 3;
        $scope.dotR = Number($scope.page) < Number($scope.apg) - 3;

        $scope.pageIndex = function (num) {
            $state.go($state.current, {
                page: num,
                size: $scope.size
            });
            // console.log($scope.pageIndex(num));
        };

        var pattern = /^[1-9][0-9]*$/;
        $scope.sizeCheck = function () {
            if (!($scope.size.match(pattern))) {
                $scope.size = '';
            }
            // console.log($scope.size);
        };

        $scope.pageCheck = function () {
            if (!($scope.pageChosen.match(pattern))) {
                $scope.pageChosen = '';
            } else if ($scope.pageChosen > $scope.apg) {
                $scope.pageChosen = $scope.apg;
            }
        };


        $scope.pageFirst = function () {
            $state.go($state.current, {
                page: 1,
                size: $scope.size
            });
        };

        $scope.pageLast = function () {
            $state.go($state.current, {
                page: $scope.apg
            });
        };

        $scope.isHavePagePrve = function () {
            return !(Number($scope.page) === 1);
        };

        $scope.isHavePageNext = function () {
            return !(Number($scope.page) === Number($scope.apg));
        };

        $scope.pagePrev = function () {
            if ($scope.page > 1) {
                $scope.page = Number($scope.page) - 1;
                $state.go($state.current, {
                    page: $scope.page,
                    size: $scope.size
                });
            } else {
                // alert('已是最小页数');
            }
        };

        $scope.pageNext = function () {
            if ($scope.page < Math.ceil($scope.apg)) {
                $scope.page = Number($scope.page) + 1;
                $state.go($state.current, {
                    page: $scope.page,
                    size: $scope.size
                });
            } else {
                // alert("已是最大页数")
            }
        };


        $scope.ensure = function () {

            if ($scope.pageChosen) {
                if ($scope.pageChosen <= $scope.apg) {
                    $state.go($state.current, {
                        page: $scope.pageChosen,
                        size: $scope.size
                    });
                } else {
                    $state.go($state.current, {
                        page: $scope.apg,
                        size: $scope.size
                    });
                }
            } else {
                if ($scope.page <= $scope.apg) {
                    $state.go($state.current, {
                        page: $scope.page,
                        size: $scope.size
                    });
                } else {
                    $state.go($state.current, {
                        page: 1,
                        size: $scope.size
                    })
                }
            }
        }


    }, function errorCallback() {
        console.log("错误");
    });



    //日历默认格式
    $scope.date = function (date) {
        var a = new Date(Number(date));
        //月数从零开始，需先加一，并且在小于零的数前加0
        return (a.getFullYear() + '-' + (a.getMonth() + 1 < 10 ? '0' + String(a.getMonth() + 1) : a.getMonth() + 1) + '-' + (a.getDate() < 10 ? '0' + String(a.getDate()) : a.getDate()));
    };

    //将url中的数据渲染到页面中。
    // 根据url参数指定page和size
    //将数字字符串转换为数字
    $scope.page = $stateParams.page && Number($stateParams.page);
    $scope.size = $stateParams.size && Number($stateParams.size);
    $scope.type = $stateParams.type && Number($stateParams.type);
    $scope.status = $stateParams.status && Number($stateParams.status);
    $scope.title = $stateParams.title;
    $scope.author = $stateParams.author;
    $scope.startAt = $stateParams.startAt;
    $scope.endAt = $stateParams.endAt;


    $scope.types = [
        {value: '', label: '全部'},
        {value: 0, label: '首页banner'},
        {value: 1, label: '找职位banner'},
        {value: 2, label: '找精英banner'},
        {value: 3, label: '行业大图'}
    ];

    $scope.statuses = [
        {value: '', label: '全部'},
        {value: 1, label: '草稿'},
        {value: 2, label: '上线'}
    ];

    $scope.startAt = $stateParams.startAt === '' ? '' : $scope.date($stateParams.startAt);
    $scope.endAt = $stateParams.endAt === '' ? '' : $scope.date($stateParams.endAt);

    //url参数为空则返回值为空，否则运算

    //清空
    $scope.clear = function () {
        $state.go($state.current, {
            page: 1,
            size: $stateParams.size,
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
        $state.go($state.current, {
            page: 1,
            size: $stateParams.size,
            title: $scope.title,
            author: $scope.author,
            startAt: $scope.startAt,
            endAt: $scope.endAt,
            type: $scope.type,
            status: $scope.status
        });
    };


    //上线/下线
    $scope.upOrDownItem = function (a, b) {
        bootbox.confirm({
            title: "<h4 class='bootTitle' style='color:red;text-align: left;'>提示</h4>",
            message: "<p class='bootMessage' style='text-align: center'>确认" + (b === 1 ? '上线' : '下线') + "吗？</p>",
            size: "large",
            buttons: {
                confirm: {
                    label: '<i class="fa fa-times"></i> 确定',
                    className: 'btn-success'
                },
                cancel: {
                    label: '<i class="fa fa-check"></i>再考虑一下',
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    $http({
                        method: 'put',
                        url: '/proxy/a/u/article/status',
                        params: {
                            id: a,
                            status: b === 1 ? 2 : 1
                        },
                        headers: {'Content-Type': 'Application/json'}
                    }).then(function successCallback() {
                        $state.reload();
                    });
                }
            }
        });
    };

    //删除项目
    $scope.deleteItem = function (id) {

        bootbox.confirm({
            title: "<h4 class='bootTitle' style='color:red;text-align: left;'>提示</h4>",
            message: "<p class='bootMessage' style='text-align: center'>确认删除吗？</p>",
            size: "large",
            buttons: {
                confirm: {
                    label: '<i class="fa fa-times"></i> 删除',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<i class="fa fa-check"></i>再考虑一下',
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if (result) {
                    $http({
                        method: 'delete',
                        url: '/proxy/a/u/article/' + id,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function successCallback() {
                        $state.reload();
                    });
                }
            }
        });
    };


    //编辑按钮
    $scope.edit = function (id) {
        $state.go('backStage.articleAdd', {
            id: id
        });
        console.log(id);
    };


});


//注入过滤器
indexApp.filter('statusFil', function () {
    return function (a) {
        var status;
        switch (a) {
            case 1:
                status = "草稿";
                break;
            case 2:
                status = "上线";
                break;
        }
        return status;
    }
});


indexApp.filter('typeFil', function () {
    return function (a) {
        var type;
        switch (a) {
            case 0:
                type = "首页banner";
                break;
            case 1:
                type = "找职位banner";
                break;
            case 2:
                type = "找精英banner";
                break;
            case 3:
                type = "行业大图";
                break;
        }
        return type;
    }
});


//图片过滤
indexApp.filter('imgLoad', function () {
    var noImg = 'img/noImg.png';
    return function (img) {
        //正则匹配图片格式
        return (img.match(/^http:\/\/.*\.(jp[e]?g|png|bmp|gif|psd)$/igm) ? img : noImg)
    }
});


/*
 indexApp.directive('paging', function ($state,$stateParams,$http) {
    return {
        templateUrl: 'tem/paging.html',
        replace: true,
 link: function (scope, ele, atr) {


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
 }).then(function successCallback(res) {
 //后台数据
 scope.articleList = res.data.data.articleList;

 scope.total = res.data.data.total;
 scope.size = res.data.data.size;

 scope.apg = Math.ceil(scope.total / scope.size);
 console.log(scope.apg);

 // console.log($scope.apg);
 // console.log($scope.page);

 if (scope.page > scope.apg) {
 scope.page = scope.apg;
 }



 //分页数据
 //如果按钮总数大于5
 scope.pageIndexes = [];
 // console.log(scope.apg);
 console.log(scope.apg);
 console.log(scope.total);
 console.log(scope.size);

 // console.log($rootScope.apg)
 // console.log($rootScope.total)


 if (scope.apg > 5) {
 if ((scope.page > 2) && (scope.apg - scope.page > 2)) {
 for (var i = 0; i < scope.apg; i++) {
 scope.pageIndexes[i] = i + 1;
 }

 //scope.page是字符串，必须用Nuber()转化。
 //注意slice()左右取值为数组下标，从零开始。
 scope.pageIndexes = scope.pageIndexes.slice(Number(scope.page) - 3, Number(scope.page) + 2);
 } else if (scope.page > 2) {
 if (scope.apg - scope.page <= 2) {
 for (i = 0; i < Math.ceil(scope.apg); i++) {
 scope.pageIndexes[i] = i + 1;
 }
 scope.pageIndexes = scope.pageIndexes.slice(-5);
 }
 } else {
 for (i = 0; i < scope.apg; i++) {
 scope.pageIndexes[i] = i + 1;
 }

 scope.pageIndexes = scope.pageIndexes.slice(0, 5);
 }
 } else {

 for (i = 0; i < scope.apg; i++) {
 scope.pageIndexes[i] = i + 1;
 }
 }

 scope.dotL = Number(scope.page) > 3;
 scope.dotR = Number(scope.page) < Number(scope.apg) - 3;

 scope.pageIndex = function (num) {
 $state.go($state.current, {
 page: num,
 size: scope.size
 });
 // console.log(scope.pageIndex(num));
 };

 var pattern = /^[1-9][0-9]*$/;
 scope.sizeCheck = function () {
 if (!(scope.size.match(pattern))) {
 scope.size = '';
 }
 // console.log(scope.size);
 };

 scope.pageCheck = function () {
 if (!(scope.pageChosen.match(pattern))) {
 scope.pageChosen = '';
 } else if (scope.pageChosen > scope.apg) {
 scope.pageChosen = scope.apg;
 }
 };


 scope.pageFirst = function () {
 $state.go($state.current, {
 page: 1,
 size: scope.size
 });
 };

 scope.pageLast = function () {
 $state.go($state.current, {
 page: scope.apg
 });
 };

 scope.isHavePagePrve = function () {
 return !(Number(scope.page) === 1);
 };

 scope.isHavePageNext = function () {
 return !(Number(scope.page) === Number(scope.apg));
 };

 scope.pagePrev = function () {
 if (scope.page > 1) {
 scope.page = Number(scope.page) - 1;
 $state.go($state.current, {
 page: scope.page,
 size: scope.size
 });
 } else {
 // alert('已是最小页数');
 }
 };

 scope.pageNext = function () {
 if (scope.page < Math.ceil(scope.apg)) {
 scope.page = Number(scope.page) + 1;
 $state.go($state.current, {
 page: scope.page,
 size: scope.size
 });
 } else {
 // alert("已是最大页数")
 }
 };


 scope.ensure = function () {

 if (scope.pageChosen) {
 if (scope.pageChosen <= scope.apg) {
 $state.go($state.current, {
 page: scope.pageChosen,
 size: scope.size
 });
 } else {
 $state.go($state.current, {
 page: scope.apg,
 size: scope.size
 });
 }
 } else {
 if (scope.page <= scope.apg) {
 $state.go($state.current, {
 page: scope.page,
 size: scope.size
 });
 } else {
 $state.go($state.current, {
 page: 1,
 size: scope.size
 })
 }
 }
 }
 }, function errorCallback() {
 console.log("错误");
 });

 }
 }
 });*/
