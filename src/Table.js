import "./Table.css";
import React from "react";
import { addCommas } from "./utils";

function Table({ countrys }) {
  return (
    <div className="table">
      
      {
     
     countrys?.map((country) => (
        <tr key={country?.country}>
          <td>{country?.country}</td>
          <td>
            <strong>{addCommas(country?.cases)}</strong>
           
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
