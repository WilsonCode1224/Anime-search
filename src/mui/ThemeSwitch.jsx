import { Brightness4Outlined, WbSunnyOutlined } from "@mui/icons-material";
import {
  Paper,
  Switch,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";

// import WbSunnyIcon from "@mui/icons-material/WbSunny"; // 太陽圖示

function ThemeSwitch() {
  // 創建一個狀態來追蹤目前的模式（light/dark）
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 創建 light 和 dark 的主題
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // 切換模式的函數
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 根據目前的模式選擇使用哪個主題
  const selectedTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Paper elevation={3} style={{ padding: "10px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <WbSunnyOutlined style={{ color: isDarkMode ? "#fff" : "#ffd700" }} />
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            inputProps={{ "aria-label": "toggle dark mode" }}
          />
          <Brightness4Outlined
            style={{ color: isDarkMode ? "#ffd700" : "#fff" }}
          />
        </div>
        <Typography variant="body1">
          {isDarkMode ? "Dark Mode 開啟" : "Light Mode 開啟"}
        </Typography>
      </Paper>
    </ThemeProvider>
  );
}

export default ThemeSwitch;
