import cloudy from "../../../../assets/cloudy.svg";
import "./WeatherCard.css";

function WeatherCard() {
  return (
    <section className="weather-card">
      <img className="weather-card__image" src={cloudy} alt="cloud image" />
      <p className="weather-card__temp">75 &deg;F</p>
    </section>
  );
}

export default WeatherCard;
