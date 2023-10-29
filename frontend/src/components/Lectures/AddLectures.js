import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Button, Stack, Typography, Select, MenuItem } from '@mui/material';
import axios from '../../utils/axios';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { notificationController } from '../../utils/toast';

const AddLectures = () => {

  const navigate = useNavigate();
  const today = dayjs();
  const [lectureName, setLectureName] = useState('');
  const [course, setCourse] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [courseData, setCoursesData] = useState('');
  const [userData, setUserData] = useState('');
  const [date, setDate] = useState(today);


  const handleAddLecture = () => {
    const onlyDate = date.format('YYYY-MM-DD')
    const data = {
      name: lectureName,
      courseId: course,
      lecturerId: lecturer,
      lecturerDate: onlyDate,
    }
    return axios.post('lecture/add', data)
      .then(() => {
        setTimeout(() => {
          notificationController.success('Lecture Added Successfully')
          navigate("/lectures");
        }, 1000);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const getCoursesDetails = () => {
    return axios.get('course/list')
      .then((res) => {
        setCoursesData(res?.data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const getUserDetails = () => {
    return axios.get('user/list')
      .then((res) => {
        setUserData(res?.data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getCoursesDetails();
    getUserDetails();
  }, [])

  return (
    <>
      <Typography mt={4} variant='h5'>
        Add Lecture
      </Typography>
      <form>
        <Stack direction='row' style={{ gap: '5rem' }}>
          <Typography variant='h6' style={{ width: '12%', marginTop: '25px' }}>
            Name:
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lectureName}
            onChange={(e) => setLectureName(e.target.value)}
          />
        </Stack>
        <Stack direction='row' style={{ gap: '5rem', marginBottom: '10px' }}>
          <Typography variant='h6' style={{ width: '12%', marginTop: '10px' }}>
            Course:
          </Typography>
          <Select
            variant="outlined"
            fullWidth
            margin="normal"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            {
              courseData && courseData.length > 0 && courseData.map((d) => {
                return (
                  <MenuItem value={d._id} > {d.name}</MenuItem>
                )
              })
            }
          </Select>
        </Stack>
        <Stack direction='row' style={{ gap: '5rem' }}>
          <Typography variant='h6' style={{ width: '12%', marginTop: '10px' }}>
            Lecturer:
          </Typography>
          <Select
            variant="outlined"
            fullWidth
            margin="normal"
            value={lecturer}
            onChange={(e) => setLecturer(e.target.value)}
          >
            {
              userData && userData.length > 0 && userData.map((d) => {
                return (
                  <MenuItem value={d._id} > {d.name}</MenuItem>
                )
              })
            }
          </Select>
        </Stack>
        <Stack direction='row' style={{ gap: '3.8rem', marginTop: '20px' }}>
          <Typography variant='h6' style={{ width: '12%', marginTop: '10px' }}>
            Date:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              fullWidth
              value={date}
              onChange={(date) => setDate(date)}
            />
          </LocalizationProvider>
        </Stack>
        <Stack direction='row' style={{ gap: '15px' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '30px', width: '15%' }}
            onClick={() => handleAddLecture()}
          >
            Add Lecture
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '30px', width: '15%' }}
            onClick={() => navigate('/lectures')}
          >
            Cancel
          </Button>
        </Stack>
      </form >
    </>
  );
};

export default AddLectures;
