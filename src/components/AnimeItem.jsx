import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { baseUrl } from "../context/global";

function AnimeItem() {
  // 參數
  const { id } = useParams();

  const [anime, setAnime] = useState({}); // 存儲當前動畫的詳細信息，包括標題、描述、相關圖片、評分等。
  const [characters, setCharacters] = useState([]); // 角色
  const [showMore, setShowMore] = useState(false); // 展開與收合說明

  const {
    title, // 動畫標題
    synopsis, // 動畫簡介
    trailer, // 動畫預告片
    duration, // 播放時長
    aired, // 播放日期
    season, // 播放季節
    images, // 相關圖片
    rank, // 排名
    score, // 評分
    scored_by, // 評分人數
    popularity, // 受歡迎程度
    status, // 動畫狀態（例如正在播放、已完結等）
    rating, // 年齡分級
    source, // 原作來源（例如漫畫、小說等）
  } = anime || {};

  const detailsData = [
    { label: "Aired", data: aired?.string },
    { label: "Rating", data: rating },
    { label: "Rank", data: rank },
    { label: "Score", data: score },
    { label: "Scored By", data: scored_by },
    { label: "Popularity", data: popularity },
    { label: "Status", data: status },
    { label: "Source", data: source },
    { label: "Season", data: season },
    { label: "Duration", data: duration },
  ];

  // 取得動畫相關資料
  const getAnime = async (anime) => {
    const response = await fetch(`${baseUrl}/anime/${anime}`);
    const data = await response.json();
    setAnime(data.data); // 透過這行，我把我的 anime state , 設置 data.data
  };

  //get characters
  const getCharacters = async (anime) => {
    const response = await fetch(`${baseUrl}/anime/${anime}/characters`);
    const data = await response.json();
    setCharacters(data.data);
  };

  // initial render -> 切換頁面時，再一次調用這兩個函數來取得資料。
  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, []);

  return (
    <AnimeItemStyled>
      <h1>{title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            <img src={images?.jpg.large_image_url} alt="" />
          </div>
          <div className="anime-details">
            {detailsData.map((detail, index) => (
              <p key={index}>
                <span>{detail.label}</span>
                <span>{detail.data}</span>
              </p>
            ))}
          </div>
        </div>

        <p className="description">
          {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
          <button
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            {showMore ? "Show Less" : "Read More"}
          </button>
        </p>
      </div>

      <h3 className="title">Trailer</h3>
      <div className="trailer-con">
        {trailer?.embed_url ? (
          <iframe
            src={trailer?.embed_url}
            title="Inline Frame Example"
            width="800"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <h3>Trailer not available</h3>
        )}
      </div>

      <h3 className="title">Characters</h3>
      <div className="characters">
        {characters?.map((character, index) => {
          const { role } = character; // 解構角色屬性。
          const { images, name, mal_id } = character.character; // 解構一些圖片的訊息
          return (
            <Link to={`/character/${mal_id}`} key={index}>
              <div className="character">
                <img src={images?.jpg.image_url} alt="" />
                <h4>{name}</h4>
                <p>{role}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </AnimeItemStyled>
  );
}

const AnimeItemStyled = styled.div`
  padding: 3rem 18rem;
  background-color: #ededed;
  h1 {
    display: inline-block;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.4s ease-in-out;
    &:hover {
      transform: skew(-3deg);
    }
  }
  .title {
    display: inline-block;
    margin: 3rem 0;
    font-size: 2rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7 23%, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    margin-top: 2rem;
    color: #6c7983;
    line-height: 1.7rem;
    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #27ae60;
      font-weight: 600;
    }
  }

  .trailer-con {
    display: flex;
    justify-content: center;
    align-items: center;
    iframe {
      outline: none;
      border: 5px solid #e5e7eb;
      padding: 1.5rem;
      border-radius: 10px;
      background-color: #ffffff;
    }
  }

  .details {
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid #e5e7eb;
    .detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      img {
        border-radius: 7px;
      }
    }
    .anime-details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        display: flex;
        gap: 1rem;
      }
      p span:first-child {
        font-weight: 600;
        color: #454e56;
      }
    }
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    padding: 2rem;
    border-radius: 20px;
    border: 5px solid #e5e7eb;
    .character {
      padding: 0.4rem 0.6rem;
      border-radius: 7px;
      background-color: #ededed;
      transition: all 0.4s ease-in-out;
      img {
        width: 100%;
      }
      h4 {
        padding: 0.5rem 0;
        color: #454e56;
      }
      p {
        color: #27ae60;
      }
      &:hover {
        transform: translateY(-5px);
      }
    }
  }
`;

export default AnimeItem;
