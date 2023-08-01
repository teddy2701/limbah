import React from "react";
import {
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(LineElement, LinearScale, CategoryScale, PointElement, Tooltip);

const Grafik = ({ labelGrafik, dataGrafik }) => {
  const labels = labelGrafik.map((item) => {
    const [tanggal, jam] = item.split(", ");
    return [tanggal, jam];
  });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: dataGrafik,
        borderWidth: 3,
        backgroundColor: ["rgb(220, 53, 69)"],
        borderColor: ["rgb(220, 53, 69)"],
        tension: 0.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="">
      <Line data={data} options={options} />
    </div>
  );
};

export default Grafik;
