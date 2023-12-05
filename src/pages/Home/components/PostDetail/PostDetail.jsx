import { Link, useParams } from "react-router-dom";
import { getRequest } from "../../../../helpers/helpers";
import "./PostDetail.css";
import { useContext, useEffect, useState } from "react";
import { setContext } from "../../../../context/context";
import FavSection from "../../../../components/FavSection/FavSection";

const PostDetail = () => {
  const { pid } = useParams();
  const { user } = useContext(setContext)
  const [postDetail, setPostDetail] = useState(null);
  const [postR, setPostR] = useState([]);

  useEffect(() => {
    // Función asincrónica para obtener el postDetail
    async function fetchPostDetail() {
      try {
        const response = await getRequest(
          `http://localhost:8080/api/post/getPostById/${pid}`
        );

        setPostDetail(response.result);
      } catch (error) {
        // Manejar errores
      }
    }

    fetchPostDetail();
  }, [pid]);

  useEffect(() => {
    if (postDetail) {
      async function fetchRecommendedPosts() {
        try {
          const dataPost = await getRequest(
            "http://localhost:8080/api/post/getPosts"
          );
          if (dataPost) {
            const dataResult = dataPost.result;
            const recommended = dataResult.filter(
              (pr) => pr.category === postDetail.category
            );
            setPostR(recommended);
          }
        } catch (error) {}
      }

      fetchRecommendedPosts();
    }
  }, [postDetail]);

  return (
    <>
      <div className="post-detail-contain">
        <div className="post-detail">
          <div className="fav-section">
            <h6>{postDetail?.category}</h6>
            <FavSection postId={pid} userId={user?._id} />
          </div>
          <h1>{postDetail?.title}</h1>
          <small>{postDetail?.date}</small>
          <hr />
          <p className="description-p">
            <b>{postDetail?.description}</b>
          </p>

          <img src={postDetail?.image} alt="" />

          <p className="text-p">
            {postDetail?.cita ||
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, anecessitatibus sapiente veritatis, minima voluptates temporaillo accusantium adipisci modi tempore ex id illum voluptate, numquam aut?Porro"}
          </p>
        </div>

        <div className="post-recommended">
          <h1>Relacionados</h1>
          {postR.map((post) => (
            <>
              <a href={`/view/${post._id}`}>
                <div key={post._id} className="post-r-u">
                  <img src={post?.image} />
                  <h2>{post?.title}</h2>
                </div>
              </a>
              <div className="separador"></div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
