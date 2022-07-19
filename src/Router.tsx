import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ToDoList from "./components/TodoList";
import Footer from "./components/Footer";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToDoList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
