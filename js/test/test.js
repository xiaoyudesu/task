var data;
function a(name, pwd) {
    if (name == 1) {
        data = {a: 111, b: 222};
    }
}


app.controller('testC', function ($scope) {
    $scope.content = '今天天气真好！';
});
app.directive('sayHello', function () {
    return {
        restrict: 'E',
        template: '<div>hello，<b ng-transclude></b>,{­{cont}­}</div>',
        replace: true,
        transclude: true,
        scope: {
            cont: '=speak'
        }
    };
});