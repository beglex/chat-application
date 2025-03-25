import {Box, Typography} from '@mui/material';

import type {Message, User} from '@server/models';

import {ConnectionManager, InputMessage, MessagesList} from '@root/components';

interface Props {
    messages: Message[];
    user?: User;
    status: string;
}

export function ChatContainer({messages, user, status}: Props) {
    return (
        <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
                Chat Application
            </Typography>
            <MessagesList messages={messages} />
            <InputMessage login={user?.login || 'AAA'} />
            <ConnectionManager status={status} />
        </Box>
    );
}
