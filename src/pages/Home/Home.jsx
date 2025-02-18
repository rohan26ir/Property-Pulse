import React from "react";
import Hero from "./Hero";
import AboutBuilding from "./AboutBuilding/AboutBuilding";
import Coupons from "./Coupons/Coupons";
import useAuth from "../../hooks/useAuth";
import { AuthContext } from "../../Provider/Provider";
import { Helmet } from "react-helmet-async";
import { div } from "motion/react-client";
import HomeLocation from "./ApartmentLocation/HomeLocation";


const Home = () => {
  const { user } = useAuth(AuthContext);

  return (
    <div className="">
      <Helmet>
        <title>PropertyPulse</title>
      </Helmet>

      <header>
        <Hero></Hero>
      </header>

      <main className="bg-gray-100">
        <div className="w-11/12 mx-auto py-5">
          <AboutBuilding></AboutBuilding>
        </div>

        <div className="mt-2">
          {user ? <div className="bg-gray-500"><Coupons></Coupons></div> : ""}
        </div>

        <div className="w-11/12 mx-auto">
        
         <HomeLocation></HomeLocation>
        
        </div>


      </main>
    </div>
  );
};

export default Home;
