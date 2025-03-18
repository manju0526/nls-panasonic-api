angular.module('panasonicApp').directive('ngInclude', ['$templateCache', function($templateCache) {
    return {
        restrict: 'A',
        priority: 1000,
        compile: function (element, attrs) {
            const rawUrl = attrs.ngInclude;
            if (rawUrl) {
                // Clear from cache
                $templateCache.remove(rawUrl);

                // Automatically add cache-busting param
                attrs.$set('ngInclude', rawUrl + ' + "?v=" + new Date().getTime()');
            }
            return {
                pre: function () {}
            };
        }
    };
}]);
