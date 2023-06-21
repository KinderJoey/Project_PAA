import React from "react";
import Update from "../../component/update/Update";
import Sidebar from "../../component/sidebar/Sidebar";
import Navbar from "../../component/navigationBarr/Navbar";
import Rightbar from "../../component/rightbar/Rightbar";
import "./home.scss";
import Trending from "../../component/trending/trending";
import Intro from "../../component/intro/intro";
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home">
      <>
        <div className="myBG">
          <Navbar />
          <Intro />

        </div>
        <div className="trending">

          <Trending/>

        </div>
        <div>

        </div>
      </>
    </div>
  );
};

export default Home;