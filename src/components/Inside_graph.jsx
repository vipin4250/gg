import React from 'react';
import { Line, Pie, Scatter } from 'react-chartjs-2';
import './Inside_graph.css';

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

function Inside_graph({ chartType }) {
//   const [type, setType] = useState(chartType);
  let chart_type;
  switch (chartType) {
    case 'pie':
      chart_type = <Pie className="pie_data" data={data} options={{ maintainAspectRatio: false, width: 200, height: 200 }} />;
      break;
    case 'line':
      chart_type = <Line className="line_data" data={data} options={{ maintainAspectRatio: false, width: 200, height: 200 }} />;
      break;
    case 'scatter':
      chart_type = <Scatter className="scatter_data" data={data} options={{ maintainAspectRatio: false, width: 200, height: 200 }} />;
      break;
    default:
      chart_type = null;
  }

  return 
    <div className="container">
        {chart_type}
    </div>;
}

export default Inside_graph;
