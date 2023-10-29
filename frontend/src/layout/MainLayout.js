import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Drawer, List, ListItem, Container, Typography } from '@mui/material';
import { readUserData } from '../utils/localStorage';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {

    const navigate = useNavigate();
    const [activeRoute, setActiveRoute] = useState('')

    const type = readUserData()

    const handleRedirection = (route) => {
        if (route === 'dashboard') {
            navigate('/')
            setActiveRoute('dashboard')
        }
        if (route === 'users') {
            navigate('/users')
            setActiveRoute('users')
        }
        if (route === 'courses') {
            navigate('/courses')
            setActiveRoute('courses')
        }
        if (route === 'lectures') {
            navigate('/lectures')
            setActiveRoute('lectures')
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                anchor="left"
                style={{ width: '15%', color: '#000' }}
            >
                <List style={{ color: '#1E1E2C', background: '#7DA0FA', height: '100%', cursor: 'pointer' }}>
                    <ListItem>
                        <Typography variant='h5' style={{ marginBottom: '10px', color: '#FFF' }}>
                            Lecture Schedule
                        </Typography>
                    </ListItem>
                    <ListItem onClick={() => handleRedirection('dashboard')} >
                        <Typography style={{ fontSize: '18px', color: activeRoute === 'dashboard' ? '#FFF' : '#1E1E2C' }}>
                            Dashboard
                        </Typography>
                    </ListItem>
                    {
                        type === 'admin' ?
                            <ListItem onClick={() => handleRedirection('users')} >
                                <Typography style={{ fontSize: '18px', color: activeRoute === 'users' ? '#FFF' : '#1E1E2C' }}>
                                    Users
                                </Typography>
                            </ListItem>
                            : null
                    }
                    {
                        type === 'admin' ?
                            <ListItem onClick={() => handleRedirection('courses')} >
                                <Typography style={{ fontSize: '18px', color: activeRoute === 'courses' ? '#FFF' : '#1E1E2C' }}>
                                    Courses
                                </Typography>
                            </ListItem>
                            : null
                    }
                    <ListItem onClick={() => handleRedirection('lectures')} >
                        <Typography style={{ fontSize: '18px', color: activeRoute === 'lectures' ? '#FFF' : '#1E1E2C' }}>
                            Lectures
                        </Typography>
                    </ListItem>
                </List>
            </Drawer>
            <main style={{ flexGrow: 1 }}>
                <Container>
                    <div>
                        <Outlet />
                    </div>
                </Container>
            </main>
        </div >
    );
};

export default MainLayout;
