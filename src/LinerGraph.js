import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import instance from "./axios/axios";
import  {numberFormater,addCommas} from './utils'
import './Linergrap.css'
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numberFormater(tooltipItem.value);
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          formate: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, values) {
            return addCommas(value);
          },
        },
      },
    ],
  },
};
function LinerGraph({ casetype = "cases" }) {
  const [data, setData] = useState({});
  useEffect(() => {
    const feachdata = async () => {
      await instance.get("/historical/all?lastdays=120").then((res) => {
        const chartData = bulidchart(res.data, casetype);
        
        setData(chartData);
        return res;
      });
    };
    feachdata();
  }, [casetype]);

  const bulidchart = (data, caseType) => {
    const chartdata = [];
    let lastDatapoint;
    for (let date in data.deaths) {
      if (lastDatapoint) {
        const newDataPoint = {
          x: date,
          y: data[caseType][date] - lastDatapoint,
        };
        chartdata.push(newDataPoint);
      }
      lastDatapoint = data[caseType][date];
    }
    return chartdata;
  };

  return (
    <div className='graph'>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "#cc1034",
                data: data,
              },
            ],
          }}
        ></Line>
      )}
    </div>
  );
}

export default LinerGraph;
