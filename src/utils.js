import { Circle, Popup } from "react-leaflet";
import React from "react";

export const sortdata = (data) => {
  const intialArray = [...data];
  return intialArray.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

const caseTypeColors = {
  cases: {
    hex: "#cc1035",
    rgb: "rgb(204,16,52)",
    half_op: "rgba(204,16,52,0.5)",
    multipiler: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125,215,29)",
    half_op: "rgba(125,215,29,0.5)",
    multipiler: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251,68,67)",
    half_op: "rgba(251,68,67,0.5)",
    multipiler: 2000,
  },
};

export const showDataonMap = (data, caseType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={caseTypeColors[caseType].hex}
      fillColor={caseTypeColors[caseType].hex}
      radius={
        Math.sqrt(country[caseType]) * caseTypeColors[caseType].multipiler
      }
    >
      <Popup>
        <div className="popup">
          <div
            className="popup_flag"
            style={{ backgroundImage: `url(${country.countryInfo?.flag})` }}
          />

          <div className="popup_name">{country?.country}</div>
          <div className="popup_cases">Cases: {addCommas(country?.cases)}</div>
          <div className="popup_recoverd">Recovered : {addCommas(country?.recovered)}</div>
          <div className="popup_deaths">Deaths: {addCommas(country?.deaths)}</div>
        </div>
      </Popup>
    </Circle>
  ));


const checkFraction = (result) =>{
  const numbers = result.split(".");
  if(parseInt(numbers[1]) === 0){
    return numbers[0];
  }else{
    return result;
  }
}

export  const numberFormater = (number) => {
    try {
      const num = parseInt(number);
      if (num > 999 && num <= 999999) {
        let res = (num / 1000).toFixed(1);
        return checkFraction(res) + "k";
      }
      if (num > 999999 && num <= 9999999999) {
        return checkFraction((num / 1000000).toFixed(1)) + "M";
      }
      if (num > 9999999999) {
        return checkFraction((num / 1000000000).toFixed(1)) + "B";
      }
      return num;
    } catch (e) {
      return number;
    }
  };
  
 export const addCommas = (number) => {
    number += '';
    let x = number.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ?','+x[x1]:'';
    const rgx =/(\d+)(\d{3})/;
    while(rgx.test(x1)){
        x1 =x1.replace(rgx,'$1'+','+'$2');
    }
    return x1+x2;
  
  };
  