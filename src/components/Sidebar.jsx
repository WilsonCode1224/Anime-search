import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/global";
import { Link } from "react-router-dom";

const RANK = 10;

function Sidebar() {
  const { popularAnime } = useGlobalContext();

  // 關於 sort , b-a 是 降序 a-b 是 升序 ?
  const sorted = popularAnime?.sort((a, b) => {
    return b.score - a.score;
  });

  return (
    <SidebarStyled>
      <div className="hide-sidebar">
        <h3>Top {RANK} Popular</h3>
        <div className="anime">
          {/* .slice 提取到索引 3 之前的元素 - 0~4 */}
          {sorted?.slice(0, RANK).map((anime) => {
            return (
              <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                <img src={anime.images.jpg.large_image_url} alt="" />
                <h5>{anime.title}</h5>
              </Link>
            );
          })}
        </div>
      </div>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.div`
  margin-top: 2rem;
  background-color: #fff;
  border-top: 5px solid #e5e7eb;
  padding-right: 5rem;
  padding-left: 2rem;
  padding-top: 2rem;

  @media (max-width: 390px) {
    padding-right: 0; // 調整在小尺寸下的 padding
  }

  .anime {
    display: flex;
    flex-direction: column;
    width: 150px;
    img {
      width: 100%;
      border-radius: 5px;
      border: 5px solid #e5e7eb;
    }
    a {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      color: #27ae60;
      h4 {
        font-size: 1.1rem;
      }
    }
  }
  @media ((max-width: 390px)) {
    .hide-sidebar {
      display: none;
    }
  }
`;

export default Sidebar;
