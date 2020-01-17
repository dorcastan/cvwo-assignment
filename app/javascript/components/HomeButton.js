import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from '@reach/router';
import React from 'react';

const HomeButton = () => (
    <Button component={Link} to='/' variant='contained' startIcon={<HomeIcon />}>
        Home
    </Button>
);

export default HomeButton;
