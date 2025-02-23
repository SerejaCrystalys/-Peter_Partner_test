"use client";
import apiCtx from "@/ctx/ctx";
import { useContext, useEffect, useState } from "react";
import Quote from "@/components/stock_quote/quote";
import AddSymbolButton from "@/components/add_symbol/add_symbol";
import { Select } from "antd";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "grow", label: "Only growing" },
  { value: "fall", label: "Only falling" },
];

export default function Home() {
  const api = useContext(apiCtx);
  const [symbols, setSymbols] = useState<string[]>([]);
  const [socketUpd, setSocketUpd] = useState<
    {
      s: string;
      p: number;
    }[]
  >([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const local = window.localStorage.getItem("symbols");
    if (local) setSymbols(JSON.parse(local));
  }, []);

  useEffect(() => {
    if (symbols[1]) {
      api.ws.subscribe(symbols, (data: Wrapper<{ s: string; p: number }>) => {
        setSocketUpd(
          data.data.map((item: { s: string; p: number }) => {
            return {
              s: item.s,
              p: item.p,
            };
          })
        );
      });
    }

    window.localStorage.setItem("symbols", JSON.stringify(symbols));
  }, [symbols]);

  console.log(socketUpd);

  return (
    <div className="flex flex-col  bg-gray-50 h-100%">
      <div className="sticky top-5 m-5 text-">
        filter:{" "}
        <Select
          defaultValue={filter}
          style={{ width: 120 }}
          onChange={(value) => setFilter(value)}
          options={filterOptions}
        />
      </div>

      {symbols?.map((item: string, index) => {
        return (
          <Quote
            key={index}
            symbol={item}
            filter={filter}
            socketUpd={socketUpd}
          />
        );
      })}
      <AddSymbolButton symbols={symbols} setSymbols={setSymbols} />
    </div>
  );
}
