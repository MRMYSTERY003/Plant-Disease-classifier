const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWatherItemsEl = document.getElementById('current-weather-time');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForcastEl = document.getElementById('weather-forcast');
const currentTempEl = document.getElementById('current-temp');
const ampmEl = document.getElementById('am-pm')

const days = ['Sunday','Monday','Tuesday','Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar','Apr','May','Jun','Jul','Aug','Sep',"oct",'Nov','Dec'];

const API_KEY = 'e9750c3c2323e4f1d5c961175a93632d';


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12hrFormate = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM' 

    timeEl.innerHTML = (hoursIn12hrFormate < 10 ? '0'+hoursIn12hrFormate : hoursIn12hrFormate) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' '+'<span id = "am-pm">'+ampm+'</span>';
    dateEl.innerHTML = days[day] +', '+ date+ ' '+ months[month];

}, 1000);
console.log('hello');
getWeatherData()
console.log('hello');

function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        console.log('hello');

        console.log(success);
        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data);
        showWeatherData(data);
        })
    })
}


function showWeatherData(data){
    let{humidity, pressure, sunrise,sunset,wind_speed} = data.current;
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N  ' + data.lon + 'E';
    
    
    console.log(humidity);
    currentWatherItemsEl.innerHTML = 
                                    `<div class  ="weather-item">
                                            <div>Humidity</div>
                                            <div>${humidity}% </div>
                                        </div>
                                        <div class  ="weather-item">
                                            <div>Pressure</div>
                                            <div>${pressure}</div>
                                        </div>
                                        <div class  ="weather-item">
                                            <div>Wind Speed</div>
                                            <div>${wind_speed}</div>
                                        </div>
                                        <div class  ="weather-item">
                                            <div>Sun Rise</div>
                                            <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
                                        </div>                                        
                                        <div class  ="weather-item">
                                            <div>Sun Set</div>
                                            <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
                                        </div>`;
    let otherDayForcast = '';
    data.daily.forEach((day, idx) => {
        if (idx == 0){
            currentTempEl.innerHTML = `
                    <img src="https://openweathermap.org/img/wn/${day.weather[idx].icon}@4x.png" alt = "weather icon" class = "w-icon">
                    <div class = 'others'>
                        <div class = 'day'>${window.moment(day.dt*1000).format('ddd')}</div>
                        <div class = 'temp'>Night-${day.temp.night}&#176; C</div>
                        <div class = 'temp'>Day-${day.temp.day}&#176; C</div>
                    </div>
            `
        }else{
            otherDayForcast += `
            </div> 
            <div class = "weather-forcast-item">
            <div class = 'day' >${window.moment(day.dt*1000).format('ddd')}</div>
            <img src ='https://openweathermap.org/img/wn/${day.weather[idx].icon}@2x.png' alt= "weather icon" class = 'W-icon'>
            <div class = 'temp'>Night-${day.temp.night}&#176;C</div>
            <div class = 'temp'>Day-${day.temp.day}&#176;C</div> 
        </div>`
        }
    })


    weatherForcastEl.innerHTML = otherDayForcast;
}

