var meter = new FPSMeter({
    graph: 1,
    heat: 1
});

//
console.log(data.data.curve[201705]);
//
new circleGraph(document.getElementById('content'), {
    data: [
        data.data.curve[201705].map(item => item.congestLength)
    ]
});
//
(function fps() {
    meter.tick();
    requestAnimationFrame(fps);
})();