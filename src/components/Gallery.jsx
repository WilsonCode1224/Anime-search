// Hooks
import React, { useEffect, useState } from "react";
// rrds
import { Link, useParams } from "react-router-dom";
// styled-components
import styled from "styled-components";
// useContext
import { useGlobalContext } from "../context/global";

// 畫廊
function Gallery() {
  const { getAnimePictures, pictures } = useGlobalContext();
  const { id } = useParams();

  const [index, setIndex] = useState(0);
  const handleImageClick = (i) => {
    setIndex(i);
  };

  // user 點擊角色以後，組件渲染完，會執行一次這個 useEffect , 後續會根據切換角色才更改其 id 在觸發一次取得 getAnimePictures(id)

  useEffect(() => {
    getAnimePictures(id); // 非同步函數
  }, [id]);

  return (
    <GalleryStyled>
      <div className="back">
        <Link to="/">
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </Link>
      </div>
      {/* 大圖顯示  */}
      <div className="big-image">
        <img src={pictures[index]?.jpg.image_url} alt="" />
      </div>
      {/* 大圖顯示 */}

      {/* 小圖點擊區 */}
      <div className="small-images">
        {/* pictures 是一個圖片陣列， */}
        {pictures?.map((picture, i) => {
          return (
            <div
              className="image-con"
              onClick={() => handleImageClick(i)}
              key={i}
            >
              <img
                src={picture.jpg.image_url}
                style={{
                  border: i === index ? "3px solid #27AE60" : "3px solid #000",
                  filter: i === index ? "grayscale(0)" : "grayscale(60%)",
                  transform: i === index ? "scale(1.1)" : "scale(1)",
                  transition: "all .3s ease-in-out",
                }}
                alt=""
              />
            </div>
          );
        })}
      </div>
      {/* 小圖點擊區 */}
    </GalleryStyled>
  );
}

const GalleryStyled = styled.div`
  background-color: #ededed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .back {
    position: absolute;
    top: 2rem;
    left: 2rem;
    a {
      font-weight: 600;
      text-decoration: none;
      color: #eb5757;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
  .big-image {
    display: inline-block;
    padding: 2rem;
    margin: 2rem 0;
    background-color: #fff;
    border-radius: 7px;
    border: 5px solid #e5e7eb;
    position: relative;
    img {
      width: 350px;
    }
  }

  .small-images {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 80%;
    padding: 2rem;
    border-radius: 7px;
    background-color: #fff;
    border: 5px solid #e5e7eb;
    img {
      width: 6rem;
      height: 6rem;
      object-fit: cover;
      cursor: pointer;
      border-radius: 5px;
      border: 3px solid #e5e7eb;
    }
  }
`;

export default Gallery;
