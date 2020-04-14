import axios from "axios";
import {push} from 'connected-react-router';

export const GET_TAGS = 'GET_TAGS';

export const GET_POSTS = 'GET_POSTS';

const getTagsSuc = data => ({type: GET_TAGS, data});

const getPostsSuc = data => ({type: GET_POSTS, data});


export const getTags = () => async dispatch => {
    const tags = await axios.get('http://localhost:8000/post/tags');

    dispatch(getTagsSuc(tags.data));
};

export const getPosts = () => async (dispatch, getState) => {
    const token = await getState().authorization.user.token;
    const posts = await axios.get('http://localhost:8000/post', {headers: {'Authorization': 'Token ' + token}});

    dispatch(getPostsSuc(posts.data));
};

export const addPost = postData => async (dispatch, getState) => {
    const token = await getState().authorization.user.token;
    await axios.post('http://localhost:8000/post', postData, {headers: {'Authorization': 'Token ' + token}});

    dispatch(getPosts());
    dispatch(push('/'))
};