import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import "./CountriesCovid.css";

const { Option } = Select;

export default function CountriesCovid({ handleCountry }) {
  const [listCountries, setListCountries] = useState([]);

  useEffect(() => {
    const countriesApi = `https://api.covid19api.com/countries`;
    axios.get(countriesApi).then((res) => setListCountries(res.data));
  }, []);

  return (
    <div className="form_search">
      <span className="title_search">Quốc gia</span>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a country"
        onChange={(value) => {
          handleCountry(value);
        }}
      >
        {listCountries.map((country) => (
          <Option key={country.ISO2} value={country.Slug}>
            {country.Country}
          </Option>
        ))}
      </Select>
      <span className="title_search">Chọn quốc gia của bạn</span>
    </div>
  );
}
