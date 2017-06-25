/**
 * Created by xiaoyudesu on 6/7/2017.
 */
console.log('加载登录页')
var indexApp = angular.module('indexApp');

indexApp.controller('loginCtrl', ['$scope', '$http', '$state', '$location', function ($scope, $http, $state) {

    $scope.login = function () {
        console.log($scope.name);
        console.log($scope.pwd);
        $http({
            method: 'POST',
            url: '/proxy/a/login',
            params: {name: $scope.name, pwd: $scope.pwd},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
            alert(response.data.message);
            console.log(response.data);
            if (response.data.message == 'success') {

                $state.go('backStage');

            }
        }, function errorCallback(response) {
            // 请求失败执行代码
            alert("请求错误");
        });

    }
}]);


