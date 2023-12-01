import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ dataPost }) => {
  return (
    <div className="post-contain">
      {dataPost.map((post) => {
        return (
          <div key={post._id} className="post">
            <h1>{post.title}</h1>
            <h5>{post.category}</h5>
            <img src={post.images[0]} alt={post.title} />
            <p>
              {post.description || "nteger sollicitudin erat lacus, id ullamcorper leo elementum quis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae"}
            </p>
            <Link to={`/view/${post._id}`}>Leer mas</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
