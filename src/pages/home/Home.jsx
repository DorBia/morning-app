import { useCallback, useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import Forecast from "./Forecast"

import "./Home.scss"


const Home = () => {

  const { user } = useAuthContext()
  const [userLocation, setUserLocation] = useState("")
  const [weather, setWeather] = useState(null)
  const [showForecast, setShowForecast] = useState(false)
  const currentDate = weather ? new Date(weather.location.localtime.replace(/-/g, "/")) : new Date()

  let greeting = "Hello"
  if (currentDate.getHours() > 4 && currentDate.getHours() < 12) {
    greeting = "Good morning"
  } else if (currentDate.getHours() >= 12 && currentDate.getHours() <= 18) {
    greeting = "Good afternoon"
  } else if (currentDate.getHours() > 18 && currentDate.getHours() < 24) {
    greeting = "Good evening"
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in this browser.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords.latitude + "," + position.coords.longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }

  const getWeather = useCallback( async() => {
    getLocation()
    if(userLocation){
      const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${userLocation}&days=7`)
      const data = await res.json()
      setWeather(data)
    }
  }, [userLocation]);

  useEffect(() => {
    getWeather()
  }, [getWeather]);


  return (
    <div>
      {!weather && <div className="home">Could not fetch the data, make sure using location is allowed</div> }
      {weather && <div className={showForecast ? "home home--active" : "home"}>
        <div className="home__date">
          <p>{currentDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</p>
          <p>{currentDate.toLocaleTimeString().substring(0, 5)}</p>
        </div>
        <h1>{greeting}, {user.displayName}</h1>
        <div className="home__weather">
          <h3>{weather.location.name}, {weather.location.country}</h3>
          <img src={weather.current.condition.icon} alt="weather condition" />
          <h3>{weather.current.temp_c}°C</h3>
        </div>
        <button className="btn" onClick={() => setShowForecast(!showForecast)}>{showForecast ? "Hide forecast" : "Show forecast"}</button>
        {showForecast && <Forecast weather={weather} currentDate={currentDate} />}
        </div>}
    </div>
  )
}

export default Home