var urls = []

var datasArray = []
var datas
var records

function preload() {
    for (let i = 0; i < 29; i++) {
        let url = "../../Data/periodiques-parts/gallica_periodiques" + i + ".json"
        urls.push(url);
        let datas = loadJSON(url)
        datasArray.push(datas);
    }
    console.log(datasArray);
}

function setup() {
    pixelDensity(8)
    let scaleFactor = 1
    createCanvas(scaleFactor * 500, scaleFactor * 500)
    // background(255, 255, 255)

    // VARIABLES DONNEES
    function generateDataviz(dateMin, dateMax) {

        // let records = datas.records
        let dictionary = []
        let regex = /\W+/

        for (let k = 0; k < datasArray.length; k++) {
            let data = datasArray[k];
            let records = data.records;
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
                    // console.log(finalWord)
                }
            }
        }
        console.log(dictionary);

        // VARIABLES DESSIN
        let originx = width / 2
        let originy = height / 2
        let radius = height / 100 * 40
        let alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
        let nbpoint = alphabet.length
        let strokeOpacity = (25 / dictionary.length * 100)

        // GENERER LE CERCLE
        noFill()
        noStroke()
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
            let px2 = cos(angle) * (radius + radius / 100 + 15) + originx
            let py2 = sin(angle) * (radius + radius / 100 + 15) + originy
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
                strokeWeight(scaleFactor * 1)
                noFill()

                // COULEURS
                let hueStart = 165
                let hueEnd = 360
                let nbSegments = word.length - 1

                colorMode(RGB)
                let rgbStart = color(0, 159, 255)
                let rgbEnd = color(236, 47, 75)
                let rgb = lerpColor(rgbStart, rgbEnd, (i / nbSegments))
                rgb.setAlpha(strokeOpacity * 4)

                // let color = hueStart + (i * (hueEnd - hueStart) / nbSegments)
                stroke(rgb)

                // DESSINER UNE COURBE DE BEZIER DONT LES TANGENTES TENDENT VERS LE CENTRE DE GRAVITE DESSINÉ DU TRIANGLE ENTRE LES DEUX POINTS ET L'ORIGINE DU CERCLE
                if (i == (word.length - 1)) {

                } else {
                    let xTriangleCenter = (pxStart + pxEnd + originx) / 3 + random(40) - 20
                    let yTriangleCenter = (pyStart + pyEnd + originy) / 3 + random(40) - 20
                    bezier(pxStart, pyStart, xTriangleCenter, yTriangleCenter, xTriangleCenter, yTriangleCenter, pxEnd, pyEnd)
                }
            }
        }
        save("periodiques-" + dateMin + "-" + dateMax + ".png");
    }
    generateDataviz(2000, 2019)
}

function draw() {}