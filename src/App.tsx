import * as React from 'react';
import Home from './pages/stockSelect';
import About from './pages/about';
import Layout from './layout';
import { Route, Routes } from "react-router-dom"
import './App.css';
import Login from './pages/login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}> 
        <Route path="stock/select" element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
      </Route>
      <Route path="login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
