/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import React, { useState, useEffect } from "react";
import {Switch, Route} from "react-router-dom";
import {collection, onSnapshot } from "firebase/firestore";

import db from "./FireBaseSetup";
import Home from "./Components/Home/Home";

import ChefHome from "./Components/Chef/ChefHome";
import ChefOrder from "./Components/Chef/ChefOrder";
import ChefDeliveredOrder from "./Components/Chef/ChefDeliveredOrder";

import UserHome from "./Components/User/UserHome";
import UserDeliveredOrders from "./Components/User/UserDeliveredOrders";

import ContextMenu from "./Components/Contexts/ContextMenu";
import ContextOrders from "./Components/Contexts/ContextOrders";
import ContextUserID from "./Components/Contexts/ContextUserID";
import Authentication from "./Components/Authentication/Authentication";

function App() {
    const [userID, setuserID] = useState("");
    const [menu, setMenu] = useState<any>([]);
    const [order, setOrder] = useState<any>([]);
  
    useEffect( ()=>{
        const loginUser= window.localStorage.getItem("login");
        setuserID(loginUser+"");
    },[userID]);

    useEffect(()=> onSnapshot(collection(db, "Menu"), (data)=>
        setMenu(data.docs.map((doc)=> ({...doc.data(), id:doc.id})))
    ),[]);

    useEffect(()=> onSnapshot(collection(db, "OrderHistory"), (data)=>
        setOrder(data.docs.map((doc)=> ({...doc.data(), id:doc.id})))
    ),[]);

    return (
        <div className="App">
            <Home/>
            <Switch>
                <ContextMenu.Provider value={menu}>
                    <ContextOrders.Provider value={order}>
                        <ContextUserID.Provider value={{userID}}>
                            <Route exact path="/"><Authentication/></Route>

                            <Route exact path="/chef"><ChefHome /></Route>
                            <Route exact path="/chef/order"><ChefOrder/></Route>
                            <Route exact path="/chef/deliveredOrders"><ChefDeliveredOrder/></Route>

                            <Route exact path="/user"><UserHome /></Route>
                            <Route exact path="/user/deliveredOrders"><UserDeliveredOrders/></Route>

                        </ContextUserID.Provider>
                    </ContextOrders.Provider>
                </ContextMenu.Provider>
            </Switch>

    
        </div>
    );
}

export default App;