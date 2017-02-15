angular.module('myApp').service('Translation', function($resource, $rootScope, Parametres) {
    
    this.getTranslation = function($scope) {
        $resource('translations/translation_' + Parametres.getCurrentLanguage().code + '.json').get(function(data) {
            $scope.translation = data;
        });
    };

});