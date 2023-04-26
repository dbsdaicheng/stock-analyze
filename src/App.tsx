import * as React from 'react';
import Home from './pages/stockSelect';
import About from './pages/about';
import Layout from './layout';
import { Route, Routes, useLocation } from "react-router-dom"
import './App.css';

function App() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  return (
    <Routes>
      <Route path="/" element={<Layout />}> 
        <Route path="stock/select" element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
