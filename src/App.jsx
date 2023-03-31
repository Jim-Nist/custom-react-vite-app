import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import propTypes, { arrayOf } from 'prop-types'
import './App.css'
import pokemon from './pokemon.json'

const PokemonRow = ({pokemon, onSelect}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button
        onClick={() => onSelect(pokemon)}
      >
        Select!
      </button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: propTypes.shape({
    name: propTypes.shape({
      english: propTypes.string,
    }),
    type: propTypes.arrayOf(propTypes.string),
    onSelect: propTypes.func,
  }),
};

const PokemonInfo = ({name, base}) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
    </table>
  </div>
);

PokemonInfo.propTypes = {
    name: propTypes.shape({
      english: propTypes.string,
    base: propTypes.shape({
      HP: propTypes.number.isRequired,
      Attack: propTypes.number.isRequired,
      Defense: propTypes.number.isRequired,
      "Sp. Attack": propTypes.number.isRequired,
      "Sp. Defense": propTypes.number.isRequired,
      Speed: propTypes.number.isRequired,
    })
  }),
};

function App() {
  const [filter, setFilter] = React.useState("");
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);
  return (
    <div
      style={{
        margin: "auto",
        width: 800 ,
        paddingTop: "1rem",
      }}
      >
      <h1 className='title'>Pokemon Search</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          columnGap: "1rem",
        }}
      >
        <div>
          <input
            value={filter}
            onChange={(evt) => setFilter(evt.target.value)}
          />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) => 
                  pokemon.name.english.toLowerCase().includes(filter.toLowerCase())
                )
                .slice(0,20)
                .map(pokemon => (
                  <PokemonRow 
                    pokemon={pokemon} 
                    key={pokemon.id} 
                    onSelect={(pokemon) => setSelectedPokemon(pokemon)}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
        {selectedPokemon && <PokemonInfo {...selectedPokemon}/>}
      </div>
    </div>
  )
}

export default App
