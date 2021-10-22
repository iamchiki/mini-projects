import * as chart from './chart.min.js';

// create pichart 
const pieChartElem = document.getElementById('pie-chart').getContext('2d');
export const pieChart = new Chart(pieChartElem, {
    type: 'pie',
    data: {
        labels: ['Confirmed', 'Deaths', 'Recovered', 'Active'],
        datasets: [{
            label: `No. of Cases`,
            data: [],
            backgroundColor: [
                '#ff638433',
                '#36a2eb33',
                '#C6B4CE',
                '#C2B8A3'
            ]
        }]
    },
    options: {}
});


// create line chart
const lineChartElem = document.getElementById('line-chart').getContext('2d');
export const lineChart = new Chart(lineChartElem, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: `Confirmed`,
            data: [],
            backgroundColor: [
                '#ff638433'
            ]
        },
        {
            label: `Deaths`,
            data: [],
            backgroundColor: [
                '#36a2eb33'
            ]
        },
        {
            label: `Recovered`,
            data: [],
            backgroundColor: [
                '#C6B4CE'
            ]
        },
        {
            label: `Active`,
            data: [],
            backgroundColor: [
                '#C2B8A3'
            ]
        }]
    },
    options: {}
});

// create Bar Chart 
const barChartElem = document.getElementById('bar-chart').getContext('2d');
export const barChart = new Chart(barChartElem, {
    type: 'bar',
    data: {
        labels: ['Confirmed', 'Deaths', 'Recovered', 'Active'],
        datasets: [{
            label: `No. of Cases`,
            data: [],
            backgroundColor: [
                '#ff638433',
                '#36a2eb33',
                '#C6B4CE',
                '#C2B8A3'
            ]
        }]
    },
    options: {}
});