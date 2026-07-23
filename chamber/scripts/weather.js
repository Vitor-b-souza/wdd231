// ⚠️ Replace with your own free API key from https://openweathermap.org/api
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

// Feira de Santana, Bahia, Brazil
const lat = -12.2667;
const lon = -38.9667;

const currentWeatherEl = document.querySelector('#current-weather');
const forecastEl = document.querySelector('#forecast');

async function getCurrentWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    return await response.json();
}

async function getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    return await response.json();
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    currentWeatherEl.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" width="70" height="70">
        <div>
            <p class="current-temp">${temp}&deg;C</p>
            <p class="current-desc">${description}</p>
        </div>
    `;
}

function displayForecast(data) {
    // Pick one entry per day near midday (12:00:00) for the next 3 days
    const dailyEntries = data.list.filter((entry) => entry.dt_txt.includes('12:00:00')).slice(0, 3);

    forecastEl.innerHTML = '';

    dailyEntries.forEach((entry) => {
        const date = new Date(entry.dt_txt);
        const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(entry.main.temp);

        const card = document.createElement('div');
        card.classList.add('forecast-day');
        card.innerHTML = `
            <p class="forecast-day__label">${dayLabel}</p>
            <p class="forecast-day__temp">${temp}&deg;C</p>
        `;
        forecastEl.appendChild(card);
    });
}

async function initWeather() {
    try {
        const current = await getCurrentWeather();
        displayCurrentWeather(current);

        const forecast = await getForecast();
        displayForecast(forecast);
    } catch (error) {
        console.error('Unable to load weather data:', error);
        currentWeatherEl.innerHTML = '<p>Weather data is currently unavailable.</p>';
    }
}

initWeather();
