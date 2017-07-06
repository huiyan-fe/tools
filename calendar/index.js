let param = {};

let datas = {
    3: {
        5: 1,
        10: 2,
        12: 3,
        18: 4,
        19: 5
    },
    1: {
        1: 10,
        5: 10,
        15: 10,
        3: 10,
        16: 10
    }
}


location.search.slice(1).split('&').map(item => {
    let kv = item.split('=');
    param[kv[0]] = kv[1];
});

let citycode = param.city || 131
let cityWeather = weather[citycode];

// levels 
var levels1 = param.levels1 || 20;
var levels2 = param.levels2 || 40;
var levels3 = param.levels3 || 20;
var levels4 = param.levels4 || 10;
var levels5 = param.levels5 || 10;

formatData();



let cityDom = document.getElementById('city');
cityDom.value = citycode;
cityDom.onkeyup = (e) => {
    citycode = parseInt(e.target.value);
    history.pushState({}, '', `?city=${citycode}&levels1=${levels1}&levels2=${levels2}&levels3=${levels3}&levels4=${levels4}&levels5=${levels5}`);
    cityWeather = weather[citycode];

    dom.innerHTML = '';
    for (var i = 1; i <= 12; i++) {
        dom.appendChild(createMonth(`2017/${i}`));
    }
}

let index = [levels1, levels2, levels3, levels4, levels5]
for (let i = 0; i < 5; i++) {
    let inputDom = document.getElementById(`levels${i+1}`);
    inputDom.value = index[i]

    inputDom.onkeyup = (e) => {
        window[`levels${i+1}`] = e.target.value;
        // console.log(window[`levels${i+1}`] )
        history.pushState({}, '', `?city=${citycode}&levels1=${levels1}&levels2=${levels2}&levels3=${levels3}&levels4=${levels4}&levels5=${levels5}`);
        formatData();
        dom.innerHTML = '';
        for (var i = 1; i <= 12; i++) {
            dom.appendChild(createMonth(`2017/${i}`));
        }
    }
}

// console.log(weathermap)

function formatData() {
    let dataMin = Infinity;
    let dataMax = -Infinity;
    let rankByValue = [];
    Object.keys(datas).forEach(key => {
        let data = datas[key];
        Object.keys(data).forEach(key => {
            let value = data[key].value || data[key];
            dataMin = Math.min(dataMin, value);
            dataMax = Math.max(dataMax, value);
            data[key] = { value };
            rankByValue.push({
                value,
                item: data[key]
            })
        });
    });
    // rank
    // freerank
    Object.keys(datas).forEach(key => {
        let data = datas[key];
        Object.keys(data).forEach(key => {
            let value = data[key].value;
            let realPresent = (value - dataMin) / (dataMax - dataMin);
            precent = Math.ceil(realPresent / .2);
            precent = Math.max(precent, 1);
            data[key].level = precent;
        });
    });

    //

    for (let i = 0; i < 5; i++) {
        let inputDom = document.getElementById(`levels${i+1}`);
        window[`levels${i+1}`] = parseInt(inputDom.value);

    }


    if (document.getElementsByName('heattype')[1].checked) {
        console.log(levels1, levels2, levels3, levels4, levels5)
            // limited rank
        rankByValue.sort((a, b) =>
            b.value - a.value
        ).forEach((item, index) => {
            let precent = index / rankByValue.length;
            if (precent <= (levels5 / 100)) {
                item.item.level = 5;
            } else if (precent <= ((levels5 + levels4) / 100)) {
                item.item.level = 4;
            } else if (precent <= ((levels5 + levels4 + levels3) / 100)) {
                item.item.level = 3;
            } else if (precent <= ((levels5 + levels4 + levels3 + levels2) / 100)) {
                item.item.level = 2;
            } else {
                item.item.level = 1;
            }
            // console.log(precent, item.item);
        });
    }
    console.log(rankByValue);
}


