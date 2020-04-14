import React from 'react';
import Container from "reactstrap/lib/Container";
import UserBar from "./UserBar";
import AnonimusBar from "./AnonimusBar";
import {useSelector} from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";

const NavBar = () => {
    const user = useSelector(state => state.authorization.user);

    const useStyles = makeStyles(() => ({
        root: {
            flexGrow: 1,
        }
    }));

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        {user.token ? (
                            <UserBar/>
                        ) : (
                            <AnonimusBar/>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default NavBar;