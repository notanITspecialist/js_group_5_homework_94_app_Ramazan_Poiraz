import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {registerUser} from "../../actions/user";
import Toast from "light-toast";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import FacebookLogin from "../FacebookLogin/FacebookLogin";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Registration = props => {
    const classes = useStyles();

    const initLoginForm = {
        username: '',
        password: '',
        displayName: '',
        avatar: ''
    };
    const [loginForm, setLoginForm] = useState(initLoginForm);
    const dispatch = useDispatch();

    const registerUserOnSubmit = async e => {
        e.preventDefault();

        if(loginForm.username.length < 5) return Toast.fail('Имя пользователя должно содержать больше 5 символов!',2000);
        if(loginForm.password.length < 5) return Toast.fail('Пароль должен содержать больше 5 символов!',2000);

        const data = new FormData();

        Object.keys(initLoginForm).forEach(e => {
            data.append(e, loginForm[e])
        });

        await dispatch(registerUser(data,props.history));
    };

    const changeLoginForm = e => setLoginForm({...loginForm, [e.target.name]: e.target.value});
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <FacebookLogin history={props.history}/>

                <form className={classes.form} noValidate onSubmit={registerUserOnSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={loginForm.username}
                        onChange={changeLoginForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={loginForm.password}
                        onChange={changeLoginForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="displayName"
                        label="Display name"
                        type="text"
                        id="displayName"
                        value={loginForm.displayName}
                        onChange={changeLoginForm}
                    />
                    <Grid>
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none'}}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={e => setLoginForm({...loginForm ,avatar: e.target.files[0]})}
                        />
                        <label htmlFor="raised-button-file">
                            <Button type='button' component="span" className={classes.button}>
                                Upload avatar
                            </Button>
                        </label>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Registration;