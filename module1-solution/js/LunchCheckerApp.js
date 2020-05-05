(function () {
	'use strict'

	angular.module('LunchCheckerApp',[])
	.controller('LunchCheckerController',LunchCheckerController)

	LunchCheckerController.$inject = ['$scope'];
	function LunchCheckerController ($scope) {
		$scope.lunchString = '';
		$scope.LunchCheckerMessage = '';
		$scope.messageColor = 'black';
		$scope.LunchChecker = function () {
			if ($scope.lunchString == '') {
				$scope.LunchCheckerMessage = 'Please enter data first';
				$scope.messageColor = 'red';
			}
			else {
				var n = lunchItemsCounter();
				$scope.messageColor = 'green';
				if (n < 4) {
					$scope.LunchCheckerMessage = 'Enjoy!';
				}
				else {
					$scope.LunchCheckerMessage = 'Too Much!';
				}
			}

		}

		function lunchItemsCounter () {
			var lunchArray = $scope.lunchString.split(',');
			var Itemcount = lunchArray.length;
			for (var i = 0; i<lunchArray.length; ++i) {
				if (!lunchArray[i]) {
					--Itemcount;
				}
			}

			return Itemcount;
		}
	}
})();