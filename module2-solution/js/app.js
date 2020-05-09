(function () {
	"use strict"

	var app = angular.module("Module2-solution",[]);

	app.provider("ShoppingList", function () {
		var provider = this;
		provider.$get = function () {
			var shoppinglist = new ShoppingListService();
			return shoppinglist;
		};
	})

	function ShoppingListService () {
		var service = this;
		var itemsToBuy = [{name:"bread",quantity:"1 loaf"},{name:"cheese",quantity:"1 packet"},{name:"tomato",quantity:"1 bag"},{name:"lettuce",quantity:"1 bag"},{name:"mayo",quantity:"1 bottle"}];
		var itemsAlreadyBought = [];

		service.itemBought = function (itemIndex) {
			itemsAlreadyBought.push(itemsToBuy[itemIndex]);
			itemsToBuy.splice(itemIndex,1);
		};
		service.getItemsToBuy = function () {
			return itemsToBuy;
		};
		service.getItemsAlreadyBought = function () {
			return itemsAlreadyBought;
		};
	}

	app.controller("ToBuy",ToBuy)
	ToBuy.$inject = ["ShoppingList"];
	function ToBuy (ShoppingList) {
		var tobuy = this;
		tobuy.items = ShoppingList.getItemsToBuy();
		tobuy.itemBought = function (itemIndex) {
			ShoppingList.itemBought(itemIndex);
		}
	}

	app.controller("AlreadyBought",AlreadyBought)
	AlreadyBought.$inject = ["ShoppingList"];
	function AlreadyBought (ShoppingList) {
		var alreadybought = this;
		alreadybought.items = ShoppingList.getItemsAlreadyBought();
	}
})();