var url = "../../Data/gallica_videos.json"
var datas
var records

function preload() {
    datas = loadJSON(url)
}

function setup() {
    pixelDensity(2)
    let scaleFactor = 1
    createCanvas(scaleFactor * 500, scaleFactor * 500)
    background(0)

    // VARIABLES DONNEES
    let dateMin = 1990
    let dateMax = 2019
    let records = datas.records
    let dictionary = []
    let regex = /\W+/

    for (let i = 0; i < records.length; i++) {
        let date = records[i].date
        date = parseDate(date)
        let title = records[i].title
        if (dateMin <= date && date <= dateMax) {
            title = title.toLowerCase()
            // VIRER LES CHIFFRES
            title = title.replace(/[0-9]/g, "")
            // VIRER LES ACCENTS
            title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            // VIRER LA PONCTUATION
            let firstWord = title.split(regex)
            // NE GARDER QUE LES MOTS QUI FONT QUE PLUS DE X CARACTERES
            for (let j = 0; j < firstWord.length; j++) {
                let word = firstWord[j]
                if (word.length > 2) {
                    finalWord = word
                    break
                }
            }
            dictionary.push(finalWord)
        }
    }
    console.log(dictionary)

    // VARIABLES DESSIN
    let originx = width / 2
    let originy = height / 2
    let radius = height / 100 * 30
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
    let nbpoint = alphabet.length
    let strokeOpacity = (8 / dictionary.length * 255)
    // let strokeOpacity = 255

    // GENERER LE CERCLE
    noFill()
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
        let px2 = cos(angle) * (radius + radius / 100 * 10) + originx
        let py2 = sin(angle) * (radius + radius / 100 * 10) + originy
        textAlign(CENTER, CENTER);
        text(alphabet[j].toUpperCase(), px2, py2)
    }

    for (let i = 0; i < dictionary.length; i++) {
        let word = dictionary[i]
        // SPLIT CHAQUE MOT EN ARRAY DE CARACTERES
        word = word.split("")
        for (let i = 0; i < word.length; i++) {
            // DEFINIR LES COORDONNEES D'UNE LETTRE
            let letterStart = alphabet.indexOf(word[i])
            let angleStart = map(letterStart, 0, 26, 0 - HALF_PI, TWO_PI - HALF_PI)
            let pxStart = cos(angleStart) * (radius) + originx
            let pyStart = sin(angleStart) * (radius) + originy

            // DEFINIR LES COORDONNEES DE LA LETTRE SUIVANTE
            let letterEnd = alphabet.indexOf(word[i + 1])
            let angleEnd = map(letterEnd, 0, 26, 0 - HALF_PI, TWO_PI - HALF_PI)
            let pxEnd = cos(angleEnd) * (radius) + originx
            let pyEnd = sin(angleEnd) * (radius) + originy

            // TRACER UNE COURBE DE BEZIER DONT LES TANGENTES TENDENT VERS LE CENTRE DE GRAVITE DU TRIANGLE Lettre1/Lettre2/OrigineDuCercle
            // stroke(255, 255, 255, strokeOpacity)
            strokeWeight(scaleFactor * 1.5)
            noFill()

            // COULEURS
            let hueStart = 174
            let hueEnd = 304
            let nbSegments = word.length - 1
            let color = hueStart + (i * (hueEnd - hueStart) / nbSegments)
            colorMode(HSB)
            stroke(color, 75, 100, strokeOpacity / 255)

            // DESSINER UNE COURBE DE BEZIER DONT LES TANGENTES TENDENT VERS LE CENTRE DE GRAVITE DESSINÉ DU TRIANGLE ENTRE LES DEUX POINTS ET L'ORIGINE DU CERCLE
            let xTriangleCenter = (pxStart + pxEnd + originx) / 3
            let yTriangleCenter = (pyStart + pyEnd + originy) / 3
            bezier(pxStart, pyStart, xTriangleCenter, yTriangleCenter, xTriangleCenter, yTriangleCenter, pxEnd, pyEnd)
        }
    }

    // save("image" + ".png");
}

function draw() {

}

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }