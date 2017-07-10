var fs = require('fs');
fs.readFile('data.csv', (err, data) => {
    let datas = data.toString().split('\r');
    let retData = [];
    // console.log(datas)
    datas.forEach((item, index) => {
        // console.log(index)
        
        let items = item.split(',');
        items.forEach((d, i) => {
            retData[i] = retData[i] || {};
            if (index === 0) {
                retData[i].title = d;
            } else {
                retData[i].data = retData[i].data || [];
                retData[i].data.push(d);
            }
        });

    });

    fs.writeFile('./data.json', JSON.stringify(retData));
})