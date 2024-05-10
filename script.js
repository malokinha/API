//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//7a7456ffd1e291eeb51e3fb8267d712b
//https://api.openweathermap.org/data/2.5/weather?q=Paulista&appid=7a7456ffd1e291eeb51e3fb8267d712b

//Variáveis e seleções de elementos
const apiKey = "b35a625873a7eb5b071cf6a5810a901d";
const cityInput = document.querySelector("#city-input");
const searchBt = document.querySelector("#search");

const cityElement = document.querySelector ("#city");
const tempElement = document.querySelector ("#temperature span");
const descElement = document.querySelector ("#description");
const weatherIconElement = document.querySelector ("#weather-icon");
const countryElement = document.querySelector ("#country");
const umidityElement = document.querySelector ("#umidity span");
const windElement = document.querySelector ("#wind span");

const weatherData = document.querySelector("#weather-data")

const cityErrorElement = document.querySelector("#error-message span");
const errorMessageContainer = document.querySelector("#error-message");

//Funções 
const getWeatherData = async (city) => {
    const apiWheatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWheatherURL);
    const data = await res.json();

    return data;
};
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if (data.cod === "404") {
        showErrorMessage(city);
        return;
        
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherData.classList.remove ("hide");


    };

//tratamento de erro
  const showErrorMessage = (city) => {
   cityErrorElement.innerText = city;
   errorMessageContainer.classList.remove("hide");
  }


//Eventos
searchBt.addEventListener("click", (e) => {
    e.preventDefault(); 
    
    console.log("teste");
    const city = cityInput.value;
    showWeatherData(city);
});



cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
    cityInput.addEventListener("keyup", (e) => { //e captura o valor/código da tecla
        if(e.code === "Enter") {
            e.preventDefault();
            const city = cityInput.value; //Valor do campo input
            showWeatherData(city);
             
        } 
    });
})

