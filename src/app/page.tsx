"use client";
import apiCtx from "@/ctx/ctx";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const api = useContext(apiCtx);
  const [news, setNews] = useState<[NewsData] | null>(null);

  useEffect(() => {
    api.get
      .news()
      .then((data) => {
        setNews(data);
      })
      .catch((error) => {
        console.error("Failed to fetch news:", error);
      });
  }, [api]);

  return (
    <div className="bg-gray-700">
      <h1>News</h1>

      {news?.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.headline}</h2>

            <Image height={100} width={100} alt="image" src={item.image} />
            {item.summary}
          </div>
        );
      })}
    </div>
  );
}
