import React from 'react';
import {NavLink as ToLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

const AnonimusBar = () => (
    <>
        <Button color="inherit" component={ToLink} to='/registration'>registration</Button>
        <Button color="inherit" component={ToLink} to='/login'>login</Button>
    </>
);

export default AnonimusBar;