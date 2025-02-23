"use client";

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <div className="flex justify-between p-5 bg-gray-500  shadow-lg shadow-gray-800/50">
        <Link href={`/`}>
          <Image height={50} width={50} alt="logo" src={"/images/logo.svg"} />
        </Link>
      </div>
    </>
  );
};

export default Header;
