
const Forecast = ({weather, currentDate}) => {


  return (
    <div className="home__forecast">
        <div className="home__base">
            <p>Min:</p>
            <p>Max:</p>
        </div>
        {weather && weather.forecast.forecastday.map(day => (
            <div className="home__day" key={day.date}>
                <p>{currentDate.toLocaleDateString() === new Date(day.date).toLocaleDateString() 
                    ? "Today" 
                    : new Date(day.date).toLocaleDateString('en-us', { weekday:"short"})}
                </p>
                <img src={day.day.condition.icon} alt="icon" />
                <p>{Math.ceil(day.day.mintemp_c)}°</p>
                <p>{Math.ceil(day.day.maxtemp_c)}°</p>

            </div>
        ))}
    </div>
  )
}

export default Forecast