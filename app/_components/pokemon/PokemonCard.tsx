"use client";

import Image from "next/image";
import Link from "next/link";
export default function PokemonCard(props: {
  name: string;
  id: number;
  customName?: string;
  owned?: boolean;
}) {
  return (
    <div>
      <Link href={`/pokemon/${props.id}`}>
        <div className="bg-slate-100 rounded-2xl items-center flex h-32 justify-between p-6 relative hover:bg-blue-50 hover:shadow-xl  hover:cursor-pointer  delay-75 transition group ">
          <div className="flex flex-col gap-1 flex-1">
            <div className="text-xs flex gap-1 items-center">
              {props.owned && (
                <div className="w-3 h-3 relative">
                  <Image src="/poke-owned.png" fill={true} alt="owned"></Image>
                </div>
              )}
              <span className="opacity-50 font-semibold">N° {props.id} </span>
            </div>
            <h3 className="text-xl font-semibold capitalize">
              {props.name.replace("-", " ")}
            </h3>

            {props.customName && (
              <p className="opacity-50 font-semibold">{props.customName}</p>
            )}
          </div>
          <Image
            className="flex-none translate-x-10 group-hover:scale-125 transition delay-75"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
            alt={props.name}
            width={125}
            height={125}
            quality={100}
          ></Image>
        </div>
      </Link>
    </div>
  );
}
