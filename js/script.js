var csvLink = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSpgPFjsVbVak8MuXxOYEV8ezmsXC38Ki13xHcGwVt3YbFRoRSKwiRemMk9lCGOKRsDCrlYtD2ePg7V/pub?output=csv';
var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
}
else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
}
var loading = true;
request.open('GET', csvLink, true);
request.send();
request.onload = function (e) {
    if (request.readyState === 4) {
        if (request.status === 200) {
            var response = request.responseText;
            var lines = request.responseText.split("\r");
            for (var _i = 0, _a = lines.slice(1); _i < _a.length; _i++) {
                var line = _a[_i];
                var line_json = CSVtoArray(line);
                var time = line_json[0].split(" ");
                time = make_date_friendly(time[0]) + " " + time[1];
                var canteen = line_json[1];
                var breakfast = line_json[2];
                var lunch = line_json[3];
                var snacks = line_json[4];
                var dinner = line_json[5];
                addCanteen(time, canteen, [breakfast, lunch, snacks, dinner]);
            }
            // moving to the relevant meal
            move();
            // set to reload after a certain amount of time
            setToReload();
        }
        else {
            console.error(request.statusText);
        }
    }
};
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
        return ''; // Return empty string.
    });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text))
        a.push('');
    return a;
}
;
function make_date_friendly(date) {
    var now = new Date();
    var today = (now.getMonth() + 1).toString() +
        '/' +
        now.getDate().toString() +
        '/' +
        now.getFullYear().toString();
    now.setDate(now.getDate() - 1); // going a day back
    var yesterday = (now.getMonth() + 1).toString() +
        '/' +
        now.getDate().toString() +
        '/' +
        now.getFullYear().toString();
    if (date == today) {
        return 'Today';
    }
    else if (date == yesterday) {
        return 'Yesterday';
    }
    return date;
}
function addCanteen(time, canteen, meals) {
    if (loading) {
        document.querySelector("#skeleton").classList.add("hide");
        loading = false;
    }
    var sections = document.getElementsByTagName('section');
    for (var section in sections) {
        if (typeof sections[section] == 'object') {
            sections[section].innerHTML +=
                '<div class=canteen-card><span class=canteen-name>' +
                    canteen +
                    '</span><br /><span class=timestamp>' +
                    time +
                    '</span><br /><br/><span class=menu>' +
                    meals[section] +
                    '</span></div>';
        }
    }
}
//moving to section according to time
function move() {
    var hours = new Date().getHours();
    var section_no = 0;
    var sections = document.getElementsByTagName('section');
    if (hours >= 22 || hours < 10) {
        // breakfast case
    }
    else if (hours >= 10 && hours < 14) {
        // lunch case
        section_no = 1;
    }
    else if (hours >= 14 && hours < 18) {
        // snacks case
        section_no = 2;
    }
    else {
        // dinner case
        section_no = 3;
    }
    var location = '-' + section_no.toString() + '00vw';
    sections[0].style['margin-left'] = location;
    sections[1].style['margin-left'] = location;
    sections[2].style['margin-left'] = location;
    sections[3].style['margin-left'] = location;
}
// function to reload on appropriate times
function setToReload() {
    var hours = new Date().getHours();
    var milliSecsToWait = 0;
    if (hours < 9) {
        milliSecsToWait = (9 - hours) * 60 * 60 * 1000;
    }
    else if (hours < 14) {
        milliSecsToWait = (14 - hours) * 60 * 60 * 1000;
    }
    else if (hours < 19) {
        milliSecsToWait = (19 - hours) * 60 * 60 * 1000;
    }
    else {
        milliSecsToWait = (24 - hours + 9) * 60 * 60 * 1000;
    }
    setTimeout(function () {
        history.go();
    }, milliSecsToWait);
}
