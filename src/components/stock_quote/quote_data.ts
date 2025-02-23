import { useMemo } from "react";

const useQuoteData = (quoteData: QuoteData | null, symbol: string) => {
  const data = useMemo(() => {
    if (quoteData)
      return {
        labels: ["Previous Close", "Open", "High", "Low", "Current Price"],
        datasets: [
          {
            label: "Price",
            data: [
              quoteData?.pc,
              quoteData?.o,
              quoteData?.h,
              quoteData?.l,
              quoteData?.c,
            ],
            borderColor:
              quoteData?.c >= quoteData?.o
                ? "rgba(75, 192, 192, 1)"
                : "rgba(255, 99, 132, 1)",
            backgroundColor:
              quoteData?.c >= quoteData?.o
                ? "rgba(75, 192, 192, 0.2)"
                : "rgba(255, 99, 132, 0.2)",
            borderWidth: 2,
          },
        ],
      };
  }, [quoteData]);

  const options = useMemo(() => {
    return {
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
          type: "category",
          labels: ["Previous Close", "Open", "High", "Low", "Current Price"],
        },
        y: {
          beginAtZero: false,
        },
      },
    };
  }, [symbol]);

  return {
    data,
    options,
  };
};

export default useQuoteData;
