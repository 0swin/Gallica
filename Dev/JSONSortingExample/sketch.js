var url = "../../Data/gallica_videos.json"
var datas
var records

function preload() {
    datas = loadJSON(url)
}

function setup() {
    records = datas.records
    let dictionary = {}
    let regex = /\W+/;
    for (let i = 0; i < records.length; i++) {
        let title = records[i].title
        title = title.toLowerCase();
        title = title.replace(/[0-9]/g, ""); // VIRER LES CHIFFRES
        title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // VIRER LES ACCENTS
        let firstWord = title.split(regex); // VIRER LA PONCTUATION
        let finalWord = "";
        // NE GARDER QUE LES MOTS QUI FONT QUE PLUS DE X CARACTERES
        for (let j = 0; j < firstWord.length; j++) {
            let word = firstWord[j];
            if (word.length > 2) {
                finalWord = word;
                break;
            }
        }
        console.log(finalWord.split(""))
        // countPer(finalWord, dictionary)
    }

    console.log(dictionary)
}

function draw() {}