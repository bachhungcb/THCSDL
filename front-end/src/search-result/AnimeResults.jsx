
function AnimeResults({ results }) {
  return (
    <div>
      {results.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}

export default AnimeResults;