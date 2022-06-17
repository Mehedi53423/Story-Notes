import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Post from "../Posts/Post/Post";
import "./userprofile.css";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return "No posts";

  return (
    <div className="">
      <div className="">
        <img
          className="profileCoverImg"
          src="https://source.unsplash.com/1600x900/?nature,photography,technology"
          alt="Cover Pic"
        />
        <img
          className="profileUserImg"
          src={user?.result.imageUrl}
          alt="userPic"
        />
      </div>

      <h1 className="profileInfoName">{user?.result.name}</h1>

      <div>
        <Grid container alignItems="stretch" spacing={3}>
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default UserProfile;
