import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Grid } from '@mantine/core';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import '@src/style/auth.scss';

class AuthShell extends React.Component {
    render() {
        const AuthRoute = (
            <Routes>
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/*" element={<LoginPage/>} />
            </Routes>

        );
        return  <Grid  style={{height:'100%'}}>
                    <Grid.Col 
                        sm={6} offsetSm={3} 
                        md={6} offsetMd={3}
                        lg={4} offsetLg={4} 
                        className="vertical-flex-center">
                        <div className="auth-form-container">
                        {AuthRoute}
                        </div>
                    </Grid.Col>
                </Grid>;
    }
}
export default AuthShell;