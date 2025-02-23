"use client";

import apiCtx from "@/ctx/ctx";
import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, // Регистрируем CategoryScale
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Регистрируем необходимые компоненты Chart.js
ChartJS.register(
  CategoryScale, // Регистрируем шкалу для категорий
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Quote = ({ symbol }: { symbol: string }) => {
  const api = useContext(apiCtx);
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Загрузка данных котировки
  useEffect(() => {
    setLoading(true);
    setError(null);

    api.get
      .quote(symbol)
      .then((data) => {
        setQuoteData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch quote data");
        setLoading(false);
      });
  }, []);

  // api.socket.init();

  if (!quoteData) return <></>;
  // Подготовка данных для графика
  const data = {
    labels: ["Previous Close", "Open", "High", "Low", "Current Price"],
    datasets: [
      {
        label: "Price",
        data: [
          quoteData?.pc, // Цена закрытия предыдущего дня
          quoteData?.o, // Цена открытия
          quoteData?.h, // Максимальная цена
          quoteData?.l, // Минимальная цена
          quoteData?.c, // Текущая цена
        ],
        borderColor:
          quoteData?.c >= quoteData?.o
            ? "rgba(75, 192, 192, 1)"
            : "rgba(255, 99, 132, 1)", // Зеленый или красный
        backgroundColor:
          quoteData?.c >= quoteData?.o
            ? "rgba(75, 192, 192, 0.2)"
            : "rgba(255, 99, 132, 0.2)", // Зеленый или красный
        borderWidth: 2,
      },
    ],
  };

  // Настройки графика
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,

        text: `Stock Quote for ${symbol}`,
      },
    },
    scales: {
      x: {
        type: "category", // Используем категориальную шкалу для оси X
        labels: ["Previous Close", "Open", "High", "Low", "Current Price"],
      },
      y: {
        beginAtZero: false, // Начинаем ось Y не с нуля
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ width: "600px", margin: "20px auto" }}>
      <h2>{symbol} Stock Quote</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Quote;
