// 0 to 6 here maps to 1 to 7 in the pdf.
// For example, menu you put here at 0 should be marked as 1 in the pdf.
// The everyday menu in the pdf should be put into 7 here.
// How it works: The javascript code displays the 7 as Default Item
//               Then it takes the array according to the day, joins them with
//               a comma-space (', ') and displays it in the special items section.

let menu = {
    "breakfast":{
        0: ["Plain/Masala Idli", "Rava Upma", "Sambar", "Rasam", "Pudina-Chutney"],
        1: ["Dosa", "Puri", "Sambar", "Aloo Dum", "Chutney"],
        2: ["Plain Paratha", "Poha", "Curd", "Chutney", "Ghuguni", "Chhole Kulcha"],
        3: ["Stuffed Kachori", "Chakuli", "Matar Aloo Dum", "Green Chutney"],
        4: ["Uttapam", "Dhokla", "Sambar", "Chutney"],
        5: ["Puri", "Semiya Upma", "Ghuguni", "Chutney"],
        6: ["Gobi/Aloo Paratha", "Bada", "Matar Ghuguni", "Coconut Chutney"],
        7: ["Milk", "Egg", "Ginger Tea", "Coffee", "Omelette", "Boiled Egg", "Corn Flakes/Oats", "Fruits", "Toast Bread + Jam", "Sprouts", "Juice"]        
    },
    "lunch": {
        0: ["Dalma", "Saag Fry", "Tomato / Mango Khatta", "Prawn Curry (instead of Chicken Curry)"],
        1: ["Gobi Matar/Aloo dum", "Karela-Aloo Chips"],
        2: ["Potala Rasa/Kadhi Pakoda", "Bhindi Bhujia/Bhaja", "Biryani (Veg, Non veg)"],
        3: ["Veg Kofta", "Dahi Baingan", "Mushroom Curry (instead of Paneer Curry)"],
        4: ["Mix Veg/Veg ghanta", "Aloo Kundru (ivy gourd)", "Biriyani(Veg, Non veg)"],
        5: ["Tawa Veg", "Dal Vada Masala/Besan curry", "Mutton Curry (instead of Chicken Curry)"],
        6: ["Rajma", "Baingan Bharta/Aloo Posto", "Biriyani (Veg, Non veg)"],
        7: ["Rice", "Dal", "Roti", "Salad", "Paneer Curry", "Egg Curry", "Fish Curry", "Chicken Curry", "Bundi Raita/Veg raita/Lassi/Curd", "Sweet", "Achar"]        
    },
    "snacks": {
        0: ["Roll(Paneer", "Egg", "Chicken)", "Pakoda (Pyaz/Paneer/Chicken)", "Green Chutney"],
        1: ["Chowmein (Veg", "Egg", "Chicken)", "Medu Vada", "Sambar", "American Corn Fry"],
        2: ["Pani Puri", "Papdi Chaat", "Aloo tikki chaat", "Green Chutney"],
        3: ["Sandwich/Bread Pakoda", "Dosa (Plain, Masala)", "Sambar", "Chutney"],
        4: ["Sweet Corn", "Masala Maggi", "Chicken Lollipop", "Green Chutney"],
        5: ["Pav Bhaji/Vada pav/Dabeli", "Jhal Muri (Bhel Puri)", "Spicy Chutney"],
        6: ["Cutlet (Veg", "Chicken)", "Dahi Vada", "French Fries", "Aloo Dum", "Green Chutney"],
        7: ["Ginger Tea", "Coffee", "Fruits"]        
    },
    "dinner": {
        0: ["Gobi Chilli", "Palak-Matar Aloo", "Sahi Tukda/Malpua (Sweet)/ Bobbatlu"],
        1: ["Veg Kofta", "Baingan Bharta", "Rice Kheer (Sweet)"],
        2: ["Soyabean Masala", "Tawa Mix Veg", "Rasagolla (Sweet)"],
        3: ["Punjabi Chole Masala", "Potato Chili", "Jalebi (Sweet)/ Kalakand"],
        4: ["Rajma", "Lauki Masala", "Balushahi (Sweet)/Mysore paak"],
        5: ["Potala Rasa", "Bhindi do pyaza", "Suji Halwa (Sweet)/Gajar Halwa"],
        6: ["Veg Manchurian", "Jeera Aloo", "Gulab Jamun/Ice cream (Sweet)"],
        7: ["Roti", "Rice", "Dal(Arahar/ Moong/ Musoor, etc)", "Salad", "Paneer Curry", "Egg Curry", "Fish Curry", "Chicken Curry", "Papad", "Achar", "Ghee"]        
    }
}