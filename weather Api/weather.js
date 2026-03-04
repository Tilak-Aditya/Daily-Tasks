const apiKey = "513154b5a79fea203f758b57197b2a49"; 

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherContainer = document.getElementById("weatherContainer");

const majorCities = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Visakhapatnam"
];

window.onload = () => {
    loadMajorCities();
};


searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        weatherContainer.innerHTML = ""; 
        fetchWeather(city);
    }
});

function fetchWeather(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            if (data.cod !== 200) {
                weatherContainer.innerHTML = "<p>City not found</p>";
                return;
            }

            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h3>${data.name}</h3>
                <p> <i class="fa-solid fa-temperature-arrow-down"></i>Temp: ${data.main.temp} °C</p>
                <p> <i class="fa-brands fa-skyatlas"></i>  ${data.weather[0].description}</p>
                <p> Humidity: ${data.main.humidity}%</p>
                <p> <i class="fa-solid fa-wind"></i>   Wind: ${data.wind.speed} m/s</p>
            `;

            weatherContainer.appendChild(card);
        })
        .catch(() => {
            weatherContainer.innerHTML = "<p>Error fetching data</p>";
        });
}

function loadMajorCities() {
    weatherContainer.innerHTML = "";
    majorCities.forEach(city => fetchWeather(city));
}