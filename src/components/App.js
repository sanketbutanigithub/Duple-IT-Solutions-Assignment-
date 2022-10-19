import "../App.css";
import { useState } from "react";

function App() {
  const [showwhether, setShowwhether] = useState(false);
  const [inputtext, setInputtext] = useState("");
  const [response, setResponse] = useState("");
  async function CallAPi() {
    let url =
      "http://api.weatherstack.com/current?access_key=11e42dade7af105e7cf39db8b3458b51&query=" +
      inputtext;
    let response = await fetch(url);
    let jsondata = await response.json();
    setResponse(jsondata);
    setShowwhether(true);
  }
  return (
    <div class="wrapper">
      <header>
        <i class="bx bx-left-arrow-alt"></i>Weather App
      </header>
      <section class="input-part">
        <p class="info-txt"></p>
        <div class="content">
          <input
            type="text"
            spellcheck="false"
            placeholder="Enter city name"
            required
            onChange={function (e) {
              setInputtext(e.target.value);
            }}
          />
          <div class="separator"></div>
          <button
            onClick={function () {
              CallAPi();
            }}
          >
            Search
          </button>
        </div>
      </section>
      {showwhether ? (
        <section class="weather-part">
          <img
            src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
            alt="Weather Icon"
          />
          <div class="temp">
            <span class="numb">{response.current.temperature}</span>
            <span class="deg">°</span>C
          </div>
          <div class="weather">{response.current.weather_descriptions[0]}</div>
          <div class="location">
            <i class="bx bx-map"></i>
            <span>
              {response.location.name}, {response.location.country}
            </span>
          </div>
          <div class="bottom-details">
            <div class="column feels">
              <i class="bx bxs-thermometer"></i>
              <div class="details">
                <div class="temp">
                  <span class="numb-2">{response.current.feelslike}</span>
                  <span class="deg">°</span>C
                </div>
                <p>Feels like</p>
              </div>
            </div>
            <div class="column humidity">
              <i class="bx bxs-droplet-half"></i>
              <div class="details">
                <span>{response.current.humidity}%</span>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default App;
