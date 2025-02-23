"use client";
import apiCtx from "@/ctx/ctx";
import { useContext, useEffect, useState } from "react";
import Quote from "@/components/stock_quote/quote";
import AddSymbolButton from "@/components/add_symbol/add_symbol";

export default function Home() {
  const api = useContext(apiCtx);
  const [symbols, setSymbols] = useState<string[]>([]);
  console.log(symbols);
  useEffect(() => {
    window.localStorage.setItem("symbols", JSON.stringify(symbols));
  }, [symbols]);

  useEffect(() => {
    if (symbols) api.ws.subscribe(symbols);

    window.localStorage.setItem("symbols", JSON.stringify(symbols));
  }, [symbols]);

  return (
    <div className="flex flex-col  bg-gray-50 h-100%">
      {symbols?.map((item: string, index) => {
        return <Quote key={index} symbol={item} />;
      })}
      <AddSymbolButton symbols={symbols} setSymbols={setSymbols} />
    </div>
  );
}
