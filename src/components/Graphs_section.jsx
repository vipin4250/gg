import React, { useRef, useEffect } from "react";
import { Line, Scatter, Pie } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";

const Graphs_section = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available.</p>;
  }

  return (  
    <div className="accordion" id="chartsAccordion">
      {data.map((chart, index) => (
        <ChartAccordion
          key={index}
          title={chart.title}
          chartData={chart.chartData}
          chartType={chart.chartType}
          tableData={chart.tableData}
        />
      ))}
    </div>
  );
};

const ChartAccordion = ({ title, chartData, chartType, tableData = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const initializeChart = () => {
      // Check if chartData is available before rendering the chart
      if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
        return;
      }

      // Cleanup previous chart instances before rendering a new one
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create the new chart
      if (chartType === "line") {
        chartRef.current = new Line(chartData, { responsive: true });
      } else if (chartType === "scatter") {
        chartRef.current = new Scatter(chartData, { responsive: true });
      } else if (chartType === "pie") {
        chartRef.current = new Pie(chartData, { responsive: true });
      }
    };

    // Ensure that the chart is initialized after the component has mounted
    initializeChart();

    // Cleanup the chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData, chartType]);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${title}`}>
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${title}`}
          aria-expanded="true"
          aria-controls={`collapse-${title}`}
        >
          {title}
        </button>
      </h2>
      <div
        id={`collapse-${title}`}
        className="accordion-collapse collapse show"
        aria-labelledby={`heading-${title}`}
      >
        <div className="accordion-body">
          <div className="chart-container">
            {chartType === "line" && <Line ref={chartRef} data={chartData} />}
            {chartType === "scatter" && (
              <Scatter ref={chartRef} data={chartData} />
            )}
            {chartType === "pie" && <Pie ref={chartRef} data={chartData} />}
          </div>

          <h4>Tabular Chart</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {tableData &&
                tableData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const dummyData = [
  {
    title: "Line Chart",
    chartType: "line",
    chartData: {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Monthly Sales",
          data: [10, 25, 15, 30, 20],
          borderColor: "blue",
          fill: false,
        },
      ],
    },
    tableData: [
      { id: 1, name: "Product A", value: 10 },
      { id: 2, name: "Product B", value: 25 },
      { id: 3, name: "Product C", value: 15 },
    ],
  },
  // Add similar dummy data for Scatter and Pie charts
  // ...
];

export default function App() {
  return (
    <div>
      <Graphs_section data={dummyData} />
    </div>
  );
}
