import { Box } from '@mui/material';
import Upload from './upload';
import StudentList from './studentList';

const Main = () => {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Upload />
        <StudentList />
      </Box>
    </Box>
  );
};

export default Main;