import {ThemeProvider} from '@emotion/react';
import {createTheme, CssBaseline} from '@mui/material';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

import {App} from './App';
import {UserProvider} from './contexts';

const theme = createTheme();

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider>
                <Router>
                    <App />
                </Router>
            </UserProvider>
        </ThemeProvider>
    </StrictMode>,
);
