import {Box, Button, Container, Link, TextField, Typography} from '@mui/material';
import {useContext} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';

import {UserContext} from '@root/contexts';
import {UserService} from '@root/services';

const service = new UserService();

export function SignIn() {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const formData = new FormData(ev.currentTarget);
        const login = formData.get('login') as string;
        const password = formData.get('password') as string;

        try {
            const result = await service.signIn({login, password});
            setUser(result);
            navigate('/');
        } catch (err) {
            console.error('Sign in failed:', err);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="login"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Link component={RouterLink} to="/signup" variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}
