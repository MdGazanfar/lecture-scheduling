import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../components/ErrorPage';
import Login from '../components/Login';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../components/PortalDashboard';
import Users from '../components/Users/Users'
import AddUsers from '../components/Users/AddUsers'
import Courses from '../components/Courses/Courses'
import Lectures from '../components/Lectures/Lectures'
import AddLectures from '../components/Lectures/AddLectures';
import AddCourses from '../components/Courses/AddCourses';

const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/add-users" element={<AddUsers />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/add-courses" element={<AddCourses />} />
                        <Route path="/lectures" element={<Lectures />} />
                        <Route path="/add-lectures" element={<AddLectures />} />

                    </Route>
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<ErrorPage />} />

            </Routes>
        </Router>
    );
}

export default AppRouter