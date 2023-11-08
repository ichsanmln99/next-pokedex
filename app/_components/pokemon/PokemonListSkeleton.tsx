export default function PokemonListSkeleton(totalCard: number) {
  const skeletons = [];
  for (let i = 0; i < totalCard; i++) {
    skeletons.push(
      <div key={i} className="h-32 bg-slate-300 rounded-3xl"></div>
    );
  }

  return skeletons;
}
