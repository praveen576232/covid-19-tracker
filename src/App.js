import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import "./App.css";
import instance from "./axios/axios";
import InfoBox from "./InfoBox";
import LinerGraph from "./LinerGraph";
import Map from "./Map";
import Table from "./Table";
import { sortdata } from "./utils";
 import "leaflet/dist/leaflet.css";
function App() {
  const [countries, SetCountries] = useState([]);
  const [selectCountrie, SetSelectCountrie] = useState("worldwide");
  const [countrieInfo, SetCountrieInfo] = useState({});
  const [tabledata, setTabledata] = useState([]);
  const [mapcenter, setmapcenter] = useState({ lat:34.80746, lng:-40.4796});
  const [mapzoom, setmapzoom] = useState(3);
  const [mapcountry, setMapCountry] = useState([]);
  const [caseType, setcaseType] = useState("cases");
  useEffect(() => {
    const feachCountryInfo = async () => {
      const respose = await instance.get("/all").then((data) => {
        SetCountrieInfo(data.data);
        
      });

      return respose;
    };
    feachCountryInfo();
  }, []);
  useEffect(() => {
    const featchRequest = async () => {
      await instance.get("/countries").then((res) => {
        const data =res.data;
      
        const country = data.map((country) => ({
          name: country?.country,
          value: country?.countryInfo.iso2,
        }));
        
        setTabledata(sortdata(data));
        SetCountries(country);
        setMapCountry(data)
        return data;
      });
      
    };
    featchRequest();
  }, []);
  const changeCountrySeclected = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "worldwide" ? "/all" : `/countries/${countryCode}`;
    await instance.get(url).then((data) => {
      const selectedCountry = data.data;
      SetCountrieInfo(selectedCountry);
      SetSelectCountrie(countryCode);
      setmapcenter([selectedCountry.countryInfo.lat,selectedCountry.countryInfo.long])
 setmapzoom(4)
    });
  };
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid-19 tracker</h1>
          <FormControl className="app_drop_list">
            <Select
              variant="outlined"
              onChange={changeCountrySeclected}
              value={selectCountrie}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country?.name} value={country?.value}>
                  {country?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_infobox">
          <InfoBox
          isRed 
          active ={caseType === 'cases'}
          onClick ={()=>setcaseType("cases")}
            title="Coronavirus Cases"
            cases={countrieInfo?.todayCases}
            totle={countrieInfo?.cases}
          ></InfoBox>
          <InfoBox
           active ={caseType === 'recovered'}
             onClick ={()=>setcaseType("recovered")}
            title="Recovered"
            cases={countrieInfo?.todayRecovered}
            totle={countrieInfo?.recovered}
          ></InfoBox>
          <InfoBox
           isRed 
           active ={caseType === 'deaths'}
             onClick ={()=>setcaseType("deaths")}
            title="Deaths"
            cases={countrieInfo?.todayDeaths}
            totle={countrieInfo?.deaths}
          ></InfoBox>
        </div>
        <Map 
        caseType={caseType}
        mapcountry ={mapcountry}
        center={mapcenter}
        zoom={mapzoom}
        ></Map>

      </div>
      <Card className="app_right">
        <CardContent>
          <h3 className="app_right_text">Live Cases by Country</h3>
          <Table countrys={tabledata}></Table>
          <h3>Worldwide new {caseType}</h3>
          <LinerGraph className="app_graph" casetype={caseType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
