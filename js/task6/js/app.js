var indexApp = angular.module('indexApp', ['ui.router', 'oc.lazyLoad', 'ngMessages']);

indexApp.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            views: {
                '': {
                    templateUrl: 'tem/login.html',
                }
            },

            resolve: {
                load: ["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        "../css/login.css",
                        "../js/login.js"
                    ]);
                }]
            }
        })

        .state('backStage', {
            url: '/backStage',
            views: {
                '': {
                    templateUrl: 'tem/backStage.html',
                },
                '@backStage': {
                    template: '<div>ようこそ～</div>',
                }
            },
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '../css/backStage.css'
                    ]);
                }]
            }
        })

        .state('backStage.articleList', {
            url: '/articleList',
            template: '<div>这里是articleList</div>'
        })
        .state('backStage.articleInfo', {
            url: '/articleInfo',
            template: '<div>这里是articleInfo</div>'
        })

});



