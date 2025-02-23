"use client";
import apiCtx from "@/ctx/ctx";
import useDebouncedValue from "@/hooks/debounce";
import { Dropdown, Input, MenuProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useContext, useEffect, useState } from "react";

const Header = () => {
  const api = useContext(apiCtx);

  return (
    <>
      <div className="flex justify-between p-5 bg-gray-500  shadow-lg shadow-gray-800/50">
        <Link href={`/`}>
          <Image height={50} width={50} alt="logo" src={"/images/logo.svg"} />
        </Link>
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
