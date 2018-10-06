(function(jsonString) {
	var newString = jsonString.replace('warnWetter.loadWarnings(','');
	newString = newString.replace(');','');
	var newJSON = JSON.parse(newString);
	var jsonResult = "";
	if (newJSON.warnings.hasOwnProperty('812069017')) {
		jsonResult = JSON.stringify(newJSON.warnings['812069017'][0]);
	} else {
		jsonResult = undefined;
	}
	return jsonResult;
})(input)
