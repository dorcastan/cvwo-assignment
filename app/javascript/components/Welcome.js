import { Box, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from '@reach/router';
import React from 'react';

const Welcome = () => (
    <Box my={2}>
        <Typography variant='h6'>
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
        <br />
        <Typography variant='body2'>
            A user guide is available at{' '}
            <Link href='https://dorcastan.github.io/cvwo-assignment/#user-guide'>this link.</Link> If you have other
            difficulties, you can also file a report in the{' '}
            <Link href='https://github.com/dorcastan/cvwo-assignment/issues'>issue tracker</Link> on GitHub.
        </Typography>
    </Box>
);

export default Welcome;
