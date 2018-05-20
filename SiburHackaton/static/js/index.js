var start_date = "2017-01-12 13:47:00";

var ctx_one = document.getElementById("graph_one");
var ctx_two = document.getElementById("graph_two");
var ctx_three = document.getElementById("graph_three");

var ctx_radar = document.getElementById("graph_radar");

var graph_radar = new Chart(ctx_radar, {
    type: 'radar',
    data: {
        labels: ['Top1', 'Top2', 'Top3', 'Top4', 'Top5'],
        datasets: [{
            data: [20, 10, 4, 2, 34],
            backgroundColor: ['rgba(170,212,215, 0.5)'],
        }]
    },
    options: {
        legend: {
            display: false
        },
        animation: {
            duration: 0
        },
        scale: {
            ticks: {
              min: 0,
              //max: 50,
              //stepSize: 10,
              beginAtZero: true
            },
            pointLabels: { fontSize:25 }
          }
    }
});

var graph_one = create_line_graph(ctx_one, "Дата", "YYY", x1Data, y1Data);
var graph_two = create_line_graph(ctx_two, "Дата", "YYY", x2Data, y2Data);
var graph_three = create_line_graph(ctx_three, "Дата", "YYY", x3Data, y3Data);

setInterval(function() {
    var request_date = new Date(start_date);
    console.log(request_date);
    request_date.setSeconds(request_date.getSeconds() + 10);

    var day = request_date.getDate();
    var monthIndex = request_date.getMonth() + 1;
    var year = request_date.getFullYear();
    var hours = request_date.getHours();
    var minutes = request_date.getMinutes();
    var seconds = request_date.getSeconds();

    start_date = year + '-' + monthIndex + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    console.log(start_date);

    $.ajax({
            type: 'POST',
            url: 'api/data',
            data: { 'date' : start_date },
            success: function (data) {
                change_data_line_graph(graph_one, start_date, data.top1);
                change_data_line_graph(graph_two, start_date, data.top2);
                change_data_line_graph(graph_three, start_date, data.top3);

                change_data_radar_graph(graph_radar, [data.top1, data.top2, data.top3, data.top4, data.top5]);

                $('#speedometer_graph').val((data.proba * 100).toFixed()).trigger('change');
            }
        });
}, 10000);

function create_line_graph(ctx_obj, x_title, y_title, x_data, y_data) {
    return new Chart(ctx_obj, {
        type: 'line',
        data: {
            labels: x_data,
            datasets: [{
                data: y_data,
                pointRadius: 0,
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                backgroundColor: ['rgba(170,212,215, 0.5)'],
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

function change_data_line_graph(graph_obj, value_x, value_y) {
    graph_obj.data.labels.push(value_x);
    graph_obj.data.datasets.forEach(function(dataset){
        dataset.data.push(value_y);
    });

    graph_obj.data.labels.shift();
    graph_obj.data.datasets.forEach(function(dataset){
        dataset.data.shift();
    });
    graph_obj.update();
}

function change_data_radar_graph(graph_obj, value_arr) {
    graph_obj.data.datasets.forEach(function(dataset){
        dataset.data.push(value_arr[0]);
        dataset.data.push(value_arr[1]);
        dataset.data.push(value_arr[2]);
        dataset.data.push(value_arr[3]);
        dataset.data.push(value_arr[4]);

        dataset.data.shift();
        dataset.data.shift();
        dataset.data.shift();
        dataset.data.shift();
        dataset.data.shift();
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
