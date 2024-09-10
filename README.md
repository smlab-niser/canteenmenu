# NISER Canteen Menu

This static site displays the menu for the NISER Canteen.

**Previous Version (Fixed Menu)**:  
Previously, the menu was fixed by Gymkhana, and there was no need for canteen owners to update it. The menu was stored in a JavaScript object, and the frontend simply displayed the content for the day.

**Current System (Dynamic Menu via Google Form)**:  
The system has now reverted to its original setup, where canteen owners fill out a Google Form daily. The responses are automatically linked to a Google Sheet, and the frontend fetches the sheet in CSV format, parses it, and updates the menu accordingly. This clever implementation allows the static site to behave dynamically.

## How to Update Menu

To update the menu, canteen owners must fill out the daily Google Form. The form responses are automatically reflected on the website through the linked Google Sheet.