const d = new Date();
let day = d.getDay();
let hours = d.getHours();

function construct_menu(todaysItems, note, image) {
    r = ""
    if (note) {
        r += `<b>Note from the HEC:</b> ${note}<br>`;
        return r;
    }
    if (image) {
        image = convertDriveLink(image)
        r += `<br><img src='${image}' alt="breakfast" style="width: 100%; max-width: 300px;"> <br>`;
    }
    if (todaysItems) {
        r += `<b>Today's Menu :</b> ${todaysItems}`;
    }
    else {
        r += `<b>Today's Menu :</b> Not Available`;
    }
    return r;
};

function get_item(obj, key1, key2) {
    if (obj && obj[key1] && obj[key1][key2] !== undefined) {
        return obj[key1][key2];
    }
    return false;
}

function convertDriveLink(openLink) {
    console.log(openLink)
    // Check if the input link matches the expected format
    const openLinkPattern = /https:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/;
    const match = openLink.match(openLinkPattern);

    if (match && match[1]) {
        const fileId = match[1];
        // Return the thumbnail format link
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    } else {
        throw new Error("Invalid Google Drive open link format.");
    }
}


function addMeals(todaysItems, notes) {

    for (let mealName in menu) {
        // `mealName` is the meal name ("breakfast", "lunch", etc.)
        let meal = menu[mealName];

        // `meal[7]` is the default items
        // what does each element of (day + n + 6)%7 represent?
        //     - day: current day of the week (0-6)
        //     - n  : settings for different canteens
        //     - 6:   their 1 is our 0 (in menu.js)... so to compensate that we
        //            had to add a number which is 1 less than a multiple of 7
        commonItems = meal[7].join(', ');

        mahanadi = construct_menu(
            get_item(todaysItems, "Mahanadi", mealName),
            get_item(notes, "Mahanadi", mealName),
            get_item(todaysItems, "Mahanadi", `${mealName}_image`)
        );
        brahmaputra = construct_menu(
            get_item(todaysItems, "Brahmaputra", mealName),
            get_item(notes, "Brahmaputra", mealName),
            get_item(todaysItems, "Brahmaputra", `${mealName}_image`)
        );
        rushikulya = construct_menu(
            get_item(todaysItems, "Rushikulya", mealName),
            get_item(notes, "Rushikulya", mealName),
            get_item(todaysItems, "Rushikulya", `${mealName}_image`)
        );
        kaveri = construct_menu(
            get_item(todaysItems, "Kaveri", mealName),
            get_item(notes, "Kaveri", mealName),
            get_item(todaysItems, "Kaveri", `${mealName}_image`)
        );

        element = document.getElementById(mealName);

        element.innerHTML = `
        <div class="meal">${mealName.charAt(0).toUpperCase()}${mealName.slice(1)}</div>
        <div class="common-card">
            <span class="canteen-name">Common Items</span><br>
            <span class="menu">${commonItems}</span>
        </div>
        <div class="canteen-card">
            <span class="canteen-name">Brahmaputra</span><br>
            <span class="menu">${brahmaputra}</span>
        </div>
        <div class="canteen-card">
            <span class="canteen-name">Rushikulya</span><br>
            <span class="menu">${rushikulya}</span>
        </div>
        <div class="canteen-card">
            <span class="canteen-name">Kaveri</span><br>
            <span class="menu">${kaveri}</span>
        </div>
        <div class="canteen-card">
            <span class="canteen-name">Mahanadi</span><br>
            <span class="menu">${mahanadi}</span>
        </div>`
    }
}

//moving to section according to time
function move() {
    if (hours < 10 || hours >= 22) {
        var section_no = 0;
    }
    else if (hours < 14) {
        var section_no = 1;
    }
    else if (hours < 18) {
        var section_no = 2;
    }
    else {
        var section_no = 3;
    }

    var target = document.getElementsByClassName("swipe-view")[0];
    const scrollPosition = section_no * window.innerWidth;
    target.scrollLeft = scrollPosition;
}

// function to check if the date is today,
// supports the date string in google sheet TimeStamp format
function isDateToday(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    return (
        inputDate.getDate() === currentDate.getDate() &&
        inputDate.getMonth() === currentDate.getMonth() &&
        inputDate.getFullYear() === currentDate.getFullYear()
    );
}

// function to check if the email is valid
function isEmailValid(email) {
    return (
        (email === "code@niser.ac.in") ||  // for testing
        (email === "adityaprakash.dhada@niser.ac.in") ||  // Gymkhana Campus Secratary
        (email === "studentsgymkhana@niser.ac.in")  // Gymkhana
    );
}


// takes input a line from the csv file and returns an array of the values
// remember to not put the whole csv file in this function, put only one line at a time
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

function get_menu() {
    // Production data 
    menu_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3c7dkQFmPsGp30PQzsHVZ5j2bRIAY1bYzDr1zCMqjx5EhIUhJuj-i-19r3ab6vLH46BZDiusPFp7m/pub?gid=1546310934&single=true&output=csv"
    return fetch(menu_url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            return response.text();
        })
        .then((csvData) => {
            lines = csvData.split('\n');
            lines.shift();  // Timestamp, Hostel, Breakfast, Lunch, Snacks, Dinner
            // console.log(lines);
            todaysItems = {};
            lines.forEach(line => {
                line = CSVtoArray(line);
                timestamp = line[0];
                hostel = line[1];
                breakfast = line[2];
                lunch = line[3];
                snacks = line[4];
                dinner = line[5];
                breakfast_image = line[6];
                lunch_image = line[7];
                snacks_image = line[8];
                dinner_image = line[9];
                if (isDateToday(timestamp)) {
                    todaysItems[hostel] = {
                        "breakfast": breakfast,
                        "lunch": lunch,
                        "snacks": snacks,
                        "dinner": dinner,
                        "breakfast_image": breakfast_image,
                        "lunch_image": lunch_image,
                        "snacks_image": snacks_image,
                        "dinner_image": dinner_image
                    };
                    // console.log("added");
                }
            });
            // console.log(todaysItems);
            return todaysItems;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function get_notes() {
    notes_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5xfG2JM4qoQddDVT_6KAa-N9823amzU4uncd4y7z5xzkwP101DyGxea7MtaMLRo05TAdwauHPgYff/pub?gid=399925005&single=true&output=csv"
    return fetch(notes_url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            return response.text();
        })
        .then((csvData) => {
            lines = csvData.split('\n');
            // console.log(lines);
            lines.shift();  // Timestamp, Email, Canteen, Breakfast, Lunch, Snacks, Dinner
            // console.log(lines);
            notes = {};
            lines.forEach(line => {
                line = CSVtoArray(line);
                timestamp = line[0];
                email = line[1];
                hostel = line[2];
                breakfast = line[3];
                lunch = line[4];
                snacks = line[5];
                dinner = line[6];
                if (isDateToday(timestamp) && isEmailValid(email)) {
                    notes[hostel] = {
                        "breakfast": breakfast,
                        "lunch": lunch,
                        "snacks": snacks,
                        "dinner": dinner
                    };
                    // console.log("added");
                }
            });
            // console.log(notes);
            return notes;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

addMeals();
move();
Promise.all([get_menu(), get_notes()])
    .then((results) => {
        let [todaysItems, notes] = results;
        // console.log(spl_items);
        // console.log(spl_items["Mahanadi"]);
        // console.log(notes);
        // console.log(notes["Mahanadi"]);
        addMeals(todaysItems, notes);
    })
    .catch((error) => {
        console.error("Error:", error);
    });