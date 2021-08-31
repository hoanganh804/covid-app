import React, { useState, useEffect } from "react";
import CountriesCovid from "../CountriesCovid";
import "antd/dist/antd.css";
import DetailCountry from "../DetailCovid";
import ChartCovid from "../ChartCovid";
import "./CovidApp.css";
import moment from "moment";
import axios from "axios";
import "moment/locale/vi";

moment.locale("vi");

export default function CovidApp() {
  const [countrySelected, setCountrySelected] = useState("");
  const [dayNow, setDayNow] = useState("");

  const handleCountry = (value) => {
    setCountrySelected(value);
  };

  useEffect(() => {
    const detailApi = `https://api.covid19api.com/summary`;
    axios
      .get(detailApi)
      .then((res) => setDayNow(moment(res.data.Global.Date).format("lll")));
  }, []);

  return (
    <>
      <div className="main_app">
        <h1>Số liệu thống kê Covid</h1>
        <span>Cập nhật ngày {dayNow}</span>
      </div>

      <div>
        <CountriesCovid handleCountry={handleCountry} />
        <DetailCountry country={countrySelected} />
        <ChartCovid country={countrySelected} />
      </div>
    </>
  );
}
