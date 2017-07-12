/**
 * Created by xiaoyudesu on 2017/6/12.
 */

console.log("加载列表页");
var indexApp = angular.module('indexApp');

indexApp.controller('listCtrl', function ($rootScope, $scope, $http, $state, $stateParams) {

    //日历默认格式
    $scope.date = function (date) {
        var a = new Date(Number(date));
        //月数从零开始，需先加一，并且在小于零的数前加0
        return (a.getFullYear() + '-' + (a.getMonth() + 1 < 10 ? '0' + String(a.getMonth() + 1) : a.getMonth() + 1) + '-' + (a.getDate() < 10 ? '0' + String(a.getDate()) : a.getDate()));
    };


    //将url中的数据渲染到页面中。
    // 根据url参数指定page和size
    $scope.page = $stateParams.page;
    $rootScope.size = $stateParams.size;
    $scope.title = $stateParams.title;
    $scope.author = $stateParams.author;
    $scope.startAt = $stateParams.startAt;
    $scope.endAt = $stateParams.endAt;
    $scope.type = $stateParams.type;
    $scope.status = $stateParams.status;

    //url参数为空则返回值为空，否则运算
    $scope.startTime = $stateParams.startAt === '' ? '' : $scope.date($stateParams.startAt);
    $scope.endTime = $stateParams.endAt === '' ? '' : $scope.date($stateParams.endAt);


    //清空
    $scope.clear = function () {
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
        console.log($scope.data);
        console.log($rootScope);
        $state.go("backStage.articleList", {
            total: $rootScope,
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
            size: "small",
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
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function successCallback() {
                        $state.reload();
                    });
                }
            }
        });
    };

    //删除项目
    $scope.deleteItem = function (a) {

        bootbox.confirm({
            title: "<h4 class='bootTitle' style='color:red;text-align: left;'>提示</h4>",
            message: "<p class='bootMessage' style='text-align: center'>确认删除吗？</p>",
            size: "small",
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
                        url: '/proxy/a/u/article/' + a,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function successCallback() {
                        $state.reload();
                    });
                }
            }
        });
    };


    //编辑按钮
    $scope.edit = function (a) {
        $state.go('backStage.articleAdd', {
            id: a.id
        });
        console.log(a.id);
    };


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
    }).then(function successCallback(response) {
        //后台数据
        $scope.data = response.data.data;
        $scope.articleList = response.data.data.articleList;

        $scope.total = response.data.data.total;
        $scope.size = response.data.data.size;
        $scope.apg = Math.ceil($scope.total / $scope.size);

    }, function errorCallback() {
        console.log("错误");
    });


    //type与statuses对象
    $scope.types = {
        0: "首页banner",
        1: '找职位banner',
        2: '找精英banner',
        3: '行业大图'
    };

    $scope.statuses = {
        1: '草稿',
        2: '上线'
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


//图片过滤
indexApp.filter('imgLoad', function () {
    var noImg = 'img/noImg.png';
    return function (text) {
        //正则匹配图片格式
        return (text.match(/^http:\/\/.*\.(jp[e]?g|png|bmp|gif|psd)$/igm) ? text : noImg)
    }
});


indexApp.directive('paging', function ($http, $state, $stateParams) {
    return {
        // restrict: 'ACEM',
        templateUrl: 'tem/paging.html',
        replace: true,
        scope: {
            apg: '='
        },
        link: function (scope, ele, attr, ctrl, linker) {


            //分页数据
            //如果按钮总数大于5
            scope.pageIndexes = [];
            console.log(scope.apg);

            if (scope.apg > 5) {
                console.log(222)

                if ((scope.page > 2) && (scope.apg - scope.page > 2)) {
                    for (var i = 0; i < scope.apg; i++) {
                        scope.pageIndexes[i] = i + 1;
                    }

                    //scope.page是字符串，必须用Nuber()转化。
                    //注意slice()左右取值为数组下标，从零开始。
                    scope.pageIndexes = scope.pageIndexes.slice(Number(scope.page) - 3, Number(scope.page) + 2);
                } else if (scope.page > 2) {
                    if (scope.apg - scope.page <= 2) {
                        for (i = 0; i < Math.ceil(scope.total / scope.size); i++) {
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

                console.log(333)
                for (i = 0; i < scope.apg; i++) {
                    scope.pageIndexes[i] = i + 1;
                }
            }

            scope.dotL = Number(scope.page) > 3;
            scope.dotR = Number(scope.page) < Number(scope.apg) - 3;

            scope.pageIndex = function (num) {
                $state.go("backStage.articleList", {
                    page: num,
                    size: scope.size
                });
                console.log(scope.pageIndex(num));
            };


            var pattern = /^[1-9][0-9]*$/;
            scope.sizeCheak = function () {
                if (!(scope.size.match(pattern))) {
                    scope.size = "";
                }
            };

            scope.pageCheak = function () {
                if (!(scope.page.match(pattern))) {
                    scope.page = "";
                }
            };


            scope.pageFirst = function () {
                $state.go("backStage.articleList", {
                    page: 1,
                    size: scope.size
                });
            };

            scope.pageLast = function () {
                $state.go("backStage.articleList", {
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
                    $state.go("backStage.articleList", {
                        page: scope.page,
                        size: scope.size
                    });
                } else {
                    alert('已是最小页数');
                }
            };

            scope.pageNext = function () {
                if (scope.page < Math.ceil(scope.total / scope.size)) {
                    scope.page = Number(scope.page) + 1;
                    $state.go("backStage.articleList", {
                        page: scope.page,
                        size: scope.size
                    });
                } else {
                    alert("已是最大页数")
                }
            };

            scope.ensure = function () {
                if (scope.pageChosen) {
                    if (scope.pageChosen <= scope.apg) {
                        $state.go("backStage.articleList", {
                            page: scope.pageChosen,
                            size: scope.size
                        });
                    } else {
                        alert("无此数据");
                        $(".page").css('color', 'red');
                    }
                } else {
                    if (scope.page <= scope.apg) {
                        $state.go("backStage.articleList", {
                            page: scope.page,
                            size: scope.size
                        });
                    } else {
                        $state.go("backStage.articleList", {
                            page: 1,
                            size: scope.size
                        })
                    }
                }
            };
        },
    }
})


