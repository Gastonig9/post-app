import PostsHome from "./components/PostsHome/PostsHome";
import "./Home.css"

const Home = () => {
  return (
    <>
      <div className="home-contain">
        <div className="colm-1">
          <h1>COL</h1>
        </div>

        <div className="colm-2">
          <PostsHome />
        </div>

        <div className="colm-3">
          <h1>COL 3</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
