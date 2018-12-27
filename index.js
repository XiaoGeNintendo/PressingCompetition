var chart = Highcharts.chart('bar', {
    title: {
        text: 'Pressing Competition'
    },
    subtitle: {
        text: 'Press A and L to gain score'
    },
    xAxis: {
        categories: ['P1', 'P2']
    },
    series: [{
        name: "Score",
        type: 'column',
        colorByPoint: true,
        data: [0, 0],
        showInLegend: false
    }],
    credits: {
        enabled: false
    }
});


var cps=[0,0,0,0];
var started=false;

var chart2 = Highcharts.chart('line', {

    title: {
        text: 'CPS'
    },

    subtitle:{
        text:"Click Per Second"
    },

    credits:{
        enabled:false
    },
    series: [{
        data: [],
        name: 'P1'
    },{
        data: [],
        name: 'P2'
    },{
        data:[],
        name:'P1 Avg'
    },{
        data:[],
        name:'P2 Avg'
    } ]

})

var chart3= Highcharts.chart("circle",{


    title: {
        text: 'Pie'
    },

    subtitle:{
        text:"Clicks"
    },

    plotOptions:{
        pie: {
           allowPointSelect: true,
           cursor: 'pointer',
           dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y})',
              style: {
                 color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
           }
        }
    },

    credits:{
        enabled:false
    },
    series: [{
        type:"pie",
        name:"Score",
        data:[
            ['P1',0],
            ['P2',0]
        ]
    }]
}

)
function add(player) {
    arr = [];
    for (var i = 0; i < chart.series[0].data.length; i++) {
        arr.push(chart.series[0].data[i].y);
    }

    arr[player]++;

    chart.series[0].setData(arr);
    chart.redraw(false);

    cps[player]++;
    cps[player+2]++;

    chart3.series[0].setData(arr);
}

window.document.onkeyup = function disableRefresh(evt) {
    evt = (evt) ? evt : window.event
    if (evt.keyCode) {
        if (evt.keyCode == 97 || evt.keyCode == 65) {
            //    console.log('A')
            started=true;
            add(0);
        }

        if (evt.keyCode == 76 || evt.keyCode == 108) {
            //    console.log("L")
            started=true;
            add(1)
        }
    }


}

setInterval(function () {
    if (autoplay) {
        if (Math.random() >= 0.5) {
            add(0);
        } else {
            add(1);
        }
    }
}, 50)

var pc=0;
setInterval(function(){
    if(started){
        if(record){
            pc++;

            chart2.series[0].addPoint(cps[0]);
            chart2.series[1].addPoint(cps[1]);
            chart2.series[2].addPoint(cps[2]/pc);
            chart2.series[3].addPoint(cps[3]/pc);
            chart2.redraw();
        }
        cps[0]=0;
        cps[1]=0;
    }
},1000);

var autoplay = false;
var record=true;

function toggle() {
    autoplay = !autoplay;
    started=true;
    alert("Autoplay=" + autoplay)
}

function tgr(){
    record=!record;
    started=true;
    alert("Record="+record);
}