/**
 * Created by xiaoyudesu on 2017/6/23.
 */
console.log('这里是新增列表页');
var indexApp = angular.module('indexApp');

indexApp.controller('addCtrl', function ($scope, $state, $stateParams, $http, FileUploader, $window) {
    $scope.goBack = function () {
        $window.history.back();
    };

    var E = window.wangEditor;
    var editor = new E('#content');
    editor.create();

    $scope.types = [
        {value: 0, label: '首页banner'},
        {value: 1, label: '找职位banner'},
        {value: 2, label: '找精英banner'},
        {value: 3, label: '行业大图'}
    ];

    $scope.industries = [
        {value: 0, label: '移动互联网'},
        {value: 1, label: '电子商务'},
        {value: 2, label: '企业服务'},
        {value: 3, label: 'O2O'},
        {value: 4, label: '教育'},
        {value: 5, label: '金融'},
        {value: 6, label: '游戏'}
    ];

    $scope.hasIndustry = false;
    $scope.a = function () {
        console.log(typeof $scope.industry);
        console.log($scope.industry);
        if ($scope.industry) {
            $scope.hasIndustry = true;
        } else {
            $scope.hasIndustry = false;
        }
    };


    var uploader = $scope.uploader = new FileUploader({
        method: 'post',
        url: '/carrots-admin-ajax/a/u/img/task',
        queueLimit: 1,
        params: {
            file: $scope.imgLoad
        },
        header: {'Content-Type': "Application/json"}
    });

    // fitters
    uploader.filters.push({
        name: 'imageFilter',
        fn: function (item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            // console.log('type' + "=" + type);
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        $scope.imgLoad = response.data.url;
    };


    //编辑功能
    if ($stateParams.id) {
        // $scope.name="编辑";
        $scope.titleContent = "编辑";
        $http({
            method: 'get',
            url: '/carrots-admin-ajax/a/article/' + $stateParams.id,
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
                size: "large",
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
                            url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
                            params: {
                                title: $scope.title,
                                type: $scope.type,
                                status: 2,
                                img: $scope.imgLoad,
                                content: editor.txt.html(),
                                url: $scope.url,
                                industry: $scope.type == 3 ? '' : $scope.industry,
                                createAt: $scope.createAt
                            },
                            headers: {'Content-Type': 'Application/json'}
                        }).then(function successCallback() {
                            // $state.reload();
                            $window.history.back();
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
                size: "large",
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
                            url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
                            params: {
                                title: $scope.title,
                                type: $scope.type,
                                status: 1,
                                img: $scope.imgLoad,
                                content: editor.txt.html(),
                                url: $scope.url,
                                industry: $scope.type == 3 ? '' : $scope.industry,
                                createAt: $scope.createAt
                            },
                            headers: {'Content-Type': 'Application/json'}
                        }).then(function successCallback(res) {
                            console.log(res.data);
                            $window.history.back();
                        });
                    }
                }
            });
        };
    } else {
        $scope.titleContent = "新增";

        //上线
        $scope.onLineNow = function () {
            bootbox.confirm({
                title: "<h4 class='bootTitle' style='color:red;text-align: left;'>提示</h4>",
                message: "<p class='bootMessage' style='text-align: center'>确认上传吗？</p>",
                size: "large",
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
                            url: '/carrots-admin-ajax/a/u/article',
                            params: {
                                title: $scope.title,
                                type: $scope.type,
                                status: 2,
                                img: $scope.imgLoad,
                                content: editor.txt.html(),
                                url: $scope.url,
                                industry: $scope.type == 3 ? '' : $scope.industry
                            },
                            headers: {'Content-Type': 'Application/json'}
                        }).then(function successCallback() {
                            // $state.reload();
                            $window.history.back();

                            bootbox.alert({
                                title: "<h4 class='bootTitle' style='color:red;text-align: left;'>提示</h4>",
                                message: "<p class='bootMessage' style='text-align: center'>新增成功~</p>",
                                size: "large"
                            })
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
                size: "large",
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
                            url: '/carrots-admin-ajax/a/u/article',
                            params: {
                                title: $scope.title,
                                type: $scope.type,
                                status: 1,
                                img: $scope.imgLoad,
                                content: editor.txt.html(),
                                url: $scope.url,
                                industry: $scope.type == 3 ? '' : $scope.industry
                            },
                            headers: {'Content-Type': 'Application/json'}
                        }).then(function successCallback(res) {
                            console.log(res.data);
                            // $state.reload();
                            $window.history.back();
                            bootbox.alert({
                                title: "<h4 class='bootTitle' style='color:red;text-align: left;'>提示</h4>",
                                message: "<p class='bootMessage' style='text-align: center'>新增成功~</p>",
                                size: "large"
                            })

                        });
                    }
                }
            });
        };
    }

});
