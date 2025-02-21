"use client";
import apiCtx from "@/ctx/ctx";
import useDebouncedValue from "@/hooks/debounce";
import { Dropdown, Input, MenuProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useContext, useEffect, useState } from "react";

const Header = () => {
  const api = useContext(apiCtx);

  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<MenuProps["items"]>([]);

  const debounceValue = useDebouncedValue(inputValue, 500);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (!debounceValue) return;

    api.get.search(inputValue).then((data) => {
      if (data) {
        console.log(data);

        setItems(
          data.result.map((item: SearchData, index: number) => {
            return {
              key: index,
              label: (
                <Link href={`${item.symbol}`}>
                  <div>{item.displaySymbol}</div>
                </Link>
              ),
            };
          })
        );
      }
    });
  }, [debounceValue]);

  return (
    <>
      <div className="flex justify-between p-5 bg-gray-800">
        <Image height={50} width={50} alt="logo" src={"/images/logo.svg"} />
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          overlayStyle={{
            paddingTop: "8px",
          }}
        >
          <Input
            className="self-center font-bold  "
            placeholder="input search text"
            allowClear
            // onSearch={}
            onChange={onInput}
            style={{
              width: 400,
              // height
            }}
          />
        </Dropdown>
      </div>
    </>
  );
};

export default Header;
