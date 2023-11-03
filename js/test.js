var special_items_csv = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRP-3cGuTMgN7XClaPY76aL0MgMgeNMhm_tMX1eT2R7OUYEgObfb5rE-S1OIveWl1BH9OWVVbX-I2Zt/pub?gid=440432565&single=true&output=csv"

function isDateToday(dateString) {
	const inputDate = new Date(dateString);
	const currentDate = new Date();
	return (
		inputDate.getDate() === currentDate.getDate() &&
		inputDate.getMonth() === currentDate.getMonth() &&
		inputDate.getFullYear() === currentDate.getFullYear()
	);
}

function CSVtoArray(text) {
	var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
	var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
	// Return NULL if input string is not well formed CSV string.
	if (!re_valid.test(text))
		return null;
	var a = []; // Initialize array to receive values.
	text.replace(re_value, function (m0, m1, m2, m3) {
		// Remove backslash from \' in single quoted values.
		if (m1 !== undefined)
			a.push(m1.replace(/\\'/g, "'"));
		// Remove backslash from \" in double quoted values.
		else if (m2 !== undefined)
			a.push(m2.replace(/\\"/g, '"'));
		else if (m3 !== undefined)
			a.push(m3);
		return ""; // Return empty string.
	});
	// Handle special case of empty last value.
	if (/,\s*$/.test(text))
		a.push("");
	return a;
}



// // const dateStr = "1/26/2021 8:02:47";
// const dateStr = "11/2/2023 11:48:45";

// isToday = isDateToday(dateStr);
// console.log(isToday);



fetch(special_items_csv)
	.then((response) => {
		if (!response.ok) {
			throw new Error(`Network response was not ok. Status: ${response.status}`);
		}
		return response.text();
	})
	.then((csvData) => special_item(csvData))
	.catch((error) => {
		console.error("Error:", error);
	});

function special_item(csvData) {
	console.log(csvData);
	lines = csvData.split("\r");
	lines.shift();
	lines.forEach(line => {
	    arr = CSVtoArray(line);
		console.log(arr);
		date = arr[0];
		canteen = arr[1];
		lunch = arr[2];
		dinner = arr[3];
		var date = new Date(date);



		
		// console.log(date.getDate());
		// console.log(date.getMonth());
		// console.log(date.getFullYear());
		// console.log(date.getHours());
		// console.log(date.getMinutes());
		// console.log(date);
	});
}