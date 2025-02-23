type NewsData = {
  category: string;
  datetime: Date;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
};

type SearchData = {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
};

type QuoteData = {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
};

type Wrapper<T> = {
  data: T[]; // data — это массив элементов типа T
};
