'use strict';

angular.module('myApp').controller('AddVictimeCtrl', function($scope, $location, Operation, Parametres, SharedState, Translation) {
	var language = Parametres.getCurrentLanguage();
	Translation.getTranslation($scope, language);

	$scope.newVictime = {};
	$scope.newVictime.numero = Operation.generateVictimeNumber();
    $scope.newVictime.situation = Parametres.defaultSituation();
    $scope.newVictime.status = Parametres.defaultStatus();

	$scope.victimeStatus = Parametres.getVictimeStatus();
	$scope.victimeSituations = Parametres.getVictimeSituations();

	$scope.addVictime = function() {
		// TODO : ajouter confirmation
		$scope.newVictime.beginDate = new Date();
		$scope.newVictime.endDate = null;
		Operation.addVictime($scope.newVictime);

		if($scope.newVictime.situation == 'Évacuée') Operation.evacuateVictime($scope.newVictime);
	}
	window.addEventListener('native.keyboardshow', keyboardShowHandler);
    window.addEventListener('native.keyboardhide', keyboardHideHandler);

    function keyboardShowHandler(e) {
        $scope.keyboardVisible = true;
        $scope.$apply();
    }

    function keyboardHideHandler(e) {
        $scope.keyboardVisible = false;
        $scope.$apply();
    }
});
