import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PropTypes, { arrayOf } from 'prop-types'
import './App.css'
import pokemon from './pokemon.json'

const PokemonRow = ({pokemon}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
  </tr>
);

PokemonRow.PropTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  }),
};

function App() {
  const [filter, setFilter] = React.useState("");
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
                  <PokemonRow pokemon={pokemon} key={pokemon.id}/>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
