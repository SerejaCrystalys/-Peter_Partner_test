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

  get = {
    news: () => this.api_request("news?category=general"),
    search: (input: string) => this.api_request(`search?q=${input}`),
    metric: (symbol: string) =>
      this.api_request(`stock/metric?symbol=${symbol}&metric=all`),
    quote: (symbol: string) =>
      this.api_request(`quote?symbol=${symbol}&metric=all`),
  };
}

const apiCtx = createContext(new ApiCtx());

export default apiCtx;
