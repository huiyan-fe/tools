let meter = new FPSMeter({
    graph: 1,
    heat: 1
});

//
console.log(data.data.curve[201705]);
//
new circleGraph(document.getElementById('content'), {
    title: '二环',
    data: [
        data.data.curve[201705].map(item => item.congestLength),
        data.data.curve[201705].map(item => item.speed),
        data.data.curve[201705].map(item => item.congestIndex),
    ]
});

(function fps() {
    meter.tick();
    requestAnimationFrame(fps);
})();