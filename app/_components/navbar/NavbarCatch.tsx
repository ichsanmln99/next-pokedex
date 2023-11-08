import Link from "next/link";
import Image from "next/image";
import CatchMenuButton from "./CatchMenuButton";

export default function NavbarCatch() {
  return (
    <div className="flex bg-white shadow-2xl">
      <div className="max-w-5xl w-full  mx-auto py-3 px-2 flex justify-between items-center">
        <div className="h-10 w-20 relative">
          <Link href={"/"}>
            <Image
              src="/pokemon-logo.png"
              fill={true}
              quality={50}
              alt="pokemon logo"
              style={{ objectFit: "contain" }}
            ></Image>
          </Link>
        </div>
        <div>
          <CatchMenuButton></CatchMenuButton>
        </div>
      </div>
    </div>
  );
}
