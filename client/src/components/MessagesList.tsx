import {Box, List, ListItem, ListItemText, Typography} from '@mui/material';

import type {Message} from '@server/models';

interface Props {
    readonly messages: Message[];
}

export function MessagesList({messages}: Props) {
    return (
        <List>
            {messages.map((message, i) => (
                <ListItem key={i} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <ListItemText primary={message.text} />
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                        <Typography variant="body2" color="textSecondary">
                            {message.time}
                        </Typography>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
}
