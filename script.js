const apiKey = 'fe31d285362d956d85c9877d32f90308'; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const weatherIcon = document.getElementById('weather-icon');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// New element for loading indicator
const loadingIndicator = document.createElement('div');
loadingIndicator.id = 'loading-indicator';
loadingIndicator.textContent = 'Loading...';
loadingIndicator.style.display = 'none';
document.querySelector('.container').appendChild(loadingIndicator);

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        showLoading();
        fetchWeather(city);
    }
});

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value;
        if (city) {
            showLoading();
            fetchWeather(city);
        }
    }
});

function showLoading() {
    loadingIndicator.style.display = 'block';
    weatherInfo.style.display = 'none';
}

function hideLoading() {
    loadingIndicator.style.display = 'none';
}

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        hideLoading();

        if (data.cod === '404') {
            alert('City not found. Please try again.');
            return;
        }

        displayWeather(data);
    } catch (error) {
        hideLoading();
        console.error('Error fetching weather data:', error);
        alert('An error occurred. Please try again.');
    }
}

function displayWeather(data) {
    weatherInfo.style.display = 'block';
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Set weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${iconCode}@2x.png)`;
}
// const searchBtn = document.getElementById('search-btn');

// searchBtn.addEventListener('click', () => {
//     const city = cityInput.value;
//     if (city) {
//         disableSearchButton();
//         showLoading();
//         fetchWeather(city);
//     }
// });

// function disableSearchButton() {
//     searchBtn.disabled = true;
//     searchBtn.textContent = 'Searching...';
// }

// function enableSearchButton() {
//     searchBtn.disabled = false;
//     searchBtn.textContent = 'Search';
// }

// async function fetchWeather(city) {
//     try {
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
//         const data = await response.json();

//         hideLoading();
//         enableSearchButton();

//         if (data.cod === '404') {
//             alert('City not found. Please try again.');
//             return;
//         }

//         displayWeather(data);
//     } catch (error) {
//         hideLoading();
//         enableSearchButton();
//         console.error('Error fetching weather data:', error);
//         alert('An error occurred. Please try again.');
//     }
// }

// // Make sure to call enableSearchButton() in case of errors too
// function hideLoading() {
//     loadingIndicator.style.display = 'none';
//     enableSearchButton();
// }