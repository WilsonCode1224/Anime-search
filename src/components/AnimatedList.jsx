// styled-components
import styled from "styled-components";
// rrds
import { Link } from "react-router-dom";
//
import Sidebar from "./Sidebar";
// get Context data
import { useGlobalContext } from "../context/global";

// Hooks

function AnimatedList({ rendered }) {
  const { popularAnime, airingAnime, upcomingAnime, isSearch, searchResults } =
    useGlobalContext();

  const getAnimeData = (rendered) => {
    switch (rendered) {
      case "popular":
        return popularAnime;

      case "airing":
        return airingAnime;

      case "upcoming":
        return upcomingAnime;

      default:
        return popularAnime;
    }
  };

  const animeList = isSearch ? searchResults : getAnimeData(rendered);

  return (
    <ListStyled className={`anime-list ${rendered}`}>
      <div className="anime-list">
        {animeList?.map((anime) => (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img
              className="anime-picture"
              src={anime.images.jpg.large_image_url}
              alt=""
            />
          </Link>
        ))}
      </div>
      <Sidebar />
    </ListStyled>
  );
}

const ListStyled = styled.div`
  display: flex;
  .anime-list {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 5rem;
    padding-right: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    border-top: 5px solid #e5e7eb;
    a {
      height: 500px;
      border-radius: 7px;
      border: 5px solid #e5e7eb;
    }
    a img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  // 共享樣式 (日後有需求再用吧)
  &.popular {
    // 可以在這裡添加 Popular 頁面特有的樣式，如果有的話
  }

  &.airing {
    // 可以在這裡添加 Airing 頁面特有的樣式，如果有的話
  }

  &.upcoming {
    // 可以在這裡添加 Upcoming 頁面特有的樣式，如果有的話
  }
`;
export default AnimatedList;
