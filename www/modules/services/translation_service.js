angular.module('myApp').service('Translation', function($resource) {
    this.getTranslation = function($scope, language) {
        var languageFilePath = 'translations/translation_' + language + '.json';
        $resource(languageFilePath).get(function (data) {
            $scope.translation = data;
        });
    };
});