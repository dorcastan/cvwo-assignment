import { Box, Container, Typography } from '@material-ui/core';
import React from 'react';
import AppHeader from './AppHeader';

const NotFound = (props) => (
    <Container>
        <AppHeader handleLogout={props.handleLogout} loggedInStatus={props.loggedInStatus} username={props.username} />
        <Typography variant='h3'>Page Not Found</Typography>
        <Box my={2}>
            <Typography variant='body1'>There's nothing here. Perhaps the URL was spelt wrongly?</Typography>
        </Box>
    </Container>
);

export default NotFound;
