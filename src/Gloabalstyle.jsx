import { createGlobalStyle } from "styled-components";

// 設定類似 index.css 這種全局屬性
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Montserrat:wght@300&family=Mooli&family=Noto+Sans+Avestan&family=Noto+Sans+TC&family=Open+Sans:wght@400;600&family=Playfair+Display:wght@400;600&family=Poppins:wght@200;300;400&family=Reem+Kufi:wght@400;500;600;700&family=Roboto&family=Zen+Maru+Gothic&display=swap');
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        font-family:  'Inter' , sans-serif;
    }


    body{
        color: #6c7983;
        font-size: 1.2rem;
        &::-webkit-scrollbar{
            width: 7px;
        }
        &::-webkit-scrollbar-thumb{
            background-color: #27AE60;
            border-radius: 10px;
        }
        &::-webkit-scrollbar-track{
            background-color: #EDEDED;
        }


    }


`;

export default GlobalStyle; // 導出這個檔案
