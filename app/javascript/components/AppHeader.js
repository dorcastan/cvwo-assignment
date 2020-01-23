import { AppBar, Avatar, Box, Button, ButtonGroup, Grid, Paper, Tooltip, Typography } from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';
import { Link as RouterLink } from '@reach/router';
import React from 'react';
import HomeButton from './HomeButton';

const AppHeader = (props) => (
    <Box mb={3} border={1} borderRadius='borderRadius' borderColor='primary.main'>
        <Paper elevation={3}>
            <AppBar position='static' elevation={0}>
                <Box align='center' p={2}>
                    <Typography variant='h2' component='h1'>
                        To-Do List
                    </Typography>
                </Box>
            </AppBar>

            <Box padding={2}>
                <Grid container justify='space-between' alignItems='center'>
                    <Grid container item spacing={2} xs={9}>
                        <Grid item>
                            <HomeButton />
                        </Grid>
                        {props.loggedInStatus && (
                            <React.Fragment>
                                <Grid item>
                                    <Button
                                        component={RouterLink}
                                        to='/add'
                                        variant='contained'
                                        color='primary'
                                        startIcon={<Add />}
                                    >
                                        Add to-do
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
                            </React.Fragment>
                        )}
                    </Grid>
                    <Grid item>
                        <Box alignSelf='flex-end' p={1}>
                            {props.loggedInStatus && props.username ? (
                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <Tooltip title={props.username} aria-label={props.username}>
                                            <Avatar>{props.username.charAt(0).toUpperCase()}</Avatar>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={props.handleLogout} color='inherit'>
                                            Log Out
                                        </Button>
                                    </Grid>
                                </Grid>
                            ) : (
                                <ButtonGroup>
                                    <Button component={RouterLink} to='/login' color='inherit'>
                                        Log In
                                    </Button>
                                    <Button component={RouterLink} to='/signup' color='inherit'>
                                        Sign Up
                                    </Button>
                                </ButtonGroup>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    </Box>
);

export default AppHeader;
