import {Box, Button, Typography} from '@mui/material';

import {socket} from '@root/helpers';

interface Props {
    readonly status: string;
}

export function ConnectionManager({status}: Props) {
    return (
        <Box my={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2}}>
            <Typography variant="body1">Status: {`'${status}'`}</Typography>
            <Button variant="contained" color="primary" onClick={() => socket.connect()}>
                Connect
            </Button>
            <Button variant="contained" color="secondary" onClick={() => socket.disconnect()}>
                Disconnect
            </Button>
        </Box>
    );
}
