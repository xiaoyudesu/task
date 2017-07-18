/**
 * Created by xiaoyudesu on 6/7/2017.
 */
console.log('加载登录页');
// console.log("a");
var indexApp = angular.module('indexApp');
indexApp.controller('loginCtrl', ['$scope', '$http', '$state', '$location', function ($scope, $http, $state) {
    localStorage.clear();
    $scope.login = function () {
        console.log($scope.name);
        console.log($scope.pwd);
        $http({
            method: 'post',
            url: '/proxy/a/login',
            params: {
                name: $scope.name,
                pwd: $scope.pwd
            },
            headers: {'Content-Type': 'Application/json'}

        }).then(function successCallback(response) {
            // alert(response.data.message);
            // console.log(response.data);
            if (response.data.message === 'success') {
                localStorage.setItem('loginStatus', '1');
                $state.go('backStage', {name: $scope.name});
            } else {
                localStorage.setItem('loginStatus', '0');

                bootbox.alert({
                    title: "<h4 class='bootTitle' style='color:red;text-align: left;'>提示</h4>",
                    message: "<p class='bootMessage' style='text-align: center'>" + response.data.message + "</p>",
                    size: "large",
                })
            }
        }, function errorCallback() {
            // 请求失败执行代码
            alert("请求错误");
        });
    }
}]);
