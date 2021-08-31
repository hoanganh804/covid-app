import React from "react";
import "./ItemDetail.css";

export default function ItemDetail({ title, data }) {
  const { NewConfirmed, NewDeaths, TotalConfirmed, TotalDeaths } = data;

  return (
    <div className="item">
      <span className="item_title">{title === 1 ? "Hôm nay" : "Tổng"}</span>
      <div>
        <div className="form_ca">
          <span className="canhiem label_title">Số ca nhiễm</span>
          <span className="socanhiem soca">
            {title === 1 ? NewConfirmed : TotalConfirmed}
          </span>
        </div>
        <div className="form_ca">
          <span className="catuvong label_title">Số ca tử vong</span>
          <span className="socatuvong soca">
            {title === 1 ? NewDeaths : TotalDeaths}
          </span>
        </div>
      </div>
    </div>
  );
}
