const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const modeBtn = document.getElementById('mode-btn');
const weatherSection = document.getElementById('weather');
const cityNameElem = document.getElementById('city-name');
const temperatureElem = document.getElementById('temperature');
const descriptionElem = document.getElementById('description');
const errorElem = document.getElementById('error');
const tempChartCanvas = document.getElementById('tempChart');
const loader = document.getElementById('loader');

let darkMode = true;
let tempChart;

window.addEventListener('load', () => loader.style.display='none');
searchBtn.addEventListener('click', getWeather);
modeBtn.addEventListener('click', toggleMode);

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  weatherSection.classList.add('hidden');
  errorElem.classList.add('hidden');
  tempChartCanvas.classList.add('hidden');
  loader.style.display='flex';

  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      errorElem.textContent = `City "${city}" not found.`;
      errorElem.classList.remove('hidden'); loader.style.display='none';
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`);
    const weatherData = await weatherRes.json();
    const current = weatherData.current_weather;

    cityNameElem.textContent = `${name}, ${country}`;
    temperatureElem.textContent = `🌡 Temperature: ${current.temperature}°C`;
    descriptionElem.textContent = `💨 Wind: ${current.windspeed} km/h`;
    weatherSection.classList.remove('hidden');

    const hourly = weatherData.hourly;
    if (hourly && hourly.time && hourly.temperature_2m) {
      const hours = hourly.time.slice(0,24).map(t=>t.slice(11,16));
      const temps = hourly.temperature_2m.slice(0,24);
      if (tempChart) tempChart.destroy();
      tempChartCanvas.classList.remove('hidden');
      tempChart = new Chart(tempChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: hours,
          datasets: [{
            label: 'Temperature (°C)',
            data: temps,
            borderColor: '#3ac1e7',
            backgroundColor: 'rgba(58,193,231,0.2)',
            fill:true, tension:0.2
          }]
        },
        options: {
          plugins:{ legend:{ labels:{ color: darkMode?'#fff':'#333' } } },
          scales:{
            x:{ ticks:{ color: darkMode?'#fff':'#333' } },
            y:{ ticks:{ color: darkMode?'#fff':'#333' } }
          }
        }
      });
    }
  } catch (err) {
    console.error(err);
    errorElem.textContent = "❌ An error occurred. Try again.";
    errorElem.classList.remove('hidden');
  }
  loader.style.display='none';
}

function toggleMode() {
  darkMode=!darkMode;
  document.body.classList.toggle('light-mode',!darkMode);
  modeBtn.textContent=darkMode?'☀️ Light Mode':'🌙 Dark Mode';
  if(tempChart){
    tempChart.options.plugins.legend.labels.color=darkMode?'#fff':'#333';
    tempChart.options.scales.x.ticks.color=darkMode?'#fff':'#333';
    tempChart.options.scales.y.ticks.color=darkMode?'#fff':'#333';
    tempChart.update();
  }
}