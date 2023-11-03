const d = new Date();
let day = d.getDay();
let hours = d.getHours();

function construct_menu(defaultItems, specialItems) {
    const defaultItemsString = defaultItems.join(', ');
    const specialItemsString = specialItems.join(', ');
    return `
    <b>Common Items:</b> ${defaultItemsString}
    <br>
    <b>Today's Items:</b> ${specialItemsString}
    `;
};

function addMeals() {

    for (let mealName in menu) {
        // `mealName` is the meal name ("breakfast", "lunch", etc.)
        let meal = menu[mealName];

        // `meal[7]` is the default items
        // what does each element of (day + n + 6)%7 represent?
        //     - day: current day of the week (0-6)
        //     - n  : settings for different canteens
        //     - 6:   their 1 is our 0 (in menu.js)... so to compensate that we
        //            had to add a number which is 1 less than a multiple of 7
        brahmaputra = construct_menu(meal[7], meal[(day + 0 + 6)%7]);
        mahanadi    = construct_menu(meal[7], meal[(day + 1 + 6)%7]);
        kaveri      = construct_menu(meal[7], meal[(day + 2 + 6)%7]);
        rushikulya  = construct_menu(meal[7], meal[(day + 3 + 6)%7]);

        element = document.getElementById(mealName);

        element.innerHTML = `
        <div class="meal">${mealName.charAt(0).toUpperCase()}${mealName.slice(1)}</div>
        <div class="canteen-card">
            <span class="canteen-name">Brahmaputra</span><br>
            <span class="menu">${brahmaputra}</span>
        </div>
        <div class="canteen-card">
            <span class="canteen-name">Mahanadi</span><br>
            <span class="menu">${mahanadi}</span>
        </div>
        <div class="canteen-card">
            <span class="canteen-name">Kaveri</span><br>
            <span class="menu">${kaveri}</span>
        </div>
        <div class="canteen-card">
            <span class="canteen-name">Rushikulya</span><br>
            <span class="menu">${rushikulya}</span>
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

addMeals();
move();