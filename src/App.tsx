import React from "react";
import Router from "./Router";
import { GlobalStyle, theme, darkTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { ThemeProvider } from "styled-components";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <ThemeProvider theme={isDark ? darkTheme : theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
