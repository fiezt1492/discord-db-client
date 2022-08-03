import "./App.css";
import {
  ThemeProvider,
  ColorModeProvider,
  theme,
  CSSReset,
} from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage, DashboardPage, MenuPage } from "./pages";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/guilds" element={<MenuPage />} />
          <Route exact path="/guilds/:id" element={<DashboardPage />} />
          <Route exact path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
