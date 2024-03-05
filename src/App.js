import React, { useState, useEffect } from "react";
import "./App.css";
import search from "./Assets/search.png";
const api = {
  key: "e720111e8d51deffa61eded5a90e847d",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("ho chi minh");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      //process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setWeatherInfo(data);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
        setSearchInput("");
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  return (
    <>
      <body>
        <div className="wrap">
          <form onSubmit={handleSubmit}>
            <input
              class="searchTerm"
              type="text"
              placeholder="City"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="searchButton">
              <img src={search} alt="search" />
            </button>
          </form>
          {loading ? (
            <div>Loading ... </div>
          ) : (
            <>
              {errorMessage ? (
                <div style={{ color: "red" }}>{errorMessage}</div>
              ) : (
                <div className="wrap-city">
                  {weatherInfo ? (
                    <h2 className="city">
                      <p>{weatherInfo?.name}</p>
                      <span>{weatherInfo?.sys.country}</span>
                    </h2>
                  ) : null}

                  <div className="icon-weather">
                    {weatherInfo?.weather[0].icon ? (
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@2x.png`}
                        alt="icon"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="wind-container">
                    {weatherInfo?.weather[0].description ? (
                      <>
                        <span className="wind">
                          {weatherInfo?.weather[0].description}
                        </span>
                      </>
                    ) : null}
                  </div>
                  <div className="temp-container">
                    {weatherInfo?.main.temp && searchCity ? (
                      <>
                        <span className="temperature">
                          {weatherInfo?.main.temp}
                        </span>
                        <span className="unit">°C</span>
                      </>
                    ) : null}
                  </div>
                  <span></span>
                </div>
              )}
            </>
          )}
        </div>
      </body>
    </>
  );
}

export default App;
