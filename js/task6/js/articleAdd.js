/**
 * Created by xiaoyudesu on 2017/6/23.
 */
console.log('这里是新增列表页');
var indexApp = angular.module('indexApp');

indexApp.controller('addCtrl', function ($scope, $state, $stateParams, $http, FileUploader, $window) {
    $scope.goBack = function () {
        $window.history.back();
    }

    var E = window.wangEditor;
    var editor = new E('#content');
    editor.create();

    $scope.types = [
        {id: 0, name: "首页banner"},
        {id: 1, name: "找职位banner"},
        {id: 2, name: "找精英banner"},
        {id: 3, name: "行业大图"}
    ];

    $scope.statuses = {
        1: '草稿',
        2: '上线'
    };

    var uploader = $scope.uploader = new FileUploader({
        method: 'post',
        url: '/proxy/a/u/img/3',
        header: {'Content-Type': "application/x-www-form-urlencoded"},
        params: {
            file: $scope.imgLoad
        }
    });

    // FILTERS
    uploader.filters.push({
        name: 'imageFilter',
        fn: function (item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            console.log('type' + "=" + type);
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    // CALLBACKS
    uploader.onProgressAll = function (progress) {
        console.info('onProgressAll', progress);
    };


    //编辑功能
    if ($stateParams.id != null) {
        // $scope.name="编辑";
        $http({
            method: 'get',
            url: '/proxy/a/article/' + $stateParams.id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(res) {
            $scope.imgLoad = res.data.data.article.img;
            $scope.title = res.data.data.article.title;
            $scope.type = res.data.data.article.type;
            editor.txt.html(res.data.data.article.content);
            $scope.url = res.data.data.article.url;
            $scope.industry = res.data.data.article.industry;
            $scope.createAt = res.data.data.article.createAt;
        }, function errorCallback() {
            console.log("错误");
        });

        //编辑上线
        $scope.onLineNow = function () {
            bootbox.confirm({
                title: "<h4 class='bootTitle' style='color:red;text-align: left;'>提示</h4>",
                message: "<p class='bootMessage' style='text-align: center'>确认上传吗？</p>",
                size: "small",
                buttons: {
                    confirm: {
                        label: '<i class="fa fa-check"></i>上线',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '<i class="fa fa-times"></i>再考虑一下',
                        className: 'btn-default'
                    }
                },
                callback: function (result) {
                    if (result) {
                        $http({
                            method: 'put',
                            url: '/proxy/a/u/article/' + $stateParams.id,
                            params: {
                                title: $scope.title,
                                type: $scope.type,
                                status: 2,
                                img: $scope.imgLoad,
                                content: editor.txt.html(),
                                url: $scope.url,
                                industry: $scope.industry,
                                createAt: $scope.createAt


                            },
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(function successCallback() {
                            $state.reload();
                        });
                    }
                }
            });
        };

        //编辑草稿
        $scope.draftSave = function () {
            bootbox.confirm({
                title: "<h4 class='bootTitle' style='color:red;text-align: left;'>提示</h4>",
                message: "<p class='bootMessage' style='text-align: center'>存入草稿吗？</p>",
                size: "small",
                buttons: {
                    confirm: {
                        label: '<i class="fa fa-check"></i>存为草稿',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '<i class="fa fa-times"></i>再考虑一下',
                        className: 'btn-default'
                    }
                },
                callback: function (result) {
                    if (result) {
                        $http({
                            method: 'put',
                            url: '/proxy/a/u/article/' + $stateParams.id,

                            params: {
                                title: $scope.title,
                                type: $scope.type,
                                status: 1,
                                img: $scope.imgLoad,
                                content: editor.txt.html(),
                                url: $scope.url,
                                industry: $scope.industry,
                                createAt: $scope.createAt
                            },
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(function successCallback(res) {
                            console.log(res.data);
                            $state.reload();
                        });
                    }
                }
            });
        };
    } else {

        //上线
        $scope.onLineNow = function () {
            bootbox.confirm({
                title: "<h4 class='bootTitle' style='color:red;text-align: left;'>提示</h4>",
                message: "<p class='bootMessage' style='text-align: center'>确认上传吗？</p>",
                size: "small",
                buttons: {
                    confirm: {
                        label: '<i class="fa fa-check"></i>上线',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '<i class="fa fa-times"></i>再考虑一下',
                        className: 'btn-default'
                    }
                },
                callback: function (result) {
                    if (result) {
                        $http({
                            method: 'post',
                            url: '/proxy/a/u/article',
                            params: {
                                title: $scope.title,
                                type: $scope.type,
                                status: 2,
                                img: $scope.imgLoad,
                                content: editor.txt.html(),
                                url: $scope.url
                            },
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(function successCallback() {
                            $state.reload();
                        });
                    }
                }
            });
        };

        //草稿
        $scope.draftSave = function () {
            bootbox.confirm({
                title: "<h4 class='bootTitle' style='color:red;text-align: left;'>提示</h4>",
                message: "<p class='bootMessage' style='text-align: center'>存入草稿吗？</p>",
                size: "small",
                buttons: {
                    confirm: {
                        label: '<i class="fa fa-check"></i>存为草稿',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: '<i class="fa fa-times"></i>再考虑一下',
                        className: 'btn-default'
                    }
                },
                callback: function (result) {
                    if (result) {
                        $http({
                            method: 'post',
                            url: '/proxy/a/u/article',

                            params: {
                                title: $scope.title,
                                type: $scope.type,
                                status: 1,
                                img: $scope.imgLoad,
                                content: editor.txt.html(),
                                url: $scope.url
                            },
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).then(function successCallback(res) {
                            console.log(res.data);
                            $state.reload();
                        });
                    }
                }
            });
        };
    }

});
