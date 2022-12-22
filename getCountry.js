function convertToCountry(code){
    let origineCountry = null;
    let eanCountry = parseInt(code.substring(0,3));
    //https://fr.wikipedia.org/wiki/Code-barres_EAN
    if(eanCountry < 139){
        origineCountry = "USA";
    } else if(eanCountry >= 300 && eanCountry <= 379){
        origineCountry = "FR";
    } else if(eanCountry >= 400 && eanCountry <= 440){
        origineCountry = "DE";
    } else if(eanCountry >= 450 && eanCountry <= 459){
        origineCountry = "JP";
    } else if(eanCountry >= 460 && eanCountry <= 469){
        origineCountry = "RU";
    } else if(eanCountry >= 490 && eanCountry <= 499){
        origineCountry = "JP";
    } else if(eanCountry >= 500 && eanCountry <= 509){
        origineCountry = "UK";
    } else if(eanCountry == 520 || eanCountry == 521){
        origineCountry = "JP";
    } else if(eanCountry >= 540 && eanCountry <= 549){
        origineCountry = "BE ou LX";
    } else if(eanCountry >= 570 && eanCountry <= 579){
        origineCountry = "DK";
    } else if(eanCountry >= 600 && eanCountry <= 601){
        origineCountry = "ADS";
    } else if(eanCountry >= 640 && eanCountry <= 649){
        origineCountry = "FI";
    } else if(eanCountry >= 690 && eanCountry <= 699){
        origineCountry = "CHINA";
    } else if(eanCountry >= 700 && eanCountry <= 709){
        origineCountry = "NOR";
    } else if(eanCountry >= 730 && eanCountry <= 739){
        origineCountry = "SUE";
    } else if(eanCountry >= 754 && eanCountry <= 755){
        origineCountry = "CA";
    } else if(eanCountry >= 760 && eanCountry <= 769){
        origineCountry = "SUI";
    } else if(eanCountry >= 770 && eanCountry <= 771){
        origineCountry = "COL";
    } else if(eanCountry >= 778 && eanCountry <= 779){
        origineCountry = "ARG";
    } else if(eanCountry >= 789 && eanCountry <= 790){
        origineCountry = "BRE";
    } else if(eanCountry >= 800 && eanCountry <= 839){
        origineCountry = "IT";
    } else if(eanCountry >= 840 && eanCountry <= 849){
        origineCountry = "ESP";
    } else if(eanCountry >= 868 && eanCountry <= 869){
        origineCountry = "TUR";
    } else if(eanCountry >= 870 && eanCountry <= 879){
        origineCountry = "NED";
    } else if(eanCountry >= 900 && eanCountry <= 919){
        origineCountry = "AUT";
    } else if(eanCountry >= 930 && eanCountry <= 939){
        origineCountry = "AUS";
    } else if(eanCountry >= 940 && eanCountry <= 949){
        origineCountry = "NZ";
    } else if(eanCountry >= 978 && eanCountry <= 979){
        //ISBN -> https://en.wikipedia.org/wiki/List_of_ISBN_registration_groups
        //if 978 - 6 -> code on 2 or 3 bits
            // 978 - 60-64 -> code on 3 bits
        //if 978 - 8 -> code on 2 bits
        //if 978 - 9 -> code on 2, 3, 4 or 5 bits
            // 978 - 95-98 -> code on 3 bits
            // 978 - 991-998 -> code on 4 bits
            // 978 - 9990-9999 -> code on 5 bits
        if(parseInt(code.substring(3,4)) < 6 || parseInt(code.substring(3,4)) == 7){
            eanCountry = parseInt(code.substring(3,4));  
            switch(eanCountry){
                case 0:
                case 1:
                    origineCountry = "UK"; //ou USA ?
                    break;
                case 2:
                    origineCountry = "FR";
                    break;
                case 3:
                    origineCountry = "DE";
                    break;
                case 4:
                    origineCountry = "JP";
                    break;
                case 5:
                    origineCountry = "RU";
                    break;
                case 7: 
                    origineCountry = "CHINA";
                    break;
            }
        }
    } else {
        origineCountry = eanCountry;
    }
    return origineCountry;
}