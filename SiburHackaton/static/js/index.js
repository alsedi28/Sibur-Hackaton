var ctx_one = document.getElementById("graph_one");
var ctx_two = document.getElementById("graph_two");
var ctx_three = document.getElementById("graph_three");

var ctx_radar = document.getElementById("graph_radar");

var graph_radar = new Chart(ctx_radar, {
    type: 'radar',
    data: {
        labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
        datasets: [{
            data: [20, 10, 4, 2]
        }]
    },
    options: {
        legend: {
            display: false
        },
        animation: {
            duration: 0,
        },
        scale: {
            ticks: {
              min: 0,
              max: 50,
              max: 50,
              stepSize: 10,
              beginAtZero: true
            },
            pointLabels: { fontSize:25 }
          },
    }
});


var x1Data = [10, 20, 30, 40, 50, 60];
var y1Data = [12, 19, 3, 5, -2, -8];
var x2Data = [10, 20, 30, 40, 50, 60];
var y2Data = [12, 19, 3, 5, -2, -8];
var x3Data = [10, 20, 30, 40, 50, 60];
var y3Data = [12, 19, 3, 5, -2, -8];

var graph_one = create_line_graph(ctx_one, "XXX", "YYY", x1Data, y1Data);
var graph_two = create_line_graph(ctx_two, "XXX", "YYY", x2Data, y2Data);
var graph_three = create_line_graph(ctx_three, "XXX", "YYY", x3Data, y3Data);

/*setInterval(function() {
    change_data_line_graph(graph_one);
    change_data_line_graph(graph_two);
    change_data_line_graph(graph_three);
}, 2000);*/

function create_line_graph(ctx_obj, x_title, y_title, x_data, y_data) {
    return new Chart(ctx_obj, {
        type: 'line',
        data: {
            labels: x_data,
            datasets: [{
                data: y_data,
                backgroundColor: false,
                pointRadius: 0,
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            animation: {
                duration: 0,
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: y_title
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: x_title
                    }
                }]
            }
        }
    });
}

function change_data_line_graph(graph_obj) {
    var new_element_y = 4;

    var last_element_x = graph_obj.data.labels[graph_obj.data.labels.length - 1];
    var new_element_x = last_element_x + 10;
    graph_obj.data.labels.push(new_element_x);
    graph_obj.data.datasets.forEach(function(dataset){
        dataset.data.push(new_element_y);
    });

    graph_obj.data.labels.shift();
    graph_obj.data.datasets.forEach(function(dataset){
        dataset.data.shift();
    });
    graph_obj.update();
}

function change_data_radar_graph(graph_obj) {
    graph_obj.data.datasets.forEach(function(dataset){
        dataset.data = [];
    });

    graph_obj.update();
}

$("#speedometer_graph").myfunc({
    /**Max value of the meter*/
    maxVal              : 100,

    /**Division value of the meter*/
    divFact             : 10,

    /**more than this leval, color will be red*/
    dangerLevel         : 80,

    /**reading begins angle*/
    initDeg             : 0,

    /**total angle of the meter reading*/
    maxDeg              : 180,

    /**radius of the meter circle*/
    edgeRadius          : 150,

    /**speed nobe height*/
    speedNobeH          : 4,

    /**speed nobe width*/
    speedoNobeW         : 95,

    /**speed nobe left position*/
    speedoNobeL         : 13,

    /**radius of indicators position*/
    indicatorRadius     : 125,

    /**radius of numbers position*/
    indicatorNumbRadius : 90,

    /**speedo-meter current value cont*/
    speedPositionTxtWH  : 80,

    /**indicator nob width*/
    nobW                : 20,

    /**indicator nob height*/
    nobH                : 4,

    /**indicator number width*/
    numbW               : 30,

    /**indicator number height*/
    numbH               : 16,

    /**indicator mid nob width*/
    midNobW             : 10,

    /**indicator mid nob height*/
    midNobH             : 3,

    /**no of small div between main div*/
    noOfSmallDiv        : 2,

    /**type of event listener*/
    eventListenerType   : 'change',

    /**Center value multiplier e.g. 1 x 1000 RPM*/
    multiplier          : 1,

    /**Label on guage Face*/
    gagueLabel    : ''
});

/*
function setUserID(myValue) {
     $('#userid').val(myValue)
                 .trigger('change');
}*/
