"use client";
import { Pokemon } from "@/models/pokemon.interface";
import { useState } from "react";
import AboutSection from "./AboutSection";
import StatsSection from "./StatsSection";
import MovesSection from "./MovesSection";

export default function PokemonInfo({ pokemon }: { pokemon: Pokemon }) {
  const [selectedTab, setSelectedTab] = useState("about");
  const tabInfo = ["about", "stats", "moves"];

  return (
    <div className="bg-white md:p-10 p-3 rounded-3xl relative w-full">
      <div>
        <div className="shadow-xl shadow-slate-100 rounded-xl flex justify-around text-sm overflow-hidden ">
          {tabInfo.map((tabName) => (
            <div
              key={tabName}
              onClick={() => setSelectedTab(tabName)}
              className="flex-1 h-12 cursor-pointer hover:bg-slate-50 active:bg-slate-100"
            >
              <div
                className={`h-full w-fit flex justify-center items-center mx-auto capitalize ${
                  selectedTab === tabName ? "border-b-4 border-yellow-400" : ""
                }`}
              >
                {tabName}
              </div>
            </div>
          ))}
        </div>
        <div className="md:p-6 md:pt-12 p-6 py-10">
          {selectedTab === "about" && (
            <AboutSection pokemon={pokemon}></AboutSection>
          )}
          {selectedTab === "stats" && (
            <StatsSection pokemon={pokemon}></StatsSection>
          )}
          {selectedTab === "moves" && (
            <MovesSection pokemon={pokemon}></MovesSection>
          )}
        </div>
      </div>
    </div>
  );
}
