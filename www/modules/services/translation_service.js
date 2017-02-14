angular.module('myApp').service('Translation', function($resource, Parametres) {
    
    this.getTranslation = function($scope) {
    	var language = Parametres.getCurrentLanguage();
        var languageFilePath = 'translations/translation_' + language.code + '.json';
        $resource(languageFilePath).get(function(data) {
            $scope.translation = data;
        });
    };

});