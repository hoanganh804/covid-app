import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import "./ChartCovid.css";
import axios from "axios";
import moment from "moment";
import "moment/locale/vi";
import { Button } from "antd";

moment.locale("vi");

export default function ChartCovid({ country }) {
  const [dataByCountry, setDataByCountry] = useState([]);
  const [dataByDay, setDataByDay] = useState([]);

  useEffect(() => {
    const byCountryApi = `https://api.covid19api.com/total/country/${country}`;
    if (country) {
      axios.get(byCountryApi).then((res) => {
        const newDataByDays = res.data.map((data) => {
          return {
            Confirmed: data.Confirmed,
            Date: moment(data.Date).format("L"),
          };
        });
        setDataByCountry(newDataByDays);
      });
    }
  }, [country]);

  const handleDataByDay = (day) => {
    const lengthDay = dataByCountry.length;
    const newDataByDays = dataByCountry.slice(lengthDay - day, lengthDay);
    setDataByDay(newDataByDays);
  };

  useEffect(() => {
    setDataByDay(dataByCountry);
  }, [dataByCountry]);

  const data = dataByDay;

  const config = {
    data,
    height: 300,
    xField: "Date",
    yField: "Confirmed",
    point: {
      size: 1,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#2593fc",
        lineWidth: 2,
      },
    },
  };

  return (
    <>
      <div className="button_chart">
        <Button
          className="button_day"
          onClick={() => handleDataByDay(dataByCountry.length)}
        >
          Tất cả
        </Button>
        <Button className="button_day" onClick={() => handleDataByDay(30)}>
          30 ngày
        </Button>
        <Button className="button_day" onClick={() => handleDataByDay(7)}>
          7 ngày
        </Button>
      </div>

      <Line className="chart_form" {...config} />
    </>
  );
}
