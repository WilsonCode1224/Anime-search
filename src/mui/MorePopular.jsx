// Hooks
import React, { useState, useEffect } from "react";
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
// rrd
import { Link } from "react-router-dom";
// useContext
import { useGlobalContext } from "../context/global";

// function
function MorePopular({ selectedCategory }) {
  const { popularAnime, airingAnime, upcomingAnime } = useGlobalContext();
  const [selectedAnime, setSelectedAnime] = useState([]); // 儲存過濾後的動漫資料。
  const [currentDataSource, setCurrentDataSource] = useState(popularAnime); //
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    switch (selectedCategory) {
      case "popular":
        setCurrentDataSource(popularAnime);
        setCategoryTitle("Popular Anime");
        break;
      case "airing":
        setCurrentDataSource(airingAnime);
        setCategoryTitle("Airing Anime");
        break;
      case "upcoming":
        setCurrentDataSource(upcomingAnime);
        setCategoryTitle("Upcoming Anime");
        break;
      default:
        setCurrentDataSource(popularAnime);
        setCategoryTitle("Popular Anime");
        break;
    }
  }, [selectedCategory, popularAnime, airingAnime, upcomingAnime]);

  const allGenres = currentDataSource.reduce((acc, anime) => {
    return acc.concat(anime.genres.map((genre) => genre.name));
  }, []);

  const uniqueGenres = Array.from(new Set(allGenres));

  const handleCategoryClick = (category) => {
    const matchingAnime = currentDataSource.filter((anime) =>
      anime.genres.map((genre) => genre.name).includes(category)
    );
    setSelectedAnime(matchingAnime);
  };

  return (
    <SearchStyled>
      <FormControl style={{ color: "#000" }}>
        <FormLabel id="demo-radio-buttons-group-label">
          <PopularTitle>{`進階搜索： ${categoryTitle}`}</PopularTitle>
        </FormLabel>
        <RadioGroup
          style={{
            display: "flex",
            flexDirection: "row",
          }}
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

const PopularTitle = styled.h3`
  text-align: center;
  color: #ff4500;
  font-size: 1.5em;
  font-weight: bold;
  padding-top: 10px;
  margin-bottom: 10px;
`;

const SearchStyled = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 20px;
  z-index: 1;

  .anime-data {
    justify-content: space-around;
    align-items: flex-start;
    gap: 20px;
    a {
      display: inline-block;
      text-decoration: none;
      color: #000;

      div {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
        max-width: 300px;
        margin-bottom: 10px;

        h2 {
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 2;
        }

        img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }
      }
    }
  }

  @media (max-width: 390px) {
    .anime-data {
      width: 100%;
    }
  }
`;

export default MorePopular;
