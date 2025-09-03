import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { StudentProvider } from './store/Provider';
import Header from './component/Header';
import { Toaster } from 'react-hot-toast';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StudentProvider>
         <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        <Header />
        <Outlet />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        </Box>
      </StudentProvider>
    </ThemeProvider>
  );
}

export default App;