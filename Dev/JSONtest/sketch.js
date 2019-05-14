var url = "../../Data/gallica_videos.json"
var datas

function preload() {
    datas = loadJSON(url)
    console.log(datas)
}

function setup() {
    let nbDocs = datas.numberOfRecords
    // console.log(nbDocs, date)

    for (let index = 0; index < datas.records.length; index++) {
        let date = datas.records[index].date
        console.log(date)
    }
}

function draw() {}