import React, { useEffect, useState } from "react";
import { getRequest } from "../../../../helpers/helpers";
import Post from "../../../../components/Post/Post";
import "./PostsHome.css";

const PostsHome = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [visiblePostsCount, setVisiblePostsCount] = useState(6);
  const postsPerPage = 6;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const dataPost = await getRequest(
          "http://localhost:8080/api/post/getPosts"
        );
        if (dataPost) {
          const dataResult = dataPost.result;
          setPosts(dataResult);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    }

    fetchPosts();
  }, []);

  const loadMorePosts = () => {
    setVisiblePostsCount(visiblePostsCount + postsPerPage);
  };

  return (
    <div>
      {error ? (
        <div className="loader-contain">
          <span class="loader"></span>
          <h1>Cargando publicaciones...</h1>
        </div>
      ) : (
        <>
          <Post dataPost={posts.slice(0, visiblePostsCount)} />
          {visiblePostsCount < posts.length && (
            <div className="button-load-contain">
              <button className="button-load" onClick={loadMorePosts}>
                Cargar más publicaciones
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostsHome;
