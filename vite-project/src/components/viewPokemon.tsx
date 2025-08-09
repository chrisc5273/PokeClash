import { PokemonClient } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import { useNavigate } from 'react-router-dom';

const POKEMON_PER_PAGE = 35;

function getBestSprite(res: any): string | null {
  // Prefer modern official artwork, then Dream World, then classic front sprite
  return (
    res?.sprites?.other?.['official-artwork']?.front_default ??
    res?.sprites?.other?.dream_world?.front_default ??
    res?.sprites?.front_default ??
    null
  );
}

function ViewPokemon() {
  const pokemonClientApi = new PokemonClient();

  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [pokemonCount, setPokemonCount] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [pokemonList, setPokemonList] = useState<
    { name: string; sprite: string | null }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch total number of Pokémon once
  useEffect(() => {
    pokemonClientApi.listPokemons(0, 1).then((res) => {
      setPokemonCount(res.count);
    });
  }, []);

  // Fetch a page of Pokémon starting at current index
  useEffect(() => {
    const loadBatch = async () => {
      setLoading(true);
      try {
        const promises: Promise<any>[] = [];
        for (let i = 0; i < POKEMON_PER_PAGE; i++) {
          const id = startIndex + i + 1;
          if (id > pokemonCount) break;
          promises.push(pokemonClientApi.getPokemonById(id));
        }

        const results = await Promise.all(promises);
        const batch = results.map((res) => ({
          name: res.name,
          sprite: getBestSprite(res),
        }));

        setPokemonList(batch);
      } catch (err) {
        console.error('Error loading Pokémon:', err);
        setPokemonList([]);
      } finally {
        setLoading(false);
      }
    };

    if (pokemonCount > 0) {
      loadBatch();
    }
  }, [startIndex, pokemonCount]);

  const handleNext = () => {
    if (startIndex + POKEMON_PER_PAGE < pokemonCount) {
      setStartIndex((prev) => prev + POKEMON_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => Math.max(0, prev - POKEMON_PER_PAGE));
    }
  };

  const navigate = useNavigate();
  const handleCardClick = (name: string) => {
    navigate(`/view-pokemon/${name}`);
  };

  return (
    <div>
      <h1>Pokémon Grid</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemons">
          {pokemonList.map((pokemon) => (
            <div
              key={pokemon.name}
              className="pokemonCard"
              onClick={() => handleCardClick(pokemon.name)}
            >
              <h3>{pokemon.name}</h3>
              {pokemon.sprite ? (
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  loading="lazy"
                  style={{ objectFit: 'contain', height: "130px"}}
                />
              ) : (
                <p>Image not available</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="navigation">
        <button onClick={handlePrev} disabled={startIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={startIndex + POKEMON_PER_PAGE >= pokemonCount}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ViewPokemon;
