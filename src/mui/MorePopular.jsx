import React, { useState } from "react";
// MUI
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
// styled
import styled from "styled-components";

// context
import { useGlobalContext, baseUrl } from "../context/global";
// rrds
import { Link, useParams } from "react-router-dom";

function MorePopular() {
  const { popularAnime } = useGlobalContext();
  const [selectedAnime, setSelectedAnime] = useState([]);

  const allGenres = popularAnime.flatMap((anime) =>
    anime.genres.map((genre) => genre.name)
  );

  const uniqueGenres = Array.from(new Set(allGenres));

  const handleCategoryClick = (category) => {
    const matchingAnime = popularAnime.filter((anime) =>
      anime.genres.map((genre) => genre.name).includes(category)
    );

    setSelectedAnime(matchingAnime);
  };

  return (
    <SearchStyled>
      <FormControl style={{ color: "#000" }}>
        <FormLabel id="demo-radio-buttons-group-label">
          進階搜索： popularA category
        </FormLabel>
        <RadioGroup
          style={{ display: "flex", flexDirection: "row" }}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {uniqueGenres.map((genre) => (
            <FormControlLabel
              key={genre}
              value={genre.toLowerCase()}
              control={<Radio />}
              label={genre}
              onClick={() => handleCategoryClick(genre)}
            />
          ))}
        </RadioGroup>
        <div>
          <div className="anime-data">
            {selectedAnime?.map((anime, index) => (
              <Link to={`/anime/${anime.mal_id}`} key={index}>
                <div>
                  <h2>{anime.title}</h2>
                  <img
                    src={anime.images?.jpg.large_image_url}
                    alt={anime.title}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </FormControl>
    </SearchStyled>
  );
}

const SearchStyled = styled.div`
  /*  */
`;

export default MorePopular;
