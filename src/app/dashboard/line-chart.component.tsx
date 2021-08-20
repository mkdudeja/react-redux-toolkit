import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useState } from "react";

function LineChart() {
  const [hoverData, setHoverData] = useState(null);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    xAxis: {
      categories: ["A", "B", "C"],
    },
    series: [{ type: "line", data: [1, 2, 3] }],
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver(e: any) {
              setHoverData(e.target.category);
            },
          },
        },
      },
    },
  });

  const updateSeries = () => {
    setChartOptions({
      series: [{ type: "line", data: [Math.random() * 5, 2, 1] }],
    });
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <h3>Hovering over {hoverData}</h3>
      <button onClick={updateSeries}>Update Series</button>
    </div>
  );
}

export default LineChart;
