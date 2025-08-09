import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PokemonClient } from 'pokenode-ts';

function PokemonCard() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<any>(null);
  const [pokemonAbilities, setPokemonAbilities] = useState<string[]>([]);
  const [flavorText, setFlavorText] = useState<string>("");

  // helpers: clean text + pick a modern English entry first


  useEffect(() => {
    const fetchPokemon = async () => {
      if (!name) return;
      const client = new PokemonClient();
      try {
        const data = await client.getPokemonByName(name);
        console.log(data);
        setPokemon(data);
        setPokemonAbilities(data.abilities.map((a: any) => a.ability.name));

        // fetch species for flavor text
      } catch (err) {
        console.error("Failed to fetch Pokémon:", err);
      }
    };
    fetchPokemon();
  }, [name]);

  if (!pokemon) return <p>Loading Pokémon...</p>;

  return (
    <>
      <button onClick={() => navigate('/view-pokemon')}>back to list</button>
      <div className="pokemonDetailCard fade-in">
        <div className="pokeImage">
          <img
            src={pokemon?.sprites?.other?.['official-artwork']?.front_default ??
              pokemon?.sprites?.front_default ??
              ''
            }
            alt={pokemon.name}
            style={{ height: "150px", position: "relative", objectFit: "contain" }}
          />
        </div>

        <h2 style={{ color: "white", marginBottom: ".25rem" }}>
          {pokemon.name.toUpperCase()}
        </h2>

        {/* Pokédex-style flavor text */}
        <p className="flavor" style={{
          color: "white",
          fontStyle: "italic",
          lineHeight: 1.3,
          margin: "0 0 1rem",
          textAlign: "center"
        }}>
          {flavorText}
        </p>

        <div className="section1">
          <div style={{ margin: "-2rem 0 0 0" }}>
            <h4 style={{ textDecoration: "underline" }}>Stats</h4>
            <p>Height: {Math.floor(pokemon.height * .328)} ft</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Base experience: {pokemon.base_experience}</p>
            <p>HP: {pokemon.stats.find((s: any) => s.stat.name === "hp")?.base_stat}</p>
          </div>

          <div className='abilities'>
            <h4 style={{ textDecoration: "underline" }}>Abilities</h4>
            <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
              {pokemonAbilities.map((ability, index) => (
                <li key={index}>{ability}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative corner squares */}
        <div className="corner top-left" />
        <div className="corner top-right" />
        <div className="corner bottom-left" />
        <div className="corner bottom-right" />
      </div>
    </>
  );
}

export default PokemonCard;
