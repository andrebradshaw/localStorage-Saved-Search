//watch the build: https://www.twitch.tv/videos/374143140

Storage.prototype.setObj = function(key, val) { 
	return this.setItem(key, JSON.stringify(val));
}

Storage.prototype.getObj = function(key) { 
	return JSON.parse(this.getItem(key));
}

var boolString = 'javascript AND ("google tag manager" OR "web analytics")';

var checkList = (obj, str) => obj.some(itm => itm == str);

var updateSavedSearch = (objKey, str) => {
	initStorage(objKey);
	var currentList = JSON.parse(localStorage.getObj(objKey));
	if(checkList(currentList,str) === false) {	
		currentList.push(str);
		var updated = JSON.stringify(currentList);
		localStorage.setObj(objKey, updated); 
    }
}

var searchSavedSearch = (objKey, str) => {
	var arr = [];
	var searchArr = JSON.parse(localStorage.getObj(objKey));
	var regX = new RegExp(str.replace(/\W+/g, '\\W+'));
	searchArr.forEach(itm=> {
		if(regX.test(itm) === true){
			arr.push(itm);
		}
	});
	return arr;
}

var initStorage = (str) => {
	if(localStorage.getItem(str) === null) localStorage.setObj(str, '[]');
}

updateSavedSearch('test123', boolString) //creates new local storage or updates existing with the assigned string
searchSavedSearch('test123', boolString) //returns and array of matching items from the local storage
