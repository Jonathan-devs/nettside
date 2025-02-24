function opptater_rad(e) {
    let pris =e.parentNode.parentNode.children[2].children[0].innerHTML; //finner prisen til produktet

    let fulpris = pris*e.value; //ganger prisen med anntallet du har av prduktet
    e.parentNode.parentNode.children[3].children[0].innerHTML = fulpris;    //endrer på fulprisen, til ny pris
    update_sum(e.parentNode.parentNode.parentNode)  //starter opptater sum funksjonen

}

function update_sum(whole_list) {
    let rows = Array.from(whole_list.children); //lager en liste av alle radene

    rows.shift();   //fjerner den første raden i listen, siden den er titler
    let sum = 0 //lager en sum som er lik null
    for(let i in rows) {    //starter en for-løkke, legger til totalprisen til hvert produkt til prisen
                sum += +rows[i].children[3].children[0].innerText;
    }
    document.getElementById("sum").innerText = `Summen er: ${sum}kr`   //opptaterer summen
}

function show_list() {  //gjør så listen vises
    let listen = document.getElementById("table");
    listen.hidden="until-found";

}
function hide_list() {  //gjør så listen er skjult
    let listen = document.getElementById("table")
    listen.hidden="hidden"
}

function add_tolist() { //funksjon for å lage ny rad
    let table = document.getElementById("table").children[0];
    let navn = document.getElementById("name_input").value;
    let pris = document.getElementById("pris_input").value;

    if(navn !== "" && pris !== "") {    //if settning som passer på at både et navn og bris har blitt gitt
        document.getElementById("newRowForm").reset()   //reseter navn og pris boksen
        newRow = table.insertRow(); //putter inn en ny rad i tbody
        newRow.innerHTML = `
                <td><p>${navn}</p></td>
                <td><input type="number" oninput="opptater_rad(this)"></td>
                <td><p>${pris}</p></td>
                <td><p>0</p></td>
                <th><button type="button" onclick="delete_row(this)">Slett rad</button></th>
        `;  //legger til all informasjonen i den nye raden

    }
    else {  //hvis de ikke har fylt in begge boksene, vil be brukeren om å gjøre det
        window.alert("fyll ut begge boksene")
    }
}

function delete_row(info) { //funksjon for å slette rad
    let row = info.parentNode.parentNode;
    let hele_listen = row.parentNode
    row.parentNode.removeChild(row) //sletter raden
    update_sum(hele_listen)         //opptaterer listen
}