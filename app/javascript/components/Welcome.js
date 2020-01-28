import { Box, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from '@reach/router';
import React from 'react';

const Welcome = () => (
    <Box my={2}>
        <Typography variant='body1'>
            Hello! Feel free to{' '}
            <Link component={RouterLink} to='/signup'>
                sign up
            </Link>{' '}
            for a new account, or{' '}
            <Link component={RouterLink} to='/login'>
                log in
            </Link>{' '}
            if you already have one.
        </Typography>
    </Box>
);

export default Welcome;
