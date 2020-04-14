import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import {addPost, getTags} from "../../actions/post";
import Toast from "light-toast";

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

const AddPost = () => {
    const classes = useStyles();

    const initPostForm = {
        title: '',
        text: '',
        tags: '',
        image: ''
    };
    const [postForm, setPostForm] = useState(initPostForm);
    const dispatch = useDispatch();
    const tags = useSelector(state => state.posts.tags);

    useEffect(() => {
        dispatch(getTags())
    }, [dispatch]);

    const changePostForm = e => setPostForm({...postForm, [e.target.name]: e.target.value});

    const changeTags = (e, tags) => {
        setPostForm({...postForm,tags: JSON.stringify(tags)});
    };

    const addNewPost = e => {
        e.preventDefault();

        if(postForm.text.length > 0 && postForm.text.length < 5) return Toast.fail('Text поста должен содержать больше 5 символов!',2000);

        const data = new FormData();

        Object.keys(initPostForm).forEach(e => {
            data.append(e, postForm[e])
        });

        dispatch(addPost(data));
    };

    return (
        <div>
            <div className={classes.width50}>
                <Typography variant='h4'>Add post</Typography>
                <form className={classes.form} noValidate onSubmit={addNewPost}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="title"
                        label="Title"
                        type="text"
                        id="title"
                        value={postForm.title}
                        onChange={changePostForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="text"
                        label="Text"
                        type="text"
                        id="text"
                        value={postForm.text}
                        onChange={changePostForm}
                    />
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        onChange={changeTags}
                        options={tags}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField {...params} type='text' variant="outlined" label="Tags" placeholder="Add tags" />
                        )}
                    />
                    <Grid>
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none'}}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={e => setPostForm({...postForm ,image: e.target.files[0]})}
                        />
                        <label htmlFor="raised-button-file">
                            <Button type='button' component="span" className={classes.button}>
                                Upload image
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
                        Add post
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddPost;