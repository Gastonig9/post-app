import { useContext } from "react";
import PostsHome from "./components/PostsHome/PostsHome";
import ProfileHome from "./components/ProfileHome/ProfileHome";
import { setContext } from "../../context/context";
import "./Home.css";
import FriendsHome from "./components/FriendsHome/FriendsHome";
import ChatWindow from "../../components/ChatWindow/ChatWindow";

const Home = () => {
  const { user } = useContext(setContext);
  return (
    <>
      <div className="home-contain">
        <div className="colm-1">
          {user && <ProfileHome />}
          <hr />
          <div className="categorias">
            <a href="/deportes">Deportes</a>
            <a href="/ciencia">Ciencia</a>
            <a href="/politica">Politica</a>
            <a href="/cine">Cine</a>
            <a href="/musica">Musica</a>
          </div>
        </div>

        <div className="colm-2">
          <PostsHome />
        </div>

        {user && (
          <div className="colm-3">
            <h2>Personas que quizas conozcas</h2>
            <FriendsHome />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
