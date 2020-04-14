import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, subscribeUser} from "../../actions/user";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {NavLink as ToLink} from "react-router-dom";
import TextField from "@material-ui/core/TextField";


const UserBar = () => {
    const user = useSelector(state => state.authorization.user);

    const [sub, setSub] = useState({search: ''});

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                component={ToLink} to={'/'}
                color="inherit"
            >
                Posts
            </Button>
            <Button
                component={ToLink} to={'/addPost'}
                color="inherit"
            >
                Add post
            </Button>
            <form onSubmit={e => {
                e.preventDefault();
                dispatch(subscribeUser(sub.search));
            }}>
                <TextField
                    variant="outlined"
                    required
                    label="Search users"
                    value={sub.sub}
                    onChange={e => setSub({search: e.target.value})}
                />
            </form>
            <Button
                onClick={handleMenu}
                color="inherit"
                style={{textTransform: 'capitalize', marginLeft: 'auto'}}
            >
                    {user.avatar && <Avatar alt={user.displayName} src={user.avatar} />}
                    <Typography variant='h6'>{user.displayName}</Typography>
            </Button>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem component={ToLink} to={'/profile'}>Profile</MenuItem>
                <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserBar;