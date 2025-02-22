"use client";

import apiCtx from "@/ctx/ctx";
import { useContext, useEffect, useState } from "react";

const Stock = () => {
  const api = useContext(apiCtx);
  const [favSymbols, setFavSymbols] = useState([
    "BTC-USD",
    "ETH-USD",
    "EUR/USD",
    "GBP/USD",
    "AAPL",
    "MSFT",
    "AMZN",
  ]);

  useEffect(() => {
    api.ws.init();
    const socket = api.ws.get_socket;
    socket.addEventListener("open", () => {
      favSymbols.forEach((item) => {
        socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
      });
    });
    socket.addEventListener("message", function (event) {
      console.log("Message from server ", JSON.parse(event.data));
    });
    socket.addEventListener("error", (error) => {
      console.error(error);
    });
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between bg-gray-600 shadow-lg shadow-gray-800/50 ">
        {favSymbols.map((item, index) => {
          return (
            <div
              className="h-10 m-3 p-3 border-solid border-red-600 border-2"
              key={index}
            >
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Stock;
