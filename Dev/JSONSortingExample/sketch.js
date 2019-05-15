var url = "../../Data/gallica_videos.json"
var datas
var records

function preload() {
    datas = loadJSON(url)
}

function setup() {
    createCanvas(500, 500)
    background(0)

    records = datas.records
    let dictionary = {}
    let regex = /\W+/;
    for (let i = 0; i < records.length; i++) {
        let title = records[i].title
        title = title.toLowerCase();
        title = title.replace(/[0-9]/g, "") // VIRER LES CHIFFRES
        title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // VIRER LES ACCENTS
        let firstWord = title.split(regex) // VIRER LA PONCTUATION
        // NE GARDER QUE LES MOTS QUI FONT QUE PLUS DE X CARACTERES
        for (let j = 0; j < firstWord.length; j++) {
            let word = firstWord[j];
            if (word.length > 2) {
                finalWord = word;
                break
            }
        }
        // console.log(finalWord.split(""))
    }

    let originx = width / 2
    let originy = height / 2
    let radius = 200
    let nbpoint = 26
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("")

    // GENERER LE CERCLE
    fill(255)
    beginShape()
    for (let j = 0; j < nbpoint; j++) {
        let angle = map(j, 0, nbpoint, 0 - HALF_PI, TWO_PI - HALF_PI)
        let px = cos(angle) * radius + originx
        let py = sin(angle) * radius + originy
        vertex(px, py)
    }
    endShape(CLOSE)

    // PLACER L'ALPHABET AUTOUR DU CERCLE
    fill(255)
    for (let j = 0; j < nbpoint; j++) {
        let angle = map(j, 0, nbpoint, 0 - HALF_PI, TWO_PI - HALF_PI)
        let px2 = cos(angle) * (radius + 10) + originx
        let py2 = sin(angle) * (radius + 10) + originy
        textAlign(CENTER, CENTER);
        text(alphabet[j].toUpperCase(), px2, py2)
    }

    // let angle = map(25, 0, 26, 0 - HALF_PI, TWO_PI - HALF_PI)
    // let px2 = cos(angle) * (radius) + originx
    // let py2 = sin(angle) * (radius) + originy
    // rectMode(CENTER)
    // rect(px2, py2, 10, 10)

    let word = "gallica"
    word = word.split("")
    for (let i = 0; i < word.length; i++) {
        let letterStart = alphabet.indexOf(word[i])
        let angleStart = map(letterStart, 0, 26, 0 - HALF_PI, TWO_PI - HALF_PI)
        let pxStart = cos(angleStart) * (radius) + originx
        let pyStart = sin(angleStart) * (radius) + originy

        let letterEnd = alphabet.indexOf(word[i + 1])
        let angleEnd = map(letterEnd, 0, 26, 0 - HALF_PI, TWO_PI - HALF_PI)
        let pxEnd = cos(angleEnd) * (radius) + originx
        let pyEnd = sin(angleEnd) * (radius) + originy

        if (i == (word.length - 1)) {

        } else {
            line(pxStart, pyStart, pxEnd, pyEnd)
        }
    }

}

function draw() {

}