import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  Box,
  Typography
} from '@mui/material';
import { studentAPI } from '../axios/studentAPI.js';
import { useStudentContext } from '../store/Provider';
import { ACTIONS } from '../store/actiontypes';
import toast from 'react-hot-toast';

const EditDetails = ({ student, onClose }) => {
  const { dispatch } = useStudentContext();
  const [formData, setFormData] = useState({
    marks_obtained: student.marks_obtained,
    total_marks: student.total_marks
  });
  const [percentage, setPercentage] = useState(student.percentage);

  useEffect(() => {
    // Calculate percentage in real-time
    const newPercentage = (formData.marks_obtained / formData.total_marks) * 100;
    setPercentage(isNaN(newPercentage) ? 0 : newPercentage);
  }, [formData.marks_obtained, formData.total_marks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (formData.marks_obtained > formData.total_marks) {
      toast.error('Obtained marks cannot be greater than total marks');
      return;
    }

    if (formData.total_marks <= 0) {
      toast.error('Total marks must be greater than 0');
      return;
    }

    try {
      const response = await studentAPI.updateStudent(student.student_id, formData);
      dispatch({ 
        type: ACTIONS.UPDATE_STUDENT, 
        payload: response.data.data 
      });
      toast.success('Student marks updated successfully');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit Student Marks - {student.student_name}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Total Marks"
            name="total_marks"
            type="number"
            value={formData.total_marks}
            onChange={handleChange}
            fullWidth
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            label="Marks Obtained"
            name="marks_obtained"
            type="number"
            value={formData.marks_obtained}
            onChange={handleChange}
            fullWidth
            InputProps={{ inputProps: { min: 0 } }}
          />
          <Typography variant="body1" color="primary">
            Calculated Percentage: {percentage.toFixed(2)}%
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDetails;