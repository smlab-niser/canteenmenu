# NISER Canteen Menu

&emsp; This is a static site built to show the menu of NISER Canteen.

&emsp; **Previously** it was not fixed and the canteen owners used to fill a google form. There was a google sheet linked to that. The frontend used to request google for that sheet in csv format, parsed the content and showed the canteen accordingly. That was a very interesting and clever implementation to make a static site somewhat behave like a dynamic site. (the previous js file has not been deleted and can be found at [js/script_old.js](js/script_old.js)).

&emsp; **Now** the canteen menu has been fixed by NISER authorities. So, the canteen owners no longer need to fill any google form, the content of everyday is predetermined. So the frontend just needs to show the content of the day. The menu is stored in a javascript object. The frontend just needs to parse the object and show the content accordingly.

## How to Update Menu

In future if the menu changes due to some reason, any layman can update the menu just by editing the [js/menu.js](js/menu.js) file. No technical knowledge is essential.


&emsp; 0 to 6 in [menu.js](js/menu.js) maps to 1 to 7 in the [PDF](Canteen%202023.pdf). For example, the menu you put in [menu.js](js/menu.js) at 0 should be marked as 1 in the [PDF](Canteen%202023.pdf). The everyday menu in the [PDF](Canteen%202023.pdf) should be put into 7 in [menu.js](js/menu.js).

&emsp; After doing all this, u have to email [Prof. Subhankar Mishra](mailto:smishra@niser.ac.in) for further instructions for hosting the site.

**How it works:**
&emsp; The JavaScript code displays the 7 as Default Item. Then it takes the array according to the day, joins the elements with a comma-space (', '), and displays it in the special items section.
