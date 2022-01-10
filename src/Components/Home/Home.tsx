import "./Home.css";
import React from "react";
import appLogo from "../appLogo.png";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import {signOut} from "firebase/auth";
import {auth} from "../../FireBaseSetup";

const Home = () => {

    const logOutClickHandler = async ()=>{
        try{ 
            await signOut(auth);
            localStorage.clear();
            window.location.reload();
        }
        catch(error){
            alert("error");
        }
    };
    return (
        <div className="Home">
            <header className="logo">
                <img src={appLogo} alt="FoodDelivery" width="350"/>
            </header>
            <Button  sx={{borderRadius:30, marginTop:10 ,marginLeft:10, height:60}} variant="text"  size="small" >
                <NavLink className="navlink" onClick={logOutClickHandler} activeClassName="Anavlink" to="/" >LogOut</NavLink>
            </Button>
        </div>);
};
export default Home;