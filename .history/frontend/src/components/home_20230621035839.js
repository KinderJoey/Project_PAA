import React from "react";
import Navigation from "./navbar";
import "../style/home.css"
import Trending from "./trending";
import Intro from "./intro";
import Footer from "./footer";


const Home = () => {
  return (
    <div className="home">
      <>
        <div className="myBG">
          <Navigation />
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