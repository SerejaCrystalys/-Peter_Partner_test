'use client'
import { createContext } from "react";
import axios from "axios";

export class ApiCtx {
  private readonly api_request = async (url: string) => {
    const data = await axios
      .get(
        `https://finnhub.io/api/v1/${url}&token=${process.env.NEXT_PUBLIC_FINHUB_API_KEY}`
      )
      .catch((e) => console.log(e));
    return data!.data;
  };

  private readonly socket_subscribe = (
    symbols: string[],
    callback: (data: Wrapper<{ s: string; p: number }>) => void
  ) => {
    const socket = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINHUB_API_KEY}`
    );
    socket.addEventListener("open", () => {
      symbols.forEach((item) => {
        socket.send(JSON.stringify({ type: "subscribe", symbol: item }));
      });
    });

    socket.addEventListener("message", function (event) {
      const parsedData = JSON.parse(event.data);
      callback(parsedData); // Вызываем callback с данными
    });
  };

  get = {
    news: () => this.api_request("news?category=general"),
    search: (input: string) => this.api_request(`search?q=${input}`),
    metric: (symbol: string) =>
      this.api_request(`stock/metric?symbol=${symbol}&metric=all`),
    quote: (symbol: string) =>
      this.api_request(`quote?symbol=${symbol}&metric=all`),
  };
  ws = {
    subscribe: (
      symbols: string[],
      callback: (data: Wrapper<{ s: string; p: number }>) => void
    ) => this.socket_subscribe(symbols, callback),
  };
}

const apiCtx = createContext(new ApiCtx());

export default apiCtx;
