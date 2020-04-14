import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../actions/post";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: '2px 3px'
    },
    media: {
        height: 140,
    },
    block: {
        display: 'inlineBlock'
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    marginTopAuto: {
        marginTop: 'auto'
    }
});

const Posts = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const posts = useSelector(state => state.posts.posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const postsList = posts.map(e => (
        <Card className={classes.root} key={e._id}>
            <Chip
                avatar={<Avatar className={classes.large} src={e.user.avatar} sizes='100px'/>}
                label={e.user.displayName}
                variant="outlined"
            />
                {e.image && <CardMedia
                    className={classes.media}
                    image={e.image}
                    title="Contemplative Reptile"
                />}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {e.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {e.text}
                    </Typography>
                    <div className={classes.marginTopAuto}>
                        {e.tags && e.tags.map((e, id) => <span key={id}>#{e} </span>)}
                    </div>
                </CardContent>
        </Card>
    ));

    return (
        <div className={classes.list} >
            {postsList}
        </div>
    );
};

export default Posts;