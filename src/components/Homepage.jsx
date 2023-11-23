import React, { useState } from "react";
// components
import AnimatedList from "./AnimatedList";
// context
import { useGlobalContext } from "../context/global";
// styled components
import styled from "styled-components";
// rrds
import { Link } from "react-router-dom";
// MUI
import SettingsIcon from "@mui/icons-material/Settings";

// Header Button
const HeaderButtons = (setRendered, getAiringAnime, getUpcomingAnime) => [
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
  {
    label: <Link to="/search">Advanced search</Link>,
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
    openSetting, // 打開樣版的 State
    setOpenSetting, // 打開樣版的 setState
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
      <Link>
        <FixedSettingsIcon
          style={{ width: "40px", height: "40px" }}
          onClick={() => setOpenSetting(!openSetting)}
        />
      </Link>
      <AnimatedList rendered={rendered} />

      {openSetting && <SettingPanel>Search More</SettingPanel>}
    </HomepageStyled>
  );
}

const SettingPanel = styled.div`
  padding-top: 10px;
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 30%;
  background-color: rgba(0, 0, 0, 0.5); /* 這裡的 0.5 表示透明度為 50% 的黑色 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  color: #fff;
  font-size: 20px;
`;

const HomepageStyled = styled.div`
  background-color: #ededed;
  header {
    background-color: #004466;
    padding: 2rem 5rem;
    width: 60%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;
    @media screen and (max-width: 1530px) {
      width: 95%;
    }

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
`;

const FixedSettingsIcon = styled(SettingsIcon)`
  color: #00ff2a;
  cursor: pointer;
  position: fixed;
  bottom: 10px; /* 距離底部的距離 */
  right: 10px; /* 距離右側的距離 */

  &:hover {
    transition: all 0.8s;
    color: #004466; /* 在 hover 時的顏色 */
    /* 可以添加其他 hover 時的樣式 */
  }
`;

export default Homepage;
