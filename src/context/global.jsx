// React Hooks:
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// 創建了一個全域上下文對象，並將其賦值給 GlobalContext 變數。
const GlobalContext = createContext();

// base url
export const baseUrl = "https://api.jikan.moe/v4";

// 上下文提供者，其目的是將定義好的上下文 GlobalContext 中的值提供給其子元件。
export const GlobalContextProvider = ({ children }) => {
  // actions
  const LOADING = "LOADING";
  const SEARCH = "SEARCH";
  const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
  const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
  const GET_AIRING_ANIME = "GET_AIRING_ANIME";
  const GET_PICTURES = "GET_PICTURES";
  const IS_SEARCH = "IS_SEARCH";
  const IS_NOT_SEARCHING = "IS_NOT_SEARCHING";

  // reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case LOADING:
        return { ...state, loading: true };
      case GET_POPULAR_ANIME:
        return { ...state, popularAnime: action.payload, loading: false };
      case SEARCH:
        return { ...state, searchResults: action.payload, loading: false };
      case GET_UPCOMING_ANIME:
        return { ...state, upcomingAnime: action.payload, loading: false };
      case GET_AIRING_ANIME:
        return { ...state, airingAnime: action.payload, loading: false };
      case GET_PICTURES:
        return { ...state, pictures: action.payload, loading: false };
      case IS_SEARCH:
        return { ...state, isSearch: true };
      case IS_NOT_SEARCHING:
        return { ...state, isSearch: false };
      default:
        return state;
    }
  };

  // inital State
  const initalState = {
    popularAnime: [], // 熱門動畫
    upcomingAnime: [], // 即將上映的動畫
    airingAnime: [], // 正在播放的動畫
    pictures: [], // 圖片
    isSearch: false, // 是否在進行搜尋
    searchResults: [], // 搜尋結果
    loading: false, // 載入中
  };

  // 這裡的 state 是 initalState , 而 reducer 是  dispatch 嗎？

  const [state, dispatch] = useReducer(reducer, initalState);
  const [search, setSearch] = useState("");

  // handle change
  const handleChanges = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      dispatch({ IS_NOT_SEARCHING });
    }
  };

  // 不要直接針對屬性控制 , 透過 dispatch 操作
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search); // 異步函數
      dispatch({ type: IS_SEARCH });
    } else {
      dispatch({ type: IS_NOT_SEARCHING });
      alert("Please enter a search term");
    }
    setSearch("");
  };

  // 取得熱門動畫數據
  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
    dispatch({ type: IS_NOT_SEARCHING }); // switch searching
  };

  // 即將上映的動畫數據
  const getUpcomingAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
    const data = await response.json();
    dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
    dispatch({ type: IS_NOT_SEARCHING }); // switch searching
  };

  // 上映中的動畫數據
  const getAiringAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
    const data = await response.json();
    dispatch({ type: GET_AIRING_ANIME, payload: data.data });
    dispatch({ type: IS_NOT_SEARCHING }); // switch searching
  };

  // search anime
  const searchAnime = async (anime) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    dispatch({ type: SEARCH, payload: data.data });
  };

  // get anime pictures
  const getAnimePictures = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/characters/${id}/pictures`);
    const data = await response.json();
    dispatch({ type: GET_PICTURES, payload: data.data });
  };

  // initial render (load api )
  useEffect(() => {
    getPopularAnime();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        ...state, // useRedcer initState
        handleChanges,
        handleSubmit,
        searchAnime,
        search,
        getPopularAnime,
        getUpcomingAnime,
        getAiringAnime,
        getAnimePictures,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
