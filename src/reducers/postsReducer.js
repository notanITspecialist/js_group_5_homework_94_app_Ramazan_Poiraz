import {GET_POSTS, GET_TAGS} from "../actions/post";

const initPosts = {
    tags: [],
    posts: []
};

const postsReducer = (state = initPosts, action) => {
    switch (action.type) {
        case GET_TAGS: {
            return {...state, tags: action.data}
        }
        case GET_POSTS: {
            return {...state, posts: action.data}
        }
        default: return state
    }
};

export default postsReducer;