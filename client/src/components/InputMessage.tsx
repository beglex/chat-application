import {Box, Button, TextField} from '@mui/material';
import {useEffect, useState} from 'react';

import type {Message, User} from '@server/models';

import {socket} from '@root/helpers';
import {EventNames} from '@server/constants';

type Props = {
    login: User['login'];
};

type Mode = 'loading' | 'loaded';

export function InputMessage({login}: Props) {
    const [text, setText] = useState('');
    const [mode, setMode] = useState<Mode>('loaded');

    useEffect(() => {
        socket.on(EventNames.MESSAGE_RECEIVED, () => setMode('loaded'));

        return () => {
            socket.off(EventNames.MESSAGE_RECEIVED);
        };
    }, []);

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setText(ev.target.value);
        setMode(ev.target.value ? 'loaded' : 'loading');
    };

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setText('');

        socket.emit(EventNames.MESSAGE_SENT, {userId: 'AAA' as any, text, time: new Date()} as Message);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', alignItems: 'center'}}>
            <TextField
                onChange={handleChange}
                value={text}
                variant="outlined"
                fullWidth
                sx={{mr: 2, height: 50}} // Adjust the height as needed
                slotProps={{input: {style: {height: '100%'}}}} // Ensure the input field fills the height
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={mode === 'loading'}
                sx={{height: 50}} // Match the height of the TextField
            >
                Submit
            </Button>
        </Box>
    );
}
