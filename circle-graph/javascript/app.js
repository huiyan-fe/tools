var datas = {
    title: '二环',
    data: [
        data.data.curve[201705].map(item => item.congestLength),
        data.data.curve[201705].map(item => item.speed),
        data.data.curve[201705].map(item => item.congestIndex),
    ],
    weather: [
        '雷阵雨', '阵雨', '阵雪', '浮尘', '阴', '小到中雨', '晴', '大到暴雨', '霾', '中雪', '雷阵雨', '阵雨', '雷阵雨', '阵雨', '阵雪', '浮尘', '阴', '小到中雨', '晴', '大到暴雨', '霾', '中雪', '雷阵雨', '阵雨'
    ]
}

let meter = new FPSMeter({
    graph: 1,
    heat: 1
});

//
// console.log(data.data.curve[201705]);
let dom = document.getElementById('content');


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
        updateMax();
        new circleGraph(dom, datas);

    }
    read.readAsText(files[0]);
}

(function fps() {
    meter.tick();
    requestAnimationFrame(fps);
})();


var FizzyText = function () {
    this.val1Max = 0;
    this.val1Min = 0;
    this.val2Max = 0;
    this.val2Min = 0;
    this.val3Max = 0;
    this.val3Min = 0;
};

window.onload = () => {
    window.text = new FizzyText();
    window.gui = new dat.GUI();

    var f1 = gui.addFolder('value1');
    f1.open();
    f1.add(text, 'val1Min');
    f1.add(text, 'val1Max');

    var f2 = gui.addFolder('value2');
    f2.open();
    f2.add(text, 'val2Min');
    f2.add(text, 'val2Max');

    var f3 = gui.addFolder('value3');
    f3.open();
    f3.add(text, 'val3Min');
    let a = f3.add(text, 'val3Max');

    for (var i in gui.__folders) {
        for (var j in gui.__folders[i].__controllers) {
            // console.log(gui.__folders[i].__controllers[j])
            gui.__folders[i].__controllers[j].onFinishChange((e) => {
                dom.innerHTML = '';
                new circleGraph(dom, datas);
            });
        }
    }

    //
    updateMax();


    //
    new circleGraph(dom, datas);
}

function updateMax() {
    let data1Max = -Infinity;
    let data1Min = Infinity;
    let data2Max = -Infinity;
    let data2Min = Infinity;
    let data3Max = -Infinity;
    let data3Min = Infinity;

    datas.data[0].forEach(item => {
        data1Max = Math.max(data1Max, item);
        data1Min = Math.min(data1Min, item);
    });

    datas.data[1].forEach(item => {
        console.log(item)
        data2Max = Math.max(data2Max, item);
        data2Min = Math.min(data2Min, item);
    });


    datas.data[2].forEach(item => {
        data3Max = Math.max(data3Max, item);
        data3Min = Math.min(data3Min, item);
    });

    text.val1Max = data1Max;
    text.val1Min = data1Min;
    text.val2Max = data2Max;
    text.val2Min = data2Min;
    text.val3Max = data3Max;
    text.val3Min = data3Min;
    for (var j in gui.__folders) {
        for (var i in gui.__folders[j].__controllers) {
            gui.__folders[j].__controllers[i].updateDisplay();
        }
    }
}