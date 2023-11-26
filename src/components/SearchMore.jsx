// useContext
import { useGlobalContext } from "../context/global";
// rrds
import { Link } from "react-router-dom";
// MUI
import SettingsIcon from "@mui/icons-material/Settings";
// import SearchIcon from "@mui/icons-material/Search";
// styled
import styled from "styled-components";

function SearchMore({ setShowMorePopular, handleCategoryClick }) {
  // 進階搜尋面板資料
  const SearchText = [
    {
      showText: "SearchMore Popular",
      action: "getPopularAnime",
    },
    {
      showText: "SearchMore Aircoming",
      action: "getAiringAnime",
    },
    {
      showText: "SearchMore Upcoming",
      action: "getUpcomingAnime",
    },
  ];

  const {
    openSetting, // 打開樣版的 State
    setOpenSetting, // 打開樣版的 setState
    getPopularAnime,
    getAiringAnime, // 取得上映動畫之函數
    getUpcomingAnime, // 取得即將上映的動畫之函數
    setShowAnimatedList,
  } = useGlobalContext();

  const handleLinkClick = (action) => {
    // 根據點擊的連結，調用相應的函數
    switch (action) {
      case "getPopularAnime":
        // 這邊暫時不設置任何東西，因為熱門動畫會在一開始就載入。
        getPopularAnime();
        handleCategoryClick("popular"); // 告之父元素，現在做了哪些事？
        break;
      case "getAiringAnime":
        getAiringAnime();
        handleCategoryClick("airing"); // 告之父元素，現在做了哪些事？
        break;
      case "getUpcomingAnime":
        getUpcomingAnime();
        handleCategoryClick("upcoming"); // 告之父元素，現在做了哪些事？
        break;
      default:
        console.log("default case!");
        break;
    }
    setOpenSetting(!openSetting); // 關閉樣版
    setShowAnimatedList(false); // 更新 AnimatedList 為 false (這是 Context 的 state)
    setShowMorePopular(true);
  };

  // JSX
  return (
    <>
      <Link>
        <FixedSettingsIcon
          style={{ width: "40px", height: "40px" }}
          onClick={() => setOpenSetting(!openSetting)}
        />
      </Link>

      {openSetting && (
        <SettingPanel>
          <SearchTitle>
            Search More Anime
            {/* <SearchIcon className="search-icon" /> */}
          </SearchTitle>
          <ShowText>
            {SearchText.map((item, index) => (
              <div key={index}>
                <Link to="#" onClick={() => handleLinkClick(item.action)}>
                  {item.showText}
                </Link>
              </div>
            ))}
          </ShowText>
        </SettingPanel>
      )}
    </>
  );
}

export default SearchMore;

const SearchTitle = styled.h2`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SettingPanel = styled.div`
  padding-top: 10px;
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 30%;
  background-color: rgba(0, 0, 0, 0.9); /* 這裡的 0.5 表示透明度為 50% 的黑色 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 19999;
  color: #fff;
  font-size: 20px;

  @media (max-width: 390px) {
    width: 70%;
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

const ShowText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    display: inline-block;
    padding-top: 15px;
    color: #fff;
  }
`;
