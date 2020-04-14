import React, {useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toast from "light-toast";
import {changeProfileAct} from "../../actions/user";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(30),
        height: theme.spacing(30),
        display: 'inline-block'
    },
    inlineBlock: {
        display: 'inline-block'
    },
    width50: {
        width: '50%'
    }
}));

const ProfileUser = () => {
    const classes = useStyles();
    const user = useSelector(state => state.authorization.user);

    const initLoginForm = {
        username: user.username,
        displayName: user.displayName,
        password: '',
        avatar: ''
    };
    const [profileForm, setProfileForm] = useState(initLoginForm);
    const dispatch = useDispatch();

    const changeProfileForm = e => setProfileForm({...profileForm, [e.target.name]: e.target.value});

    const changeProfile = e => {
        e.preventDefault();

        if (profileForm.displayName.length > 0 && profileForm.displayName.length < 5) return Toast.fail('Display name пользователя должен содержать больше 5 символов!', 2000);

        const data = new FormData();

        Object.keys(initLoginForm).forEach(e => {
            data.append(e, profileForm[e])
        });

        dispatch(changeProfileAct(data));
    };

    return (
        <div>
            <div>
                <Avatar className={classes.large} src={user.avatar} sizes='300px'/>
                <div className={classes.inlineBlock}>
                    <p><b>Username:</b> {user.username}</p>
                    <p><b>Name:</b> {user.displayName}</p>
                </div>
            </div>
            <div className={classes.width50}>
                <Typography variant='h4'>Change user info</Typography>
                <form className={classes.form} noValidate onSubmit={changeProfile}>
                    {user.facebookId &&
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="username"
                        label="Username"
                        type="text"
                        id="username"
                        value={profileForm.username}
                        onChange={changeProfileForm}
                    />
                    }
                    {!user.facebookId &&
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        suggested = "current-password"
                        value={profileForm.password}
                        onChange={changeProfileForm}
                    />
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="displayName"
                        label="Display name"
                        type="text"
                        id="displayName"
                        value={profileForm.displayName}
                        onChange={changeProfileForm}
                    />
                    <Grid>
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{display: 'none'}}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={e => setProfileForm({...profileForm, avatar: e.target.files[0]})}
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
                        Change profile
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ProfileUser;