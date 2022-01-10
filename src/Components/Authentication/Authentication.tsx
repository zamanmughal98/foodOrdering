/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Checkbox, TextField } from "@mui/material";
import { onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../FireBaseSetup";
import ChefHome from "../Chef/ChefHome";
import UserHome from "../User/UserHome";

const Authentication = ()=> {

    const [authData, setAuthData] = useState({email:"",password:""});
    const [showPassword, setShowPassword] = useState("password");
    const [loginData, setLoginData] = useState<any>();


    onAuthStateChanged(auth, (currentUser)  => {
        setLoginData(currentUser);
        if(loginData){
            window.localStorage.setItem("login" , (loginData!.email).split("@")[0]);
            window.localStorage.setItem("type" , (loginData!.email).split("@")[0].substring(0,4));
        }
    } );
    const changeHandler= (e:any)=> {
        setAuthData(oldData => ({ ...oldData, [e.target.name]: e.target.value, }));
    };
    const checkBoxHandler = ()=>{ (showPassword ==="password")? setShowPassword("value") : setShowPassword("password"); };
    const logInClickHandler = async ()=>{
        try{
            await signInWithEmailAndPassword(auth, authData.email, authData.password);
            window.location.reload();
        }
        catch (error) {
            alert("error");
        }
    };
    const keyHandler =(e:any) =>{
        if(e.which === 13){
            logInClickHandler();
        }
    };
    
    return (
        <div  style={{display:"flex", justifyContent: "center", marginTop:"3rem"}}>
            {(window.localStorage.getItem("type")==="chef")? <ChefHome/> : 
                (window.localStorage.getItem("type")=== "user" )? <UserHome/> :
            
                    <Box sx={{ border: 1, borderColor: "primary.main", borderRadius: 10, padding:"2rem"}} >
                        <Typography color="primary"  variant="h5" > Authentication Form</Typography>
                        <TextField tabIndex={0}  autoFocus inputProps={{ maxLength: 15 }} onChange={changeHandler} fullWidth variant="standard" label="Email" type="value" name="email" ></TextField> 
                        <TextField tabIndex={0} inputProps={{ maxLength: 15 }} onChange={changeHandler} fullWidth variant="standard" label="Password" type={showPassword} name="password"  ></TextField>
                        <Typography aria-label="show/hide password" color="primary"  variant="subtitle1" >Show Password?
                            <Checkbox tabIndex={0}  aria-label="show/hide checkbox" color="primary" onChange={checkBoxHandler}/>
                        </Typography>
                        <Button onKeyDown={keyHandler} tabIndex={0} sx={{borderRadius: 50, marginTop:3}} variant="contained" size="large" onClick={logInClickHandler} >Login</Button>
                    </Box>
            }
        </div>);
};
export default Authentication;