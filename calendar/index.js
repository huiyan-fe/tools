let param = {};
location.search.slice(1).split('&').map(item => {
    let kv = item.split('=');
    param[kv[0]] = kv[1];
})

let citycode = param.city || 131

let cityWeather = weather[citycode];
console.log(weathermap)

function createMonth(inputTime, datas) {
    //
    // 
    let dataMin = Infinity;
    let dataMax = -Infinity;

    Object.keys(datas).forEach(key => {
        let data = datas[key];

        Object.keys(data).forEach(key => {
            dataMin = Math.min(dataMin, data[key]);
            dataMax = Math.max(dataMax, data[key]);
        });
    });
    console.log(dataMin, dataMax)
        //

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
                let realPresent = (data[day] - dataMin) / (dataMax - dataMin);
                precent = Math.ceil(realPresent / .2);
                precent = Math.max(precent, 1);

                precent = realPresent < 0.2 ? 1 :
                    realPresent < 0.6 ? 2 :
                    realPresent < 0.8 ? 3 :
                    realPresent < 0.9 ? 4 : 5;

                className += ` level-${precent} `;
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

let datas = {
    3: {
        5: 1,
        10: 2,
        12: 3,
        18: 4,
        19: 5
    },
    1: {
        1: 1,
        5: 1
    }
}

let dom = document.getElementById('body');

dom.innerHTML = '';
for (var i = 1; i <= 12; i++) {
    dom.appendChild(createMonth(`2017/${i}`, datas))
}




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
        let jsonData = JSON.parse(e.target.result);

        dom.innerHTML = '';
        for (var i = 1; i <= 12; i++) {
            dom.appendChild(createMonth(`2017/${i}`, jsonData))
        }
    }
    read.readAsText(files[0]);
    // });
}