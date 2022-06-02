import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import App from './components/App';

const dashboardRoute = (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/app" element={<App/>} />
      </Routes>
    </BrowserRouter>
    
);

const root = createRoot(document.getElementById('root'));
root.render(dashboardRoute);