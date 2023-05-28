import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
import './forecast.css'

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Forcast = ({ data }) => {
  const dayinaweek = new Date().getDay();
  const forcastdays = WEEK_DAYS.slice(dayinaweek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayinaweek)
  );
  // console.log(data);
  console.log(data);

  return (
    <>
      <label className="title">Daily Forecast -- {data.city.name}</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="icon"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className="day">{forcastdays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C / {" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className="daily-forecast-detail">
                    <div class="daily-details-items">
                        <label>Pressure</label>
                        <label>{item.main.pressure} hPa</label>
                    </div>
                    <div class="daily-details-items">
                        <label>Humidity</label>
                        <label>{item.main.humidity}%</label>
                    </div>
                    <div class="daily-details-items">
                        <label>Clouds</label>
                        <label>{item.clouds.all}%</label>
                    </div>
                    <div class="daily-details-items">
                        <label>Wind Speed</label>
                        <label>{item.wind.speed} m/s</label>
                    </div>
                    <div class="daily-details-items">
                        <label>Sea Level</label>
                        <label>{item.main.sea_level}</label>
                    </div>
                    <div class="daily-details-items">
                        <label>Feels Like</label>
                        <label>{item.main.feels_like} °C</label>
                    </div>
                </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forcast;
