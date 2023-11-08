import usePokemonLocalData from "@/app/_utils/usePokemonLocalData";
import { LocalPokemonInfo } from "@/models/pokemon.interface";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CatchModal({
  id,
  name,
  isOpen,
  onClose,
  onSuccess,
}: {
  id: number;
  name: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (pokemonInfo: LocalPokemonInfo) => void;
}) {
  const [catchSuccess, setCatchSuccess] = useState(false);
  const [catchInProgress, setCatchInProgress] = useState(true);

  useEffect(() => {
    catchPokemon();
  }, []);

  const catchPokemon = () => {
    setCatchInProgress(true);

    setTimeout(() => {
      const catchStatus = randomCatchPokemon();
      setCatchSuccess(catchStatus);

      if (!catchStatus) {
        closeModalWithDelay();
      }
      setCatchInProgress(false);
    }, 1500);
  };

  const randomCatchPokemon = () => {
    const CATCH_PROBABILITY = 0.45;
    const isPokemonCatched = Math.random() < CATCH_PROBABILITY;
    return isPokemonCatched;
  };

  const closeModalWithDelay = () => {
    setTimeout(() => onClose(), 800);
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="flex h-screen w-screen bg-slate-800/30 fixed top-0 left-0 z-20  justify-center pt-32">
        <div className="bg-white max-w-lg w-full rounded-3xl px-6 py-10 h-fit">
          {catchInProgress && <CatchInProgress />}

          {!catchInProgress && catchSuccess && (
            <CatchSuccess
              name={name}
              id={id}
              onClose={onClose}
              onRelease={onClose}
              onCollect={onSuccess}
            />
          )}

          {!catchInProgress && !catchSuccess && <CatchFailed name={name} />}
        </div>
      </div>
    </div>
  );
}

function CatchSuccess({
  id,
  name,
  onClose,
  onRelease,
  onCollect,
}: {
  id: number;
  name: string;
  onClose: () => void;
  onRelease: () => void;
  onCollect: (pokemonInfo: LocalPokemonInfo) => void;
}) {
  const catchPokemonList = usePokemonLocalData();
  const [pokemonName, setPokemonName] = useState("");
  const [validation, setValidation] = useState({
    hasError: false,
    message: "",
  });

  const collectPokemon = () => {
    const formValidation = validateForm();

    if (formValidation.hasError) {
      setValidation(formValidation);
    } else {
      onCollect({
        name: name,
        id: id,
        nickname: pokemonName,
      });

      onClose();
    }
  };

  const isNicknameExist = (nickname: string) =>
    !!catchPokemonList.find((pokemon) => pokemon.nickname === nickname);

  const validateForm = () => {
    const pokemonExist = isNicknameExist(pokemonName);
    if (!pokemonName) return { hasError: true, message: "Name required" };

    if (pokemonExist)
      return { hasError: true, message: "You have the same Name" };

    return { hasError: false, message: "" };
  };

  const clearErrorState = () => {
    setValidation({
      hasError: false,
      message: "",
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 relative mb-3">
        <Image
          fill={true}
          src="/pokeball.png"
          style={{ objectFit: "contain" }}
          alt=""
          className="animate-bounce"
        />
      </div>
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Gotcha!</h3>
        <p>
          <span className="capitalize">{name}</span> Was Caught, Give it a Name
        </p>
      </div>
      <div>
        <div className="mb-4 flex flex-col">
          <input
            type="text"
            value={pokemonName}
            onChange={(event) => {
              clearErrorState();
              setPokemonName(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") collectPokemon();
            }}
            className={`${
              validation.hasError
                ? "border-red-500 focus:outline-red-500"
                : "focus:outline-yellow-600"
            } w-full py-3 px-4 border rounded-xl mb-1`}
            placeholder="Nickname"
          />

          {validation.hasError && (
            <label className="text-sm text-red-500">{validation.message}</label>
          )}
        </div>
        <div className="flex gap-1 justify-center">
          <button
            onClick={() => onRelease()}
            className="bg-slate-200 hover:bg-slate-300 :bg-slate-400 rounded-full px-5 py-2"
          >
            Release
          </button>
          <button
            onClick={() => collectPokemon()}
            className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-full px-5 py-2 font-semibold"
          >
            Collect
          </button>
        </div>
      </div>
    </div>
  );
}

function CatchFailed({ name }: { name: string }) {
  return (
    <div className="flex items-center flex-col">
      <div className="w-20 h-20 relative mb-3">
        <Image
          fill={true}
          src="/pokeball.png"
          style={{ objectFit: "contain" }}
          alt=""
          className="grayscale opacity-40 animate-pulse"
        />
      </div>
      <p>
        Oops, <span className="capitalize">{name}</span> Fled!
      </p>
    </div>
  );
}

function CatchInProgress() {
  return (
    <div className="flex items-center flex-col">
      <div className="w-20 h-20 relative mb-3">
        <Image
          fill={true}
          src="/pokeball.png"
          style={{ objectFit: "contain" }}
          alt=""
          className="animate-spin"
        />
      </div>
      <p className="animate-pulse ">Throwing Pokeball...</p>
    </div>
  );
}
