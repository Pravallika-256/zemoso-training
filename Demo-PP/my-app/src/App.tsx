
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/index';
import Home from './pages/Home';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
       <Home /> 
    </ThemeProvider>
  );
};

export default App;
