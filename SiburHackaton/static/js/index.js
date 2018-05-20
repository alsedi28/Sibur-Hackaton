var start_date = "2017-01-11 11:42:00";

var ctx_one = document.getElementById("graph_one");
var ctx_two = document.getElementById("graph_two");
var ctx_three = document.getElementById("graph_three");

var ctx_zero = document.getElementById("graph_zero");

var graph_zero = create_line_graph(ctx_zero, "Время", "Вероятность", x0Data, y0Data);
var graph_one = create_line_graph(ctx_one, "Время", "Разность тока, А", x1Data, y1Data);
var graph_two = create_line_graph(ctx_two, "Время", "Температура Фильера, C", x2Data, y2Data);
var graph_three = create_line_graph(ctx_three, "Время", "Давление вала, МПа", x3Data, y3Data);

setInterval(function() {
    var request_date = new Date(start_date);

    request_date.setSeconds(request_date.getSeconds() + 10);

    var day = request_date.getDate();
    var monthIndex = request_date.getMonth() + 1;
    var year = request_date.getFullYear();
    var hours = request_date.getHours();
    var minutes = request_date.getMinutes();
    var seconds = request_date.getSeconds();

    var minutes_view = minutes > 9 ? minutes : "0" + minutes;
    var seconds_view = seconds > 9 ? seconds : "0" + seconds;
    start_date = year + '-' + monthIndex + '-' + day + ' ' + hours + ':' + minutes_view + ':' + seconds_view;
    var date_for_view = start_date.split(" ")[1];

    $.ajax({
            type: 'POST',
            url: 'api/data',
            data: { 'date' : start_date },
            success: function (data) {
                change_data_line_graph(graph_one, date_for_view, data.top1);
                change_data_line_graph(graph_two, date_for_view, data.top2);
                change_data_line_graph(graph_three, date_for_view, data.top3);
                change_data_line_graph(graph_zero, date_for_view, data.proba);

                $('#speedometer_graph').val((data.proba * 100).toFixed()).trigger('change');
                $('#middle_left_block .value').html(data.top1.toFixed(4));
                $('#middle_center_block .value').html(data.top2.toFixed(2));
                $('#middle_right_block .value').html(data.top3.toFixed(4));
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
                    '#0a8a93',
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

$('#speedometer_graph').val(10).trigger('change');
