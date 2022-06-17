import { Button, ButtonBase, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
      //window.location.reload();
    }
    else {
      setLikes([...post.likes, userId]);
      //window.location.reload();
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <>
            <ThumbUpAltIcon fontSize="small" />
              &nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }
          </>
        ) : (
          <>
            <ThumbUpAltOutlined fontSize="small" />
              &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
          </>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia 
          className={classes.media} 
          image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
          title={post.title} 
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <EditIcon/>
          </Button>
        </div>
        )}
        <div className={classes.details}>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography 
          className={classes.title} 
          gutterBottom 
          variant="h5" 
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            component="p"
          >
            {post.message.split(' ').splice(0, 20).join(' ')}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button 
          size="small" 
          color="primary" 
          disabled={!user?.result} 
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;