function createMonth(inputTime) {
    let timeArr = inputTime.split('/');

    let dom = document.createElement('div');
    dom.className = 'month';
    // month title
    let domTitle = document.createElement('div');
    domTitle.className = 'month-title';
    domTitle.innerHTML = `${timeArr[0]} <span style="color: #f03136; font-size:24px;">${('0'+timeArr[1]).slice(-2)}</span>`
    dom.appendChild(domTitle);

    // month head
    let domHead = document.createElement('div');
    let days = ['日', '一', '二', '三', '四', '五', '六'];
    domHead.className = 'month-head';
    domHead.innerHTML = days.map(item => `<span class="block">${item}</span>`).join('');
    dom.appendChild(domHead);

    // month body
    let domBody = document.createElement('div');
    domBody.className = 'month-body';
    dom.appendChild(domBody)


    let time = new Date(timeArr[0], timeArr[1] - 1);
    time.setDate(0);
    let lastMonthLastDay = time.getDay() + 1;
    let lastMonthlastDate = time.getDate();
    time.setDate(1);
    time.setMonth(time.getMonth() + 2);
    time.setDate(0);
    let thisMonth = time.getMonth();
    let thisMonthLastDay = time.getDay();
    let thisMonthLastDate = time.getDate();


    let doms = [];


    // console.log(dataMin, dataMax)
    // data && console.log(data);
    let data = datas && datas[parseInt(timeArr[1])] || {};

    for (let i = 0; i < 42; i++) {
        let day;
        let className;
        let eventsCount;
        let dataInfo;
        let bgColors = ['#ffface', '#fff4a2', '#fff4a1', '#ffc187', '#ffa3a3'];
        let colors = ['#ffae19', '#ff7519', '#ff5716', '#ff0018', '#ff0018'];
        let img = '';
        if (i < lastMonthLastDay) {
            day = lastMonthlastDate - lastMonthLastDay + i + 1;
            className = 'disable';
        } else if (i - lastMonthLastDay < thisMonthLastDate) {
            if (i % 7 === 0 || i % 7 === 6) {
                className = 'weekend';
            }
            day = i - lastMonthLastDay + 1;
            let precent = 0;
            if (data[day]) {
                className += ` level-${data[day].level} `;
            }
            let dateStr = `${time.getFullYear()}${('0'+(time.getMonth()+1)).slice(-2)}${('0'+day).slice(-2)}`;
            let dayWeather = cityWeather && cityWeather[dateStr];
            let dayWeatherIcon = weathermap[dayWeather];
            if (dayWeather) {
                if (dayWeatherIcon) {
                    img = `<img style="width:20px;height:20px;" src="${dayWeatherIcon}"/>`
                } else {
                    console.log(dayWeather)
                }
            }
        } else {
            day = i - thisMonthLastDate - lastMonthLastDay + 1;
            className = 'disable';
        }
        doms.push(`<span class="block ${className}"><span>${day}</span> ${img}</span>`);
    }
    domBody.innerHTML = doms.join('');
    return dom;
}



let dom = document.getElementById('body');
dom.innerHTML = '';
for (var i = 1; i <= 12; i++) {
    dom.appendChild(createMonth(`2017/${i}`, datas))
}


document.getElementsByName('heattype').forEach(item => {
    item.onclick = (e) => {
        let dom = document.getElementById('body');
        formatData();
        dom.innerHTML = '';
        for (var i = 1; i <= 12; i++) {
            dom.appendChild(createMonth(`2017/${i}`, datas))
        }
    }
})




// for drop
window.ondragover = (e) => {
    e.preventDefault();
}

window.ondragend = e => {
    e.preventDefault();
}

window.ondrop = e => {
    e.preventDefault();
    let files = e.dataTransfer.files;

    // Object.keys(files).forEach(id => {
    let read = new FileReader();
    read.onload = (e) => {
        datas = JSON.parse(e.target.result);
        formatData();

        dom.innerHTML = '';
        for (var i = 1; i <= 12; i++) {
            dom.appendChild(createMonth(`2017/${i}`))
        }
    }
    read.readAsText(files[0]);
    // });
}