import React, { useState } from "react";
// components
import AnimatedList from "./AnimatedList";

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
) => [
  {
    label: "Popular",
    onClick: () => {
      setRendered("popular");
    },
    icon: <i className="fas fa-fire" />,
  },
  {
    label: "Airing",
    onClick: () => {
      setRendered("airing");
      getAiringAnime();
    },
  },
  {
    label: "Upcoming",
    onClick: () => {
      setRendered("upcoming");
      getUpcomingAnime();
    },
  },
];

function Homepage() {
  const {
    getPopularAnime,
    handleSubmit, // 處理搜索提交的函數，發送搜索請求並更新狀態。
    search, // ("") 保存搜尋輸入框的值
    handleChanges, // 處理輸入框變化的函數，同時更新 search 狀態。
    getUpcomingAnime, // 獲取即將上映的動畫的函數。
    getAiringAnime, // 獲取正在播放的動畫的函數。
  } = useGlobalContext();

  const [rendered, setRendered] = useState("popular");

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
            <div key={index} className={button.className}>
              <button onClick={button.onClick}>
                {button.icon}
                {button.label}
              </button>
            </div>
          ))}
        </div>
      </header>

      <AnimatedList rendered={rendered} />
    </HomepageStyled>
  );
}

const HomepageStyled = styled.div`
  background-color: #ededed;
  header {
    padding: 2rem 5rem;
    width: 60%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;
    @media screen and (max-width: 1530px) {
      width: 95%;
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
`;

export default Homepage;
