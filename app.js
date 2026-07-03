const search_city = document.querySelector(".search_city");
const api_key = "d6b097e76b0255fd94baec677f950e84";
const card = document.querySelector(".card");
const unit_options = document.querySelector("#unit_options");

search_city.addEventListener("click", search_weather_function);

unit_options.addEventListener("change", () => {
    search_weather_function();
})

let input_bar = document.querySelector(".input_bar");

input_bar.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        search_weather_function();
    }
})

async function search_weather_function() {
    let city = document.querySelector(".input_bar").value.trim();
    // console.log(city);

    if (city) {
        try {
            let unit = unit_options.value;
            let weather_info = await get_weather_info(city, unit);

            display_weather_card(weather_info);
        }
        catch (error) {
            
            card.textContent = "";
            let msg = document.createElement("p");
            msg.classList.add("prompt");
            msg.textContent = error.message;
            card.appendChild(msg);
        }
    }
    else {
        
        card.textContent = "";
        let msg = document.createElement("p");
        msg.classList.add("prompt");
        msg.textContent = "Enter A Valid City Name!";
        card.appendChild(msg);
    }
}

async function get_weather_info(city, unit) {
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${api_key}`;


    let data = await fetch(apiurl);

    // console.log(data);
    if (!data.ok) {
        throw new Error("Could not fetch data");
    }

    return await data.json();
}

function display_weather_card(data) {

    // console.log(data);
    // msg.classList.add("display_none");
    card.textContent = "";

    const city_name = document.createElement("h2");
    city_name.classList.add("city_name");
    // console.log(data.name);

    city_name.textContent = data.name;

    const emoji = document.createElement("span");
    emoji.classList.add("emoji", "material-symbols-outlined");
    // console.log(data.weather[0].main);

    const visuals = get_weather_icon(data.weather[0].main);
    emoji.textContent = visuals.icon;
    emoji.style.color = visuals.color;
    card.style.background = visuals.background;

    console.log(visuals.icon);
    console.log(visuals.color);
    console.log(visuals.background);


    const weather_type = document.createElement("p");
    weather_type.classList.add("weather_type");

    // console.log(data.weather[0].description);

    weather_type.textContent = data.weather[0].main;

    const temperature = document.createElement("p");
    temperature.classList.add("temperature");

    // console.log(data.main.temp - 273.15);

    let symbol = "";

    switch (unit_options.value) {
        case "metric":
            symbol = "°C";
            break;

        case "imperial":
            symbol = "°F";
            break;

        default:
            symbol = "K";
    }

    temperature.textContent = `${data.main.temp.toFixed(1)} ${symbol}`;

    const description_container = document.createElement("div");
    description_container.classList.add("description_container");

    const wind = document.createElement("p");
    wind.classList.add("wind", "details");

    wind.textContent = `Wind: ${data.wind.speed} m/s`;

    const humidity = document.createElement("p");
    humidity.classList.add("humidity", "details");

    humidity.textContent = `Humidity: ${data.main.humidity} %`;

    const atm_pressure = document.createElement("p");
    atm_pressure.classList.add("atm_pressure", "details");

    atm_pressure.textContent = `Pressure: ${data.main.pressure} hPa`;

    card.appendChild(city_name);
    card.appendChild(emoji);
    card.appendChild(weather_type);
    card.appendChild(temperature);
    card.appendChild(description_container);
    description_container.appendChild(wind);
    description_container.appendChild(humidity);
    description_container.appendChild(atm_pressure);

}

function get_weather_icon(weather_info) {
    switch (weather_info) {
        case "Clear":
            return {
                icon: "light_mode",
                color: "#c0a521",
                background: "linear-gradient(to top, #e4a399 , #ab81a4, #917faa, #5e87b2)"
            };
        case "Clouds":
            return {
                icon: "cloud",
                color: "#F5F5F5",
                background: "linear-gradient(to top, #757f9a, #d7dde8)"
            };

        case "Rain":
            return {
                icon: "rainy",
                color: "#4FC3F7",
                background: "linear-gradient(to top, #4b79a1, #283e51)"
            };

        case "Thunderstorm":
            return {
                icon: "thunderstorm",
                color: "#FFD54F",
                background: "linear-gradient(to top, #232526, #414345)"
            };

        case "Snow":
            return {
                icon: "ac_unit",
                color: "#E3F2FD",
                background: "linear-gradient(to top, #e6dada, #274046)"
            };

        case "Mist":
        case "Fog":
        case "Haze":
            return {
                icon: "foggy",
                color: "#CFD8DC", // Gray
                background: "linear-gradient(to top, #757f9a, #d7dde8)"
            };
        default:
            return {
                icon: "cloud",
                color: "#FFFFFF",
                background: "linear-gradient(to top, #e4a399, #ab81a4, #917faa, #5e87b2)"
            };

    }
}