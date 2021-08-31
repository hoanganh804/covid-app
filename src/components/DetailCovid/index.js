import React, { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import axios from "axios";
import "./ItemDetail.css";
import { Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons/lib/icons";

export default function DetailCountry({ country }) {
  const [allData, setAllData] = useState([]);
  const [globalData, setGlobalData] = useState({});
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    const detailApi = `https://api.covid19api.com/summary`;
    axios.get(detailApi).then((res) => setAllData(res.data.Countries));
    axios.get(detailApi).then((res) => setGlobalData(res.data.Global));
  }, []);

  useEffect(() => {
    let countryDataNew = "";
    if (country) {
      countryDataNew = allData.find((countryData) => {
        return countryData.Slug === country ? countryData : null;
      });
      setCountryData(countryDataNew);
    }
  }, [country, allData]);

  return (
    <>
      <div className="country">
        <span>{country ? countryData.Country : "Thế giới"}</span>
      </div>

      <Row>
        <Col xs={24} md={12}>
          <ItemDetail
            title={1}
            data={
              JSON.stringify(countryData) === "{}" ? globalData : countryData
            }
          />
        </Col>
        <Col xs={24} md={12}>
          <ItemDetail
            title={2}
            data={
              JSON.stringify(countryData) === "{}" ? globalData : countryData
            }
          />
        </Col>
      </Row>
    </>
  );
}
