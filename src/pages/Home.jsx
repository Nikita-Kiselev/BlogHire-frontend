import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

import {
  fetchNewPosts,
  fetchPosts,
  fetchSortedPostsByPopularity,
  fetchTags,
} from "../redux/slices/posts";
import { fetchAuthMe, selectIsAuth } from "../redux/slices/auth";
import { Box } from "@mui/material";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts); // выбираем данные из reducer'a posts (см. store)
  const userData = useSelector((state) => state.auth.data);
  const isPostsLoadning = posts.status === "loading";
  const isTagsLoadning = tags.status === "loading";

  React.useEffect(() => {
    // прогружаем посты и теги
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  function handlePopularityPosts() {
    dispatch(fetchSortedPostsByPopularity());
  }
  function handleNewPosts() {
    dispatch(fetchNewPosts());
  }

  const [tabValue, setTabValue] = React.useState("one");

  const tabHandleChange = (event, newValue) => {
    setTabValue(newValue);
  };


  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
        <Tabs
          value={tabValue}
          onChange={tabHandleChange}
          style={{ marginBottom: 15 }}
        >
          <Tab style={{color: 'white'}} onClick={handleNewPosts} label="Новые" />
          <Tab style={{color: 'white'}}  onClick={handlePopularityPosts} label="Популярные" />
        </Tabs>
      </Box>
      <Grid container spacing={2} columns={2}>
        {/* <Grid xs={8} item> */}
        {(isPostsLoadning ? [...Array(5)] : posts.items).map((obj, index) =>
          isPostsLoadning ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Grid xs={1}  item>
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:666${obj.imageUrl}` : null
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?.userData?._id === obj?.user?._id}
              />
            </Grid>
          )
        )}
        {/* </Grid> */}
        {/* <Grid xs={1} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoadning} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid> */}
      </Grid>
    </>
  );
};
