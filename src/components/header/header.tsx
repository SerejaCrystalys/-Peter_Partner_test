"use client";
import Search, { SearchProps } from "antd/es/input/Search";
import Image from "next/image";

const Header = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <>
      <div className="flex justify-between p-10">
        <Image height={50} width={50} alt="logo" src={"/images/logo.svg"} />
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </div>
    </>
  );
};

export default Header;
