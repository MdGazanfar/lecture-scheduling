import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Button, Stack, Typography } from '@mui/material';
import axios from '../../utils/axios';
import { notificationController } from '../../utils/toast';

const AddCourses = () => {

  const navigate = useNavigate();

  const [courseName, setCourseName] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [batches, setBatches] = useState('');

  const handleAddCourse = () => {
    const data = {
      name: courseName,
      level: level,
      description: description,
      batches: batches,
    }
    return axios.post('course/add', data)
      .then(() => {
        setTimeout(() => {
          notificationController.success('Course Added Successfully')
          navigate("/courses");
        }, 1000);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Typography mt={4} variant='h5'>
        Add Course
      </Typography>
      <form>
        <Stack direction='row' style={{ gap: '5rem' }}>
          <Typography variant='h6' style={{ width: '12%', marginTop: '25px' }}>
            Name:
          </Typography>
          <TextField
            label="Coursename"
            variant="outlined"
            fullWidth
            margin="normal"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </Stack>
        <Stack direction='row' style={{ gap: '5rem' }}>
          <Typography variant='h6' style={{ width: '12%', marginTop: '25px' }}>
            Level:
          </Typography>
          <TextField
            label="Level"
            variant="outlined"
            fullWidth
            margin="normal"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </Stack>
        <Stack direction='row' style={{ gap: '5rem' }}>
          <Typography variant='h6' style={{ width: '12%', marginTop: '10px' }}>
            Description:
          </Typography>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
        <Stack direction='row' style={{ gap: '5rem' }}>
          <Typography variant='h6' style={{ width: '12%', marginTop: '10px' }}>
            Description:
          </Typography>
          <TextField
            label="Batches"
            variant="outlined"
            fullWidth
            margin="normal"
            value={batches}
            onChange={(e) => setBatches(e.target.value)}
          />
        </Stack>
        <Stack direction='row' style={{ gap: '15px' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '30px', width: '15%' }}
            onClick={() => handleAddCourse()}
          >
            Add Course
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '30px', width: '15%' }}
            onClick={() => navigate('/courses')}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default AddCourses;
