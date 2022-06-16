import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@src/components/Home';
import App from '@src/components/App';
import AuthShell from '@src/components/auth/AuthShell';

import '@src/style/common.scss';
import '@src/style/mantine.scss';

const dashboardRoute = (
    <BrowserRouter>
        <Routes>
            <Route path="/auth*" element={<AuthShell/>} />
            <Route path="/app" element={<App/>} />
            <Route path="/" element={<Home/>} />
        </Routes>
    </BrowserRouter>  
);

const root = createRoot(document.getElementById('app'));
root.render(dashboardRoute);
