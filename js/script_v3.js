const d = new Date();
const day = d.getDay();
const hours = d.getHours();

// Helper functions
function convertDriveLink(openLink) {
    const openLinkPattern = /https:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/;
    const match = openLink.match(openLinkPattern);

    if (match && match[1]) {
        const fileId = match[1];
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    } else {
        throw new Error("Invalid Google Drive open link format.");
    }
}

function constructMenu(todaysItems, note, image) {
    let result = "";

    if (note) {
        result += `<b>Note from the HEC:</b> ${note}<br>`;
        return result;
    }
    result += "<b>Today's Menu : </b>";

    if (image) {
        image = convertDriveLink(image);
        result += `<br><img src='${image}' alt="meal" style="width: 100%; max-width: 300px;"><br>`;
    }
    if (todaysItems) {
        result += `${todaysItems}`;
    }
    if (!todaysItems && !image) {
        result += "Not Available";
    }
        
    return result;
}

function getItem(obj, key1, key2) {
    return obj?.[key1]?.[key2] !== undefined ? obj[key1][key2] : false;
}

function isDateToday(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    return (
        inputDate.getDate() === currentDate.getDate() &&
        inputDate.getMonth() === currentDate.getMonth() &&
        inputDate.getFullYear() === currentDate.getFullYear()
    );
}

function isEmailValid(email) {
    const validEmails = [
        "code@niser.ac.in",
        "adityaprakash.dhada@niser.ac.in",
        "studentsgymkhana@niser.ac.in",
        "yuvraj.thapa@niser.ac.in",
        "vamsikrishna.taviti@niser.ac.in"
    ];
    return validEmails.includes(email);
}

// move section according to time
function moveToSection() {
    let sectionNo;
    if (hours < 10 || hours >= 22) {
        sectionNo = 0;
    } else if (hours < 14) {
        sectionNo = 1;
    } else if (hours < 18) {
        sectionNo = 2;
    } else {
        sectionNo = 3;
    }

    const target = document.getElementsByClassName("swipe-view")[0];
    const scrollPosition = sectionNo * window.innerWidth;
    target.scrollLeft = scrollPosition;
}

// Load Papa Parse library
const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js";
document.head.appendChild(script);

// Parse CSV data line to array
function parseCSVToArray(text) {
    if (!text) return [];

    let result = [];
    Papa.parse(text, {
        header: false,
        skipEmptyLines: true,
        complete: function (parsedData) {
            result = parsedData.data;
        }
    });
    return result[0];
}

// Data fetching functions
function fetchMenu() {
    const menuUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRAIvrI0n7Ykze7ARIWGSu4f_DcVwZEx62VKATD08uLnGD4YJ9GYM79exqGVEytKsxTn3rm9u8ERhJG/pub?gid=551154884&single=true&output=csv";

    return fetch(menuUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            return response.text();
        })
        .then(csvData => {
            const lines = csvData.split('\n');
            lines.shift();
            const todaysItems = {};

            lines.forEach(line => {
                const parsedLine = parseCSVToArray(line);
                if (!parsedLine) return;

                const [timestamp, hostel, breakfast, lunch, snacks, dinner, breakfastImage, lunchImage, snacksImage, dinnerImage] = parsedLine;

                if (isDateToday(timestamp)) {
                    todaysItems[hostel] = {
                        breakfast,
                        lunch,
                        snacks,
                        dinner,
                        breakfast_image: breakfastImage,
                        lunch_image: lunchImage,
                        snacks_image: snacksImage,
                        dinner_image: dinnerImage
                    };
                }
            });

            return todaysItems;
        })
        .catch(error => {
            console.error("Error fetching menu:", error);
        });
}

// Notes from HEC
function fetchNotes() {
    const notesUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5xfG2JM4qoQddDVT_6KAa-N9823amzU4uncd4y7z5xzkwP101DyGxea7MtaMLRo05TAdwauHPgYff/pub?gid=399925005&single=true&output=csv";

    return fetch(notesUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            return response.text();
        })
        .then(csvData => {
            const lines = csvData.split('\n');
            lines.shift();

            const notes = {};

            lines.forEach(line => {
                const parsedLine = parseCSVToArray(line);
                if (!parsedLine) return;

                const [timestamp, email, hostel, breakfast, lunch, snacks, dinner] = parsedLine;

                if (isDateToday(timestamp) && isEmailValid(email)) {
                    notes[hostel] = {
                        breakfast,
                        lunch,
                        snacks,
                        dinner
                    };
                }
            });

            return notes;
        })
        .catch(error => {
            console.error("Error fetching notes:", error);
        });
}

function addMeals(todaysItems, notes) {

    for (let mealName in menu) {
        // `mealName` is the meal name ("breakfast", "lunch", etc.)
        let meal = menu[mealName];
        commonItems = meal[7].join(', '); // Common items for all canteens

        mahanadi = constructMenu(
            getItem(todaysItems, "Mahanadi", mealName),
            getItem(notes, "Mahanadi", mealName),
            getItem(todaysItems, "Mahanadi", `${mealName}_image`)
        );
        brahmaputra = constructMenu(
            getItem(todaysItems, "Brahmaputra", mealName),
            getItem(notes, "Brahmaputra", mealName),
            getItem(todaysItems, "Brahmaputra", `${mealName}_image`)
        );
        rushikulya = constructMenu(
            getItem(todaysItems, "Rushikulya", mealName),
            getItem(notes, "Rushikulya", mealName),
            getItem(todaysItems, "Rushikulya", `${mealName}_image`)
        );
        kaveri = constructMenu(
            getItem(todaysItems, "Kaveri", mealName),
            getItem(notes, "Kaveri", mealName),
            getItem(todaysItems, "Kaveri", `${mealName}_image`)
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

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
    moveToSection();

    Promise.all([fetchMenu(), fetchNotes()])
        .then(([todaysItems, notes]) => {
            addMeals(todaysItems, notes);
        })
        .catch(error => {
            console.error("Error initializing application:", error);
        });
});
