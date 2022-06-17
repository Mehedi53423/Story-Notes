import { Button, Paper, TextField, Typography } from '@material-ui/core';
import ClearIcon from "@material-ui/icons/Clear";
import PublishIcon from "@material-ui/icons/Publish";
import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: ''
  });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: '',
      message: '',
      tags: [],
      selectedFile: '' 
    });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own posts and like other's posts
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form 
        autoComplete="off"
        noValidate 
        className={`${classes.root} 
        ${classes.form}`} 
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post?.title}"` : 'Creating a Post'}
        </Typography>

        <TextField 
          name="title" 
          variant="outlined" 
          label="Title" 
          fullWidth 
          value={postData.title} 
          onChange={
            (e) => setPostData({ ...postData, title: e.target.value })
          } 
        />

        <TextField 
          name="message" 
          variant="outlined" 
          label="About"
          fullWidth 
          multiline 
          rows={4} 
          value={postData.message} 
          onChange={
            (e) => setPostData({ ...postData, message: e.target.value })
          } 
        />

        <TextField 
          name="tags" 
          variant="outlined" 
          label="Tags (coma separated)" 
          fullWidth 
          value={postData.tags} 
          onChange={
            (e) => setPostData({ ...postData, tags: e.target.value.split(',') })
          } 
        />

        <div className={classes.fileInput}>
          <FileBase 
            type="file" 
            multiple={false} 
            onDone={
              ({ base64 }) => setPostData({ ...postData, selectedFile: base64 })
              } 
          />
        </div>

        <Button 
          className={classes.buttonSubmit} 
          variant="outlined"
          color="primary" 
          size="large" 
          type="submit"
          startIcon={<PublishIcon/>}
          fullWidth
        >
          Submit
        </Button>

        <Button 
          variant="outlined" 
          color="secondary" 
          size="small" 
          onClick={clear}
          startIcon={<ClearIcon/>}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;