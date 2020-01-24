import { Avatar, Tooltip } from '@material-ui/core';
import React from 'react';

const UserAvatar = (props) => (
    <Tooltip title={props.username} aria-label={props.username}>
        <Avatar>{props.username.charAt(0).toUpperCase()}</Avatar>
    </Tooltip>
);

export default UserAvatar;
