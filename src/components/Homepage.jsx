import React, { useState } from "react";
// components
import AnimatedList from "./AnimatedList";
import SearchMore from "./SearchMore";
// loadMore
import MorePopular from "../mui/MorePopular";
// context
import { useGlobalContext } from "../context/global";
// styled components
import styled from "styled-components";

// Header Button

const HeaderButtons = (
  setRendered,
  getAiringAnime,
  getUpcomingAnime
  // getPopularAnime
) => {
  const { setShowAnimatedList } = useGlobalContext();

  return [
    {
      label: "Popular",
      onClick: () => {
        setRendered("popular");
        setShowAnimatedList(true);
      },
      icon: <i className="fas fa-fire" />,
    },
    {
      label: "Airing",
      onClick: () => {
        setRendered("airing");
        getAiringAnime();
        setShowAnimatedList(true);
      },
    },
    {
      label: "Upcoming",
      onClick: () => {
        setRendered("upcoming");
        getUpcomingAnime();
        setShowAnimatedList(true);
      },
    },
  ];
};

function Homepage() {
  const {
    handleSubmit, // 處理搜索提交的函數，發送搜索請求並更新狀態。
    search, // ("") 保存搜尋輸入框的值
    handleChanges, // 處理輸入框變化的函數，同時更新 search 狀態。
    getPopularAnime, // 取得熱門動畫
    getUpcomingAnime, // 獲取即將上映的動畫的函數。
    getAiringAnime, // 獲取正在播放的動畫的函數。
    showAnimatedList, // true <> false
  } = useGlobalContext();

  // Page State:
  const [rendered, setRendered] = useState("popular");
  const [showMorePopular, setShowMorePopular] = useState(false); // 更多分類狀態
  const [selectedCategory, setSelectedCategory] = useState(null); // 這邊是 SearchMore 的部分

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const title =
    rendered === "popular"
      ? "Popular Anime"
      : rendered === "airing"
      ? "Airing Anime"
      : "Upcoming Anime";

  const buttons = HeaderButtons(
    setRendered,
    getAiringAnime,
    getUpcomingAnime,
    getPopularAnime
  );

  return (
    <HomepageStyled>
      <header>
        <div className="logo">
          <h1>{title}</h1>
        </div>
        <div className="search-container">
          <form action="" className="search-form" onSubmit={handleSubmit}>
            <div className="input-control">
              <input
                type="text"
                placeholder="Search Anime"
                value={search}
                onChange={handleChanges}
              />
              <button type="submit">Search</button>
            </div>
          </form>

          {buttons.map((button, index) => (
            <div key={index}>
              <button className="phone-size" onClick={button.onClick}>
                {button.icon}
                {button.label}
              </button>
            </div>
          ))}
        </div>
      </header>
      <SearchMore
        setShowMorePopular={setShowMorePopular}
        handleCategoryClick={handleCategoryClick}
      />
      <AnimatedList rendered={rendered} showAnimatedList={showAnimatedList} />
      {showMorePopular && <MorePopular selectedCategory={selectedCategory} />}
    </HomepageStyled>
  );
}

const HomepageStyled = styled.div`
  background-color: #ededed;
  header {
    display: block;
    background-color: #004466;
    padding: 2rem 5rem;
    width: 60%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;
    width: 100%;

    h1 {
      color: #fff;
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .search-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      button {
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        outline: none;
        border-radius: 30px;
        font-size: 1.2rem;
        background-color: #fff;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        font-family: inherit;
        border: 5px solid #e5e7eb;
      }

      form {
        position: relative;
        width: 100%;
        .input-control {
          position: relative;
          transition: all 0.4s ease-in-out;
        }
        .input-control input {
          color: red;
          width: 100%;
          padding: 0.7rem 1rem;
          border: none;
          outline: none;
          border-radius: 30px;
          font-size: 1.2rem;
          background-color: #fff;
          border: 5px solid #e5e7eb;
          transition: all 0.4s ease-in-out;
        }
        .input-control button {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }

  @media (max-width: 390px) {
    header {
      padding: 0;
    }

    .search-container {
      display: flex;
      flex-direction: column;
      width: 100%;

      /* button.phone-size {
        display: inline-block;
        width: 100%;
      } */
    }
  }
`;

export default Homepage;
