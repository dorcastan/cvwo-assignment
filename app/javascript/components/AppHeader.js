import { AppBar, Box, Button, Grid, Typography } from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';
import { Link as RouterLink } from '@reach/router';
import React from 'react';
import HomeButton from './HomeButton';

const AppHeader = () => (
    <Box mb={3} border={1} borderRadius='borderRadius' borderColor='primary.main'>
        <AppBar position='static'>
            <Box align='center' padding={2}>
                <Typography variant='h2' component='h1'>
                    To-Do List
                </Typography>
            </Box>
        </AppBar>

        <Box padding={2}>
            <Grid container spacing={2}>
                <Grid item>
                    <HomeButton />
                </Grid>
                <Grid item>
                    <Button component={RouterLink} to='/add' variant='contained' color='primary' startIcon={<Add />}>
                        Add a to-do
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        component={RouterLink}
                        to='/search'
                        variant='contained'
                        color='secondary'
                        startIcon={<Search />}
                    >
                        Search to-dos
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Box>
);

export default AppHeader;
