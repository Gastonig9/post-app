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


function App() {
  return (
    <>
      <PostProvider>
        <BrowserRouter>
          <MainHeader />
          <NavbarLogIn />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:categoria" element={<Categoria />} />
            <Route path="/view/:pid" element={<PostDetail />} />
            <Route path="/auth/:action" element={<Auth />} />
            <Route path="/profile/:uid" element={<Profile />}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </PostProvider>
    </>
  );
}

export default App;
