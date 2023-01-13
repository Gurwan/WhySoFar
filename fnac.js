url = window.location.toString();

if(url.includes("fnac.com")){
    var dl = document.querySelectorAll("dl");
    let poids = 0;
    let ean = null;
    let origineCountry = 'inconnu';
    dl.forEach(function(el){
        if(el.getElementsByClassName("f-productProperties__term")[0] != undefined && el.getElementsByClassName("f-productProperties__term")[0].innerHTML.toLowerCase().includes("poids")){
            poids = el.getElementsByClassName("f-productProperties__definition")[0].outerText;
        }
        if(el.getElementsByClassName("f-productProperties__term")[0] != undefined && el.getElementsByClassName("f-productProperties__term")[0].innerHTML.toLowerCase().includes("ean")){
            ean = el.getElementsByClassName("f-productProperties__definition")[0].outerText;
        }
    });

    if(ean != null){
        origineCountry = convertToCountry(ean);
    }

    const priceDiv = document.getElementsByClassName("f-productSection f-faPriceBox js-OfferPriceSwitcher")[0];

    let divInd = document.createElement("div");
    divInd.setAttribute("id","indicator-id");
    divInd.style.cssText = "margin-top:15px";
    divInd.style.height = "150px";

    if((poids != 0 || ean != null) && false){
        
        let titleIndicateur = document.createElement("span");
        titleIndicateur.style.cssText = "font-weight:800;font-size:15px;color:black;";
        titleIndicateur.appendChild(document.createTextNode("Indicateur WhySoFar FNAC"));
        divInd.appendChild(titleIndicateur);
        let node = document.createTextNode("Le poids de ce produit est : " + poids + " et le pays d'origine est : " + origineCountry)
        let p = document.createElement("p");
        p.style.cssText = "font-size:13px; font-weight: 600";
        p.appendChild(node);
        divInd.appendChild(p);
    
        insertAfterPrice(priceDiv,divInd)
    }

    let indicator = indicate(origineCountry);
    let image = document.createElement("img");
    switch (indicator){
        case 'A':
            image.src = "https://i.ibb.co/bm4JQmx/ftp-a90.png";
            break;
        case 'B':
            image.src = "https://i.ibb.co/r5Xm7rC/ftp-b90.png";
            break;
        case 'C':
            image.src = "https://i.ibb.co/Swryrcp/ftp-c90.png";
            break;
        case 'D':
            image.src = "https://i.ibb.co/V9Yyn9b/ftp-d90.png";
            break;
        case 'E':
            image.src = "https://i.ibb.co/QY1pXwv/ftp-e90.png";
            break;
        case 'U':
            image.src = "https://i.ibb.co/vPkm6bP/ftp-unknown.png";
            break;
        default:
            image.src = "https://i.ibb.co/vPkm6bP/ftp-unknown.png";
            break;
    }
    image.width = "244";
    image.height = "150";

    divInd.appendChild(image);
    insertAfterPrice(priceDiv,divInd)
}

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

function indicate(country){
    country = country.toUpperCase();
    country = country.trim();
    let ret = 'U';
    switch(country){
        case "FR":
        case "FRANCE":
            ret = 'A'
            break;
        case "DE":
        case "ALLEMAGNE":
        case "UK":
        case "ROYAUME-UNI":
        case "BE ou LX":
        case "BELGIQUE":
        case "LUXEMBOURG":
        case "DK":
        case "DANEMARK":
        case "SUI":
        case "SUISSE":
        case "IT":
        case "ITALIE":
        case "ESP":
        case "ESPAGNE":
        case "NED":
        case "SLOVAQUIE":
        case "PAYS-BAS":
        case "AUT":
        case "AUTRICHE":
            ret = 'B'
            break;
        case "FI":
        case "FINLANDE":
        case "NOR":
        case "NORVEGE":
        case "SUE":
        case "SUEDE":
        case "TUR":
        case "TURQUIE":
            ret = 'C';
            break;
        case "USA":
        case "JP":
        case "JAPON":
        case "RU":
        case "RUSSIE":
        case "ADS":
        case "AFRIQUE DU SUD":
        case "CHINA":
        case "CHINE":
        case "CA":
        case "CANADA":
        case "COL":
        case "COLOMBIE":
        case "ARG":
        case "ARGENTINE":
        case "BRE":
        case "BRESIL":
        case "NZ":
        case "TAÏWAN":
        case "NOUVELLE ZELANDE":
            ret = 'E';
            break;
    }
    return ret;
}

function insertAfterPrice(divPrice, indicateurWSF) {
    divPrice.parentNode.insertBefore(indicateurWSF, divPrice.nextSibling);
}