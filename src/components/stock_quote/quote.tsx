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
import useQuoteData from "./quote_data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  symbol: string;
  filter: string;
  socketUpd:
    | {
        s: string;
        p: number;
      }[]
    | undefined;
}

const Quote = ({ symbol, filter, socketUpd }: Props) => {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const api = useContext(apiCtx);
  const { data, options } = useQuoteData(quoteData, symbol);

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

  useEffect(() => {
    if (!socketUpd || !symbol) return; // Проверяем, что socketUpd и symbol существуют

    const foundItem = socketUpd.find((item) => {
      return item.s.includes(symbol); // Ищем symbol в item.s
    });

    if (foundItem) {
      console.log(foundItem);
      setQuoteData(
        (prev) =>
          ({
            ...prev, // Копируем все поля из предыдущего состояния
            c: foundItem.p, // Обновляем только поле `c`
          } as QuoteData)
      );
    }
  }, [socketUpd, symbol]);

  const calculatePercentageChange = (
    initialValue: number,
    currentValue: number
  ) => ((currentValue - initialValue) / initialValue) * 100;

  if (loading || !quoteData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  switch (filter) {
    case "fall":
      if (calculatePercentageChange(quoteData.o, quoteData.c) > 0) {
        return <></>;
      }
      break;
    case "grow":
      if (calculatePercentageChange(quoteData.o, quoteData.c) < 0) {
        return <></>;
      }
      break;
    default:
      return (
        <div className="flex flex-auto m-auto">
          <div style={{ width: "600px", margin: "50px auto" }}>
            <h2>{symbol} Quote</h2>
            {/* @ts-expect-error 123 */}
            <Line data={data} options={options} />
          </div>
          <div className="flex flex-col gap-3 self-center">
            <div>
              24H Change{" "}
              {calculatePercentageChange(quoteData.o, quoteData.c).toFixed(2)}%
            </div>
            <div>Price {quoteData.c}</div>
            <div>24H High {quoteData.h}</div>
            <div>24H Low {quoteData.l}</div>
          </div>
        </div>
      );
  }
};

export default Quote;
