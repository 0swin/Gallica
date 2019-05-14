var url = "../../Data/gallica_audios.json"
var datas
var records

function preload() {
    datas = loadJSON(url)
    console.log(datas)
}

function setup() {
    records = datas.records
    let dictionary = {}
    for (let i = 0; i < records.length; i++) {
        let value = records[i].datestamp
        // let subvalue = records[i].date
        // subvalue = parseDate(value)
        value = convertToDate(value)
        countPer(value, dictionary)
    }
    
    let size = sizeOf(dictionary)
    console.log(size)    
    console.log(dictionary)

    let array = convertDictionaryIntoJSONArray(dictionary)
    let json = {}
    json.records = array
    saveJSON(json, "export.json")
}

function draw() {}