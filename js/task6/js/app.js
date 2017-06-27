console.log('加载app.js');
var indexApp = angular.module('indexApp', ['ui.router', 'oc.lazyLoad', 'ngMessages', 'mgcrea.ngStrap']);

indexApp.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'tem/login.html',
            resolve: {
                load: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        "../css/login.css",
                        "../js/login.js"
                    ]);
                }
            }
        })

        .state('backStage', {
            url: '/backStage',
            views: {
                '': {
                    templateUrl: 'tem/backStage.html',
                },
                '@backStage': {
                    template: '<h1>ようこそ～</h1>',
                }
            },
            resolve: {
                load: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '../css/backStage.css',
                        '../js/backStage.js'
                    ]);
                }
            }
        })

        .state('backStage.articleList', {
            //再地址栏中显示参数
            url: '/articleList/{page:[1-9][0-9]*}/{size:[1-9][0-9]*}/{title:[0-9a-zA-Z]*}/:author/{startAt:[0-9]*}/:endAt/:type/:status',
            templateUrl: 'tem/articleList.html',
            //实际控制。
            params: {
                'page': '1',
                'size': '10',

                'title': '',
                'author': '',
                'startAt': '',
                'endAt': '',
                'type': '',
                'status': ''
            },
            // cache:false,
            resolve: {
                load: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        "../css/articleList.css",
                        "../js/articleList.js"
                    ]);
                }
            }
        })


        .state('backStage.articleAdd', {
            url: '/articleAdd',
            templateUrl: 'tem/articleAdd.html',
            resolve: {
                load: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        "../css/articleAdd.css",
                        "../js/articleAdd.js"
                    ]);
                }
            }
        })


        .state('backStage.articleInfo', {
            url: '/articleInfo',
            template: '<h1>这里是articleInfo</h1>'
        })

});




