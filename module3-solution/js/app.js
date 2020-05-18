(function () {
	"use strict"

	var app = angular.module("A3app",[])

	app.service("MenuSearchService",MenuSearchService)
	MenuSearchService.$inject = ["$http","$filter"];
	function MenuSearchService ($http,$filter) {
		var service = this;

		service.getMatchedMenuItems = function (searchTerm) {
			return $http({
				method: "GET",
				url: "https://davids-restaurant.herokuapp.com/menu_items.json"
			})
			.then(function (response) {
				var foundItems = [];
				var allItems = response.data.menu_items;
				for (var i = 0; i < allItems.length; i++) {
					if ((searchTerm.length>0)  && (allItems[i].description.toLowerCase().includes(searchTerm))) {
						foundItems.push(allItems[i]);
					}
				}
				console.log(foundItems.length)
				return foundItems;	
			})
			.catch(function (error) {
				console.log("~~~error~~~");
			});
		};
	}

	app.controller("NarrowItDownController",NarrowItDownController)
	NarrowItDownController.$inject = ["MenuSearchService"]
	function NarrowItDownController (MenuSearchService) {
		var ctrl = this;
		ctrl.searchTerm = "";
		ctrl.message = "";

		ctrl.getMatchedMenuItems = function (searchTerm) {
			var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
			promise.then(function (items) {
				if(items && items.length>0) {
					ctrl.found = items;
					ctrl.message = "";
				}
				else {
					ctrl.message = "Nothing Found!";
					ctrl.found = [];
				}
			})
		};

		ctrl.removeItem = function (index) {
			ctrl.found.splice(index,1);
		};
	}

	app.directive("foundItems",foundItemsDirective)
	function foundItemsDirective () {
		var ddo = {
			restrict: 'E',
			templateUrl: "NarrowItDownMore.html",
			scope: {
				foundItems: '<',
				emptyMessage: '<',
				onRemove: '&'
			},
			controller: NarrowItDownController,
			controllerAs: 'ctrl',
			bindToController: true
		};

		return ddo;
	}
})();