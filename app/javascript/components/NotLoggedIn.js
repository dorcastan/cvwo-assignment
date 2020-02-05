import { Box, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from '@reach/router';
import React from 'react';

const NotLoggedIn = () => (
    <div>
        <Typography variant='h3'>Oops!</Typography>
        <Box my={2}>
            <Typography variant='body1'>
                You have to be{' '}
                <Link component={RouterLink} to='/login'>
                    logged in
                </Link>{' '}
                to view this page.
            </Typography>
        </Box>
    </div>
);

export default NotLoggedIn;
