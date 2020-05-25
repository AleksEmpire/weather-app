import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  state = {
    query: "",
    weather: "",
  };
  search = (evt) => {
    const { query } = this.state;
    if (evt.key === "Enter") {
      axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=c1edf14920ad9451fdaf5f52c6554007`
      )
        .then((res) => res.data)
        .then((result) => {
          this.setState({
            weather: result,
            query: "",
          });
        });
    }
  };
  dateBuilder = (dateData) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[dateData.getDay()];
    let date = dateData.getDate();
    let month = months[dateData.getMonth()];
    let year = dateData.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  render() {
    const { weather, query } = this.state;
    return (
      <div
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 16
              ? "app warm"
              : "app"
            : "app"
        }
      >
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => this.setState({ query: e.target.value })}
              value={query}
              onKeyPress={this.search}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{this.dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      </div>
    );
  }
}
