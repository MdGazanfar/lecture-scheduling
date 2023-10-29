import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axios from '../utils/axios';
import { persistToken } from '../utils/localStorage';
import { notificationController } from '../utils/toast';

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const data = {
            name: username,
            password: password
        }
        return axios.post('user/login', data)
            .then((res) => {
                const token = res.data.token
                persistToken(token)
                notificationController.success('Login Successfully')
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            })
            .catch((error) => {
                notificationController.error(error.response.data.message)
            });
    };

    return (
        <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={10} sm={6} md={4} lg={3}>
                <Paper elevation={3} style={{ padding: 20 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Login
                    </Typography>
                    <form>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => handleLogin()}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid >
    );
};

export default Login;
