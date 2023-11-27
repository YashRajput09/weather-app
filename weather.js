const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const inputBox = document.querySelector('.search-box input');
// let inputBox = document.querySelector('.input-box');

inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        // console.log("key pressed : ",performTask() )
        console.log(" value : ",performTask());
    }
})

// input.addEventListener('keyup', (e) => {
//     if(e.KeyboardEvent.keyCode === 13){
//         console.log(e.target.value);
//     }
// })

search.addEventListener('click', () => {
    performTask();
});


function performTask (){
    //  search.addEventListener('click', () => {

    const APIKey = 'd6e64f867339a5c9fe5331c95dc4280e';
    const city = document.querySelector('.search-box input').value;
    // console.log("asdyf " ,city);
    if(city == ''){
    return;
     }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json()).then(json => {
        console.log("json",json)
        // console.log("main ",json.weather[0].main)
        // console.log("speed ",json.wind.speed);
        // console.log("discription ",json.weather[0].main.discription);
        // console.log("zsdfz",error404);
        if (json.cod == '404') {
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            container.style.height = '400px';
            cityHide.textContent = city;
            return;
        }

        const image = document.querySelector('.weather-box img');
        console.log("image",image);
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (cityHide.textContent == city) {
            return;
        } else{
            cityHide.textContent = city;

            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');
            container.style.height = '555px';
            container.classList.add('active');
            
            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './Start Project Weather App HTML CSS Javascript/images/clear.png' ;
                    break;
    
                    case 'Rain':
                    image.src = './Start Project Weather App HTML CSS Javascript/images/rain.png' ;
                    break;
    
                    case 'Snow':
                    image.src = './Start Project Weather App HTML CSS Javascript/images/snow.png' ;
                    break;
    
                    case 'Clouds':
                    image.src = './Start Project Weather App HTML CSS Javascript/images/cloud.png' ;
                    break;
    
                    case 'Mist':
                    image.src = './Start Project Weather App HTML CSS Javascript/images/mist.png' ;
                    break;
    
                    case 'Haze':
                    image.src = './Start Project Weather App HTML CSS Javascript/images/haze.png' ;
                    break;
            
                default:
                   image.src = './Start Project Weather App HTML CSS Javascript/images/cloud.png';
            }
    
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            // discription.innerHTML = `${}`;
            humidity.innerHTML = `${json.main.humidity}<span>%</span>`;
            wind.innerHTML = `${(json.wind.speed)}<span>Km/h</span>`;
            description.innerHTML = `${json.weather[0].description}`;
    
            const infoWeather = document.querySelector('info-weather')
            const infoHumidity = document.querySelector('info-humidity')
            const infoWind = document.querySelector('info-wind')

            const elCloneInfoWeather = infoWeather.cloneNode(true)
            const elCloneInfoHumidity = infoHumidity.cloneNode(true)
            const elCloneInfoWind = infoWind.cloneNode(true)

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone')

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone')

            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone')

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather)
                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity)
                infoWind.insertAdjacentElement("afterend", elCloneInfoWind)
            }, 2200);

            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone')
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoWeatherFirst = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone')
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];
       
            const cloneInfoWind = document.querySelectorAll('.info-wind  .active-clone')
            const cloneInfoWindFirst = cloneInfoWind [0];

            if (totalCloneInfoWeather > 0) {
                cloneInfoWeatherFirst.classList.remove('active-clon')
                cloneInfoHumidityFirst.classList.remove('active-clon')
                cloneInfoWindFirst.classList.remove('active-clon')

                setTimeout(() => {
                    cloneInfoWeatherFirst.remove()
                    cloneInfoHumidityFirst.remove()
                    cloneInfoWindFirst.remove()
                }, 2200);
            }
        }       
    })
// })
}