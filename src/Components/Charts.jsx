import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }) => {
  const labels = data.slice(1).map(row => row[0]);         // X-axis labels
  const values = data.slice(1).map(row => parseInt(row[1])); // Y-axis values

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sample Data',
        data: values,
        backgroundColor: '#06D6A0',
        borderColor: '#048A81',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sample Data Chart',
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} key={JSON.stringify(chartData)} />;
};

const DataVisual = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sheetID = "1g3Esmr1-Z5jt5_mqOv9-f9fvyFezgT_2Z-8G7w5ChSU";  // Replace with your Spreadsheet ID
      const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;      // Correct syntax for Vite
      const range = "Player Stats!A1:AH46";          // Adjusted range as necessary
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;
    
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.values);               // 'values' is an array of rows
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Sidemen Among Us Data Visuals</h1>
      {data.length > 0 ? <ChartComponent data={data} /> : "Loading..."}
    </div>
  );
};

export default DataVisual;
