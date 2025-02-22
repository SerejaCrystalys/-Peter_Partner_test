import { createContext } from "react";
import axios from "axios";
import { subscribe } from "diagnostics_channel";

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

  private readonly socket_connection = async () => {
    const socket = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINHUB_API_KEY}`
    );

    // Connection opened -> Subscribe

    socket.addEventListener("open", () => {
      socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
      socket.send(
        JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
      );
      socket.send(
        JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" })
      );
    });

    // Listen for messages
    socket.addEventListener("message", function (event) {
      console.log("Message from server ", JSON.parse(event.data));
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
    get_socket: new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINHUB_API_KEY}`
    ),
    init: () => this.socket_connection(),
  };
}

const apiCtx = createContext(new ApiCtx());

export default apiCtx;
