import React from 'react';
import {Route, Switch} from "react-router";
import NavBar from "./components/NavBar/NavBar";
import Registration from "./components/registration/registration";
import Login from "./components/Login/login";
import Container from "@material-ui/core/Container";
import ProfileUser from "./components/ProfileUser/ProfileUser";
import AddPost from "./components/AddPost/AddPost";
import Posts from "./components/Posts/Posts";

function App() {
    return (
        <div>
            <NavBar/>
            <Container>
                <Switch>
                    <Route path="/" exact component={Posts}/>
                    <Route path="/addPost" exact component={AddPost}/>
                    <Route path="/profile" exact component={ProfileUser}/>
                    <Route path="/registration" exact component={Registration}/>
                    <Route path="/login" exact component={Login}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;