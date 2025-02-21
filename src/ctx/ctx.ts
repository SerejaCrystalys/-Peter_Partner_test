import { createContext } from "react";
import axios from "axios";

export class ApiCtx {
  private readonly api_request = async (url: string) => {
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/${url}&token=${process.env.NEXT_PUBLIC_FINHUB_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  };

  get = {
    news: () => this.api_request("news?category=general"),
  };
}

const apiCtx = createContext(new ApiCtx());

export default apiCtx;
