import { useEffect, useState } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { studentAPI } from '../axios/studentAPI.js';
import { useStudentContext } from '../store/Provider';
import { ACTIONS } from '../store/actiontypes';
import EditDetails from './EditDetails';
import toast from 'react-hot-toast';

const StudentList = () => {
  const { state, dispatch } = useStudentContext();
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await studentAPI.getStudents();
      dispatch({ type: ACTIONS.SET_STUDENTS, payload: response.data.data });
    } catch (error) {
      toast.error('Failed to fetch students');
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await studentAPI.deleteStudent(studentId);
      dispatch({ type: ACTIONS.DELETE_STUDENT, payload: studentId });
      toast.success('Student deleted successfully');
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table sx={{ minWidth: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Total Marks</TableCell>
              <TableCell>Marks Obtained</TableCell>
              <TableCell>Percentage</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.students.map((student) => (
              <TableRow key={student.student_id}>
                <TableCell>{student.student_id}</TableCell>
                <TableCell>{student.student_name}</TableCell>
                <TableCell>{student.total_marks}</TableCell>
                <TableCell>{student.marks_obtained}</TableCell>
                <TableCell>{student.percentage.toFixed(2)}%</TableCell>
                <TableCell>
                  <IconButton onClick={() => setEditStudent(student)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(student.student_id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {editStudent && (
        <EditDetails
          student={editStudent}
          onClose={() => setEditStudent(null)}
        />
      )}
    </>
  );
};

export default StudentList;