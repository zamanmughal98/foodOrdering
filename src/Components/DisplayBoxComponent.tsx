/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import db from "../FireBaseSetup";


const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid black",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,  

};
const DisplayBoxComponent = ({type, selectedRowData, OnType}:any) =>{

    const [selectedRow, setSelectedRow] = useState({foodName:selectedRowData.foodName ,recipe:selectedRowData.recipe , id:selectedRowData.id});
    const [open, setOpen] = useState(true);

    const changeHandler= (e:any)=> {setSelectedRow((oldData: any) => ({ ...oldData, [e.target.name]: e.target.value, }));};
    const cancelBtnHandler = () => OnType();
    const handleClose = () => setOpen(false);
    const DummyFunction = (e:any) =>{

        if(selectedRow.recipe && selectedRow.foodName && e.target.id === "create"){
            const collectionRef = collection(db, "Menu");
            const payload = {recipe:selectedRow.recipe , foodName:selectedRow.foodName };
            addDoc(collectionRef,payload );

        }
        else if(selectedRow.id && selectedRow.recipe && selectedRow.foodName && e.target.id === "edit"){
            const docRef = doc(db, "Menu", selectedRow.id);
            const payload = {recipe:selectedRow.recipe , foodName:selectedRow.foodName};
            setDoc(docRef, payload);

        }
        else if(selectedRow.id && e.target.id === "delete"){
            const docRef = doc(db, "Menu",selectedRow.id );
            deleteDoc(docRef);

        }
        OnType();
    };

    return(
        <section>
            {console.log({selectedRowData})}
            <Modal hideBackdrop open={open}  onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description"  >
                <Box sx={{ ...style, width :"45rem"}}>
                    <section>
                        <Typography variant="h6">{type.toUpperCase()} Menu</Typography>
                        <div style={{color:"black" , marginTop:"3rem"}}>
                            <div>
                                <TextField onChange={changeHandler} value={selectedRow.foodName} name="foodName" style={{width:"20rem", marginLeft:"1.5rem", marginRight:"3rem", marginBottom:"1.5rem", display:(type === "delete")? "none":"" }} inputProps={{ maxLength: 15 }} variant="filled" label="Food Item" type="text"></TextField>
                                <TextField onChange={changeHandler} value={selectedRow.recipe} name="recipe" style={{width:"35rem", marginLeft:"1.5rem", marginRight:"3rem", display:(type === "delete")? "none":"" }} inputProps={{ maxLength: 150 }}  multiline  rows="3" variant="filled" label="Recipe" type="text"></TextField>
                            </div>
                            <div style={{marginTop:"1.5rem"}}>
                                <Button id={type} onClick={DummyFunction} style={{marginLeft:"25rem", marginRight:"1.5rem", fontSize:"large"}} color="success" variant="outlined">{type.toUpperCase()} Menu</Button>
                                <Button id="cancle" onClick={cancelBtnHandler} style={{ fontSize:"large"}} color="error" variant="outlined">cancel</Button>
                            </div>
                        </div>
                    </section>
                </Box>
            </Modal>
        </section>        
    );

};
export default DisplayBoxComponent;