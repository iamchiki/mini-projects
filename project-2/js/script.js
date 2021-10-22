import { barChart, lineChart, pieChart } from "./drawchart.js";

// dom elemnets
const countryList = document.querySelector('.country-list');
const dateInput = document.querySelector('#input-date');
const confirmed = document.querySelector('.confirmed');
const deaths = document.querySelector('.deaths');
const recoverd = document.querySelector('.recovered');
const active = document.querySelector('.active');
let country, date;

function fetchCountryData(country, date) {
    if (country != '' && date != '') {
        fetch(`https://api.covid19api.com/total/country/${country}`)
            .then((response) => {
                return response.json();
            })
            .then((countryData) => {
                let singleDayData = countryData.filter((data) => {
                    return data.Date.split('T')[0] == date;
                });
                confirmed.innerText = singleDayData[0].Confirmed;
                deaths.innerText = singleDayData[0].Deaths;
                recoverd.innerText = singleDayData[0].Recovered;
                active.innerText = singleDayData[0].Active;
                let covidData = [singleDayData[0].Confirmed, singleDayData[0].Deaths, singleDayData[0].Recovered, singleDayData[0].Active];
                pieChart.data.datasets[0].data = covidData;
                pieChart.update();
                barChart.data.datasets[0].data = covidData;
                barChart.update();
                drawLineChart(lineChart, countryData);
                // drawBarchart(barChart, countryData);
            });
    }
}

// fetch all country name list and set india as selected
function fetchCountryList() {
    fetch('https://api.covid19api.com/countries')
        .then((response) => {
            return response.json();
        })
        .then((countries) => {
            countries.sort((a, b) => {
                return a.Slug > b.Slug ? 1 : -1;
            });
            countries.forEach((country) => {
                const option = document.createElement('option');
                option.value = country.Slug;
                option.innerText = country.Country;
                countryList.append(option);
            });
            // set default country value as india
            countryList.value = 'india';
        });
}

// draw line chart based on availaible data
function drawLineChart(chart, data) {
    let labels = [];
    let confirmedData = [];
    let deathsData = [];
    let recovereData = [];
    let activeData = [];

    data.forEach((item) => {
        labels.push(item.Date.split('T')[0]);
        confirmedData.push(item.Confirmed);
        deathsData.push(item.Deaths);
        recovereData.push(item.Recovered);
        activeData.push(item.Active);
    });
    chart.data.datasets[0].data = confirmedData;
    chart.data.datasets[1].data = deathsData;
    chart.data.datasets[2].data = recovereData;
    chart.data.datasets[3].data = activeData;
    chart.data.labels = labels;
    chart.update();
}

// draw bar chart
function drawBarchart(chart, data) {
    let labels = [];
    let confirmedData = [];
    let deathsData = [];
    let recovereData = [];
    let activeData = [];

    data.forEach((item) => {
        labels.push(item.Date.split('T')[0]);
        confirmedData.push(item.Confirmed);
        deathsData.push(item.Deaths);
        recovereData.push(item.Recovered);
        activeData.push(item.Active);
    });
    let timePeriod = [labels[0].slice(0, 7)];
    labels.forEach((date) => {
        let month = date.slice(0, 7);
        if (!timePeriod.includes(month)) {
            timePeriod.push(month);
        }
    });
    chart.data.datasets[0].data = confirmedData;
    chart.data.datasets[1].data = deathsData;
    chart.data.datasets[2].data = recovereData;
    chart.data.datasets[3].data = activeData;
    chart.data.labels = timePeriod;
    chart.update();
}

// Event Listeners
// fetch info on changing country
countryList.addEventListener('change', () => {
    country = countryList.value;
    date = dateInput.value;
    fetchCountryData(country, date);
});

// fetch value onchanging date
dateInput.addEventListener('change', () => {
    country = countryList.value;
    date = dateInput.value;
    fetchCountryData(country, date);
});

// fetch covid data based on default country(india) and date input value(past 3 days date)
document.addEventListener('DOMContentLoaded', () => {
    let dateObj = new Date();
    // take past 3 days date from current date as latest data for current date is not fetched 
    let date = dateObj.getDate() - 3;
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    month = month > 9 ? month : '0' + month;
    date = date > 9 ? date : '0' + date;
    let dateString = `${year}-${month}-${date}`;
    // set default date input value as past 3 days date;
    dateInput.value = dateString;
    fetchCountryList();
    fetchCountryData('india', dateInput.value);
});


