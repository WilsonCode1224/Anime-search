# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

2023 / 11 / 21 , 修正 Bug:

使用者在搜尋動漫以後，無法透過 Buttons 去切換對應的動畫數據載入。

2023 / 11 / 23 , 修改 & 新增:

- 新增了右下方的進階搜尋圖示'Setting'
- 該功能可以產生更多搜尋的部分。
- 是的，MorePopular.jsx 終於可以產生熱門動畫的分類了! --- 撒花

2023 / 11 / 25 , 修改 & 新增:

- 除錯，目前可以藉由點擊分類路由，關閉 AnimatedList
- 除錯，目前可以藉由點擊分類路由，開啟 MorePopular，並且根據這些路由對應的 'click' 顯示對應分類。
- UI 待整理。

2023 / 11 / 27 , 修改 & 新增:
