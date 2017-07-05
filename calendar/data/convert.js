var fs = require('fs');
let filename = [__dirname + '/201701', __dirname + '/201702', __dirname + '/201703', __dirname + '/201704', __dirname + '/201705', __dirname + '/201706'];
let weathers = {}
filename.forEach(file => {
    fs.readFile(file, (err, data) => {
        let datas = data.toString().split('\n').map(data => data.split('\t'));

        datas.forEach(item => {
            let city = item[0];
            let date = item[1];
            let weather = item[2];
            weathers[city] = weathers[city] || {};
            weathers[city][date] = weather;
        });
        fs.writeFile('./data/weather.js', 'var weather = ' + JSON.stringify(weathers));
    })
})