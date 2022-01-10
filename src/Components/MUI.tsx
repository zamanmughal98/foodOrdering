import {NavLink} from "react-router-dom";
import React from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import image from "./chef.png";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/styles";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MyButton = styled(Button)({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
    height: 48,
    padding: "0 30px",

});
const useStyles = makeStyles({
    butn: {
        backgroundColor: "deeppink",
        fontVariant:"small-caps",
        color:"black"
    },
});

const MUI = () =>{
    const css = useStyles();

    return (<div>
        <Typography variant="h6" color="secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore dolor, labore ipsam vitae itaque molestias similique asperiores earum libero dignissimos delectus quidem sit nulla rem nesciunt modi ut amet minus necessitatibus? Nemo numquam quam ipsam quos quibusdam, suscipit ipsum esse deserunt cupiditate illum mollitia voluptate necessitatibus. Distinctio eos assumenda ipsa expedita sint error illo sit ex vitae t! Nihil corrupti eveniet quas nisi maxime dolor, explicabo repudiandae placeat asperiores, eos alias.</Typography>
        <Button color='error' variant="contained" size="small" startIcon={<AddCircleOutlineOutlinedIcon/>}>
            <NavLink className="nav" to="/add">Add</NavLink></Button>
        <Button color="secondary" variant="outlined" size="medium"startIcon={<ModeEditOutlinedIcon/>}>
            <NavLink className="nav" to="/add">Edit</NavLink></Button>
        <Button color="primary" variant="contained" size="medium" startIcon={<img src={image} alt="Logo" width="40"/>}>
            <NavLink className="nav" to="/add">Chef</NavLink></Button>
        <Button className={css.butn} variant="contained" >New Button</Button>
        {/* <MyButton>Button</MyButton> */}
    </div>);
};
export default MUI;