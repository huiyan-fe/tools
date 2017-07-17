let meter = new FPSMeter({
    graph: 1,
    heat: 1
});

//
console.log(data.data.curve[201705]);
let dom = document.getElementById('content');
//
new circleGraph(dom, {
    title: '二环',
    data: [
        data.data.curve[201705].map(item => item.congestLength),
        data.data.curve[201705].map(item => item.speed),
        data.data.curve[201705].map(item => item.congestIndex),
    ],
    weather: [
        '雷阵雨', '阵雨', '阵雪', '浮尘', '阴', '小到中雨', '晴', '大到暴雨', '霾', '中雪', '雷阵雨', '阵雨', '雷阵雨', '阵雨', '阵雪', '浮尘', '阴', '小到中雨', '晴', '大到暴雨', '霾', '中雪', '雷阵雨', '阵雨'
    ]
});

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
        dom.innerHTML = '';
        datas = JSON.parse(e.target.result);
        new circleGraph(dom, datas);

    }
    read.readAsText(files[0]);
    // });
}

(function fps() {
    meter.tick();
    requestAnimationFrame(fps);
})();