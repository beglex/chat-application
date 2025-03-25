import {Container} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import type {Message} from '@server/models';

import {SignIn, SignUp} from '@root/components';
import {socket} from '@root/helpers';
import {UserService} from '@root/services';
import {EventNames} from '@server/constants';

import {ChatContainer} from './containers';
import {UserContext} from './contexts';

const service = new UserService();

export function App() {
    const {user, setUser} = useContext(UserContext);
    const [connectionStatus, setConnectionStatus] = useState(socket.connected ? 'connected' : 'disconnected');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const current = await service.current();
                setUser(current);
            } catch (err) {
                console.error('Authorization check failed:', err);
                setUser(null);
            }
        })();
    }, [setUser]);

    useEffect(() => {
        if (user) {
            socket.connect();

            return () => {
                socket.disconnect();
            };
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const handleConnect = () => setConnectionStatus('connected');
            const handleDisconnect = () => setConnectionStatus('disconnected');
            const handleNewMessage = (value: Message) => setMessages(prev => [...prev, value]);
            const handleRecentMessages = (messages: Message[]) => setMessages(messages);

            socket.on('connect', handleConnect);
            socket.on('disconnect', handleDisconnect);
            socket.on(EventNames.RECENT_MESSAGES, handleRecentMessages);
            socket.on(EventNames.NEW_MESSAGE, handleNewMessage);

            return () => {
                socket.off('connect', handleConnect);
                socket.off('disconnect', handleDisconnect);
                socket.off(EventNames.RECENT_MESSAGES, handleRecentMessages);
                socket.off(EventNames.NEW_MESSAGE, handleNewMessage);
            };
        }
    }, [user]);

    return (
        <Container>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/"
                    element={user
                        ? <ChatContainer messages={messages} status={connectionStatus} />
                        : <Navigate to="/signin" />}
                />
            </Routes>
        </Container>
    );
}
