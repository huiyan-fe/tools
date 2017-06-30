var fs = require('fs');
fs.readFile('congestRoad.dat', (err, data) => {
    let dataStr = data.toString();

    let retObj = {};

    let dataObj = dataStr.split('\n').map((item, index) => {
        if (index > 0) {
            let dataArr = item.split('\t');
            retObj[dataArr[0]] = retObj[dataArr[0]] || {}
            let retObjFather = retObj[dataArr[0]];
            retObjFather.title = dataArr[0];
            retObjFather.length = Number(retObjFather.length || 0) + Number(dataArr[5]);
            retObjFather.index = dataArr[8];
            retObjFather.speed = dataArr[9];
            retObjFather.speeds = retObjFather.speeds || [];
            retObjFather.speeds.push(dataArr[3])
            retObjFather.locations = retObjFather.locations || [];
            retObjFather.locations.push(dataArr[2]);
        }
    });


    Object.keys(retObj).map(key => {
        console.log(key)
        fs.writeFile('./' + key + '.json', JSON.stringify(retObj[key]));
    })



});