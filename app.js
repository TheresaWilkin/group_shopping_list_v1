// state item
	//1. state object that has an items array
	//2. within the array, we have an object with the name of the item and checked/unchecked: true or false
	
	// {[{}]}

	var state = {
		items: [
			{name: "apples", checked: false},
			{name: "bananas", checked: false}
			]
		//bonus work: add "id: 1" etc, for delete
	}

	// console.log(state.items); 

//functions that modify the state

	//add function that adds items to the state - add them as object; 

	function addItem(state, item) {
		var addedItem = {name: item, checked: false};
		state.items.push(addedItem);

	}

	//change whether an item is checked or not

	function checkedItem (state, item) {
		state.items.forEach(function(elementObj) {
			if (elementObj.name === item){
				var truthTest = elementObj.checked;
				elementObj.checked = !truthTest;
			}
		});
	}

		function deleteItem (state, item) {
		state.items.forEach(function(elementObj, i) {
			if (elementObj.name === item){
				state.items.splice(i, 1);
			}
		});
	}
	
	//3. delete function that deletes items from the state

//functions that render the state
	function itemHtml(state, item) {
		//turn our items into html, li in ul 
		var spanText = "<span class=\"shopping-item\">";
		state.items.forEach(function(elementObj) {
			if (elementObj.name === item){
				if (elementObj.checked) {
					spanText = "<span class=\"shopping-item shopping-item__checked\">";
				}
			}
		});
		var renderedHtml = 
			"<li>" +
				spanText 
					+ item + 
		    	"</span>" +
		    	"<div class=\"shopping-item-controls\"><button class=\"shopping-item-toggle\">" +
            "<span class=\"button-label\">check</span></button><button class=\"shopping-item-delete\">" +
            "<span class=\"button-label\">delete</span></button></div></li>";
            return renderedHtml;
	}

	function appendItem(state, item){
		$(".shopping-list").append(itemHtml(state, item));
	}

	var renderList = function(state, element) {
		var itemsHTML = state.items.map(function(item) {
		    return itemHtml(state, item.name);
		});
		element.html(itemsHTML);
	};
	// "append" for add items
	//2. create list, put list on page (after a delete)
	//3. depending on whether item is true or false, it shows a check or uncheck on the page

//event listeners

	// when form is submitted it adds item to the page 

	$(function() {
		renderList(state, $(".shopping-list"));

		$('#js-shopping-list-form').submit(function(event) {
			event.preventDefault(); 
			var input = $('#shopping-list-entry').val(); 
			addItem(state, input); 
			appendItem(state, input); 
		});
	//2. function that listens for checks and unchecks
		$(".shopping-list").on("click", ".shopping-item-toggle", function() {
				var listItem = $(this).closest("li").children(".shopping-item");
				$(listItem).toggleClass("shopping-item__checked");
				//??change checked state
				var listItemName = listItem.text();
				checkedItem(state, listItemName);
			})
	//3. listens for clicks on the delete button
		$(".shopping-list").on("click", ".shopping-item-delete", function() {
				var listItem = $(this).closest("li").children(".shopping-item");
				var listItemName = listItem.text();
				deleteItem(state, listItemName);
				renderList(state, $(".shopping-list"));
			})
})