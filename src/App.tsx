import * as React from 'react';
import StockSelect from './pages/stockSelect';
import About from './pages/about';
import Home from './pages/home';
import Strategy from './pages/strategy';
import Layout from './layout';
import { Route, Routes } from "react-router-dom"
import './App.css';
import Login from './pages/login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}> 
        <Route path="stock/select" element={<StockSelect />}></Route>
        <Route path="stock/strategy" element={<Strategy />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Route>
      <Route path="login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
