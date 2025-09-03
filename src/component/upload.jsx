
import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { studentAPI } from '../axios/studentAPI.js';
import { useStudentContext } from '../store/Provider';
import { ACTIONS } from '../store/actiontypes';
import toast from 'react-hot-toast';

const Upload = () => {
  const [file, setFile] = useState(null);
  const { dispatch } = useStudentContext();

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          selectedFile.type === 'text/csv') {
        setFile(selectedFile);
      } else {
        toast.error('Please select an Excel or CSV file');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await studentAPI.uploadFile(formData);
      toast.success('File uploaded successfully!');
      
      // Refresh student list
      const studentsResponse = await studentAPI.getStudents();
      dispatch({ type: ACTIONS.SET_STUDENTS, payload: studentsResponse.data.data });
      
      setFile(null); // Reset file input
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
        >
          Select File
          <input
            type="file"
            hidden
            accept=".xlsx,.csv"
            onChange={handleFileSelect}
          />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file}
        >
          Upload
        </Button>
        {file && (
          <Typography variant="body2" color="textSecondary">
            Selected file: {file.name}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Upload;