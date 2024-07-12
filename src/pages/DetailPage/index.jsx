import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const params = useParams();
  const pokemonId = params.id;

  useEffect(() => {
    fetchPokemonData();
  }, []);

  async function fetchPokemonData() {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    try {
      const { data: pokemonData } = await axios.get(url);
      console.log(pokemonData);
    } catch (error) {
      console.error(error);
    }
  }
  return <div>DetailPage</div>;
};

export default DetailPage;
