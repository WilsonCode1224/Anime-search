// 此區塊為邏輯保存區塊

{
  /* --------- Popular --------- */
}
<div className="filter-btn popular-filter">
  <button
    onClick={() => {
      // 點擊以後使 state 變換為 popular case ，可以渲染 < />
      setRendered("popular");
    }}
  >
    Popular
    <i className="fas fa-fire" />
  </button>
</div>;
{
  /* --------- Popular --------- */
}
{
  /* ---------Airing--------- */
}
<div className="filter-btn ">
  <button
    onClick={() => {
      setRendered("airing");
      getAiringAnime(); // 向 Context 請求其資料
    }}
  >
    Airing
  </button>
</div>;
{
  /* ---------Airing--------- */
}
{
  /* ---------Upcoming--------- */
}
<div className="filter-btn upcoming-filter">
  <button
    onClick={() => {
      setRendered("upcoming");
      getUpcomingAnime(); // 向 Context 請求其資料
    }}
  >
    Upcoming
  </button>
</div>;
{
  /* ---------Upcoming--------- */
}

// anime-details

<div className="anime-details">
  <p>
    <span>Aired:</span>
    <span>{aired?.string}</span>
  </p>
  <p>
    <span>Rating:</span>
    <span>{rating}</span>
  </p>
  <p>
    <span>Rank:</span>
    <span>{rank}</span>
  </p>
  <p>
    <span>Score:</span>
    <span>{score}</span>
  </p>
  <p>
    <span>Scored By:</span>
    <span>{scored_by}</span>
  </p>
  <p>
    <span>Popularity:</span>
    <span>{popularity}</span>
  </p>
  <p>
    <span>Status:</span>
    <span>{status}</span>
  </p>
  <p>
    <span>Source:</span>
    <span>{source}</span>
  </p>
  <p>
    <span>Season:</span>
    <span>{season}</span>
  </p>
  <p>
    <span>Duration:</span>
    <span>{duration}</span>
  </p>
</div>;

// render code

if (!isSearch && rendered === "upcoming") {
  return upcomingAnime?.map((anime) => {
    return (
      <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
        <img src={anime.images.jpg.large_image_url} alt="" />
      </Link>
    );
  });
} else {
  return searchResults?.map((anime) => {
    return (
      <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
        <img src={anime.images.jpg.large_image_url} alt="" />
      </Link>
    );
  });
}
