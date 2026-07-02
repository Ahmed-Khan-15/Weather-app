const search_city = document.querySelector(".search_city");
const api_key = "d6b097e76b0255fd94baec677f950e84";

search_city.addEventListener("click", async event =>{
    let city = document.querySelector(".input_bar").value
    console.log(city);
    
    if(city){
        try{
            let weather_info = await get_weather_info(city);
        }
        catch{
            console.error(error);
        }
    }
    else{
        alert("Enter A Valid City Name!");
    }

})

async function get_weather_info(city){
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    console.log(apiurl);
    
    let data = await fetch("apiurl");

    console.log(data);
    if(!data.ok){
        throw new Error("Could not fetch api");
    }

    return await data.json;
}