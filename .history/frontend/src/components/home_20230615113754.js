import React from "react";
import Navbar from "../../component/navigationBarr/Navbar";
import "../style/home.css"
import Trending from "../../component/trending/trending";
import Intro from "../../component/intro/intro";


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