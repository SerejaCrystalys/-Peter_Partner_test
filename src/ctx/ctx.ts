import { createContext } from "react";
import axios from "axios";

export class ApiCtx {
  private readonly api_request = async (url: string) => {
    const data = await axios
      .get(
        `https://finnhub.io/api/v1/${url}&token=${process.env.NEXT_PUBLIC_FINHUB_API_KEY}`
      )
      .catch((e) => console.log(e));
    // console.log(data!.data);
    return data!.data;
  };

  private readonly socket = new WebSocket(
    `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINHUB_API_KEY}`
  );

  private readonly socket_subscribe = async (symbols: string[]) => {
    this.socket.addEventListener("open", () => {
      this.socket.send(`{'type':'subscribe','symbol':'AAPL'}`);
      console.log("open", symbols);
      symbols.forEach((item) => {
        console.log(JSON.stringify({ type: "subscribe", symbol: item }));
        this.socket.send(JSON.stringify({ type: "subscribe", symbol: item }));
      });
    });
    let data;
    // Listen for messages
    this.socket.addEventListener("message", function (event) {
      data = JSON.parse(event.data);
      console.log(data);
    });

    return data;
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
    subscribe: (symbols: string[]) => this.socket_subscribe(symbols),
    unsubscribe: (symbols: string[]) => {
      symbols.forEach((item) => {
        this.socket.send(JSON.stringify({ type: "unsubscribe", symbol: item }));
      });
    },
  };
}

const apiCtx = createContext(new ApiCtx());

export default apiCtx;
