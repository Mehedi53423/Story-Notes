import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getPostsBySearch } from '../../actions/posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import Posts from '../Posts/Posts';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
      history.push(`/posts/search?searchQuery=${search }`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  //const handleAddChip = (tag) => setTags([...tags, tag]);

  //const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField 
                style={{ margin: '10px 0' }}
                onKeyDown={handleKeyPress} 
                name="search" 
                variant="outlined" 
                label="Search"
                fullWidth 
                value={search} 
                onChange={
                  (e) => setSearch(e.target.value)
                } 
              />
              <Button 
                onClick={searchPost} 
                className={classes.searchButton} 
                variant="outlined"
                startIcon={<SearchIcon/>}
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;