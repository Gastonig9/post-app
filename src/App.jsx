import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { PostProvider } from "./context/context";
import MainHeader from "./components/MainHeader/MainHeader";
import Navbar from "./components/Navbar/Navbar";
import NavbarLogIn from "./components/NavbarLogIn/NavbarLogIn";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Categoria from "./pages/Categoria/Categoria";
import PostDetail from "./pages/Home/components/PostDetail/PostDetail";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import { useContext } from "react";
import { setContext } from "./context/context";
import CreatePost from "./pages/CreatePost/CreatePost";
import Premium from "./pages/Premium/Premium";
// import ChatWindow from "./components/ChatWindow/ChatWindow";


function App() {
  const { user } = useContext(setContext);
  return (
    <>
      <PostProvider>
        <BrowserRouter>
          <MainHeader />
          <NavbarLogIn />
          <Navbar />
          {/* <ChatWindow /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:categoria" element={<Categoria />} />
            <Route path="/view/:pid" element={<PostDetail />} />
            <Route path="/auth/:action" element={<Auth />} />
            <Route path="/create-post" element={<CreatePost/>}></Route>
            <Route path="/profile/:uid" element={<Profile />}/>
            <Route path="/premium" element={<Premium/>}></Route>
            <Route path="*" element={<div>404 Not Found</div>}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </PostProvider>
    </>
  );
}

export default App;
