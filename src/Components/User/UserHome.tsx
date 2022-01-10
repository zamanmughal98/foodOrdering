/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import ContextUserID from "../Contexts/ContextUserID";
import ContextOrders from "../Contexts/ContextOrders";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { doc, setDoc, deleteDoc, collection, addDoc } from "firebase/firestore";
import db from "../../FireBaseSetup";
import ContextMenu from "../Contexts/ContextMenu";
import { NavLink } from "react-router-dom";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import React from "react";
const UserHome = () =>{

    const User = useContext(ContextUserID);
    const Orders = useContext(ContextOrders);
    const Menu = useContext(ContextMenu);
    const [visibility , setVisibility] = useState({editBox:false, deleteBox:false, createBox:false}); 
    const [selectedRow, setSelectedRow] = useState({item:"" ,quantity:"" , id:"" , userID:"", status:""});
    const [newRow, setNewRow] = useState({item:"" ,quantity:""});

    
    const columns: GridColDef[] = [
        {field: "Items", headerName: "Items", width:150 ,headerAlign: "center"},
        {field: "Quantity", headerName: "Quantity",  width:150, headerAlign: "center"},
        {field: "Status", headerName: "Status",  width:150, headerAlign: "center"},
        {field: "Actions",  headerName: "Actions", sortable: false, width: 180, headerAlign: "center", renderCell: () => {
            return (
                <div style={{display:"flex" , flexDirection:"row"} }> 
                    <Button style={{color:"black"}} onClick={editClickeHandle} id="Edit" variant="text" startIcon={<EditIcon />}></Button>
                    <div style={{borderLeft:"solid gray 0.1rem" , paddingLeft:"0.5rem"}} >
                        <Button style={{color:"#1976d2"}} onClick={deleteClickeHandle} id="Delete"  variant="text" color="primary" startIcon={<DeleteIcon />}></Button>
                    </div></div>
            );
        }},
    ];    
    const order = Orders?.filter((data:any)=>  data.userID === User.userID);
    const UserOrders = order?.filter((data:any)=>  data.status === "pending");

    const rowData = UserOrders?.map((data:any) => {
        return{
            Items:data.item,
            Quantity:data.quantity,
            Status:data.status,
            id:data.id,
        };
    });

    const changeHandler= (e:any)=> {setSelectedRow(oldData => ({ ...oldData, [e.target.name]: e.target.value, }));};    
    const NewRowchangeHandler= (e:any)=> {setNewRow(oldData => ({ ...oldData, [e.target.name]: e.target.value, }));};       

    const handleRowSelection = (e:any) => {
        const filterSelectedROwData = (Orders?.filter((data:any)=> data.id === e[0]));
        setSelectedRow(filterSelectedROwData[0]);
    };
    const createClickeHandle = () =>{
        setVisibility((pre => ({...pre , createBox:true })));
    };
    const deleteClickeHandle = (e:any) =>{
        handleRowSelection(e);
        setVisibility((pre => ({...pre , deleteBox:true, })));
    };
    const editClickeHandle = (e:any) =>{
        handleRowSelection(e);
        setVisibility((pre => ({...pre ,editBox:true, })));
    };
    const cancelBtnHandler = () => setVisibility((pre => ({...pre ,editBox:false, deleteBox:false, createBox:false })));
    
    const updateBtnHandler = () =>{
        if(selectedRow.id && selectedRow.item && selectedRow.quantity && selectedRow.userID && selectedRow.status){
            const docRef = doc(db, "OrderHistory", selectedRow.id);
            const payload = {item:selectedRow.item , quantity:selectedRow.quantity, userID:selectedRow.userID, status:selectedRow.status };
            setDoc(docRef, payload);
        }
        setVisibility((pre => ({...pre ,editBox:false}))); 
    };
    const deleteBtnHandler = () =>{
        if(selectedRow.id){
            const docRef = doc(db, "OrderHistory",selectedRow.id );
            deleteDoc(docRef);
        }
        setVisibility((pre => ({...pre , deleteBox:false, })));
    };
    const createBtnHandler = ()=>{
        if( newRow.item && newRow.quantity && User.userID ){
            const collectionRef = collection(db, "OrderHistory");
            const payload = {item:newRow.item , quantity:newRow.quantity, userID:User.userID, status:"pending" };
            addDoc(collectionRef,payload );
        }
        setVisibility((pre => ({...pre , createBox:false })));
        setNewRow((pre=>({...pre , item:"" ,quantity:"" })));

    };

    const displayBox = (type:string) =>{
        return(
            <section>
                <Box sx={{ position: "relative" }}>
                    <Box
                        sx={{
                            position: "fixed",
                            bottom: 300,
                            left: 200,
                            right: 200,
                            bgcolor: "rgb(255,255,255,0.95)",
                            border:"solid 0.1rem royalblue",
                            color: "black",
                            padding: "10px",
                        }}
                    >
        
                        {(type==="create")?
                            <section>
                                <Typography variant="h6">Place Order</Typography>
                                <div style={{color:"black" , marginTop:"3rem"}}>
                                    <div>
                                        <FormControl style={{width:"20rem", marginRight:"3rem", }}>
                                            <InputLabel >Item</InputLabel>
                                            <Select variant="filled" name="item" onChange={NewRowchangeHandler}>
                                                {Menu.map((data:any)=>{
                                                    return <MenuItem value={data.foodName}>{data.foodName}</MenuItem>;
                                                })}
                                            </Select>
                                        </FormControl>
                                        <TextField onChange={NewRowchangeHandler} name="quantity" style={{width:"20rem", marginRight:"3rem"}} variant="filled" InputProps={{inputProps: { max: 9, min: 1 }}} label="Quantities" type="number"></TextField>
                                    </div>
                                    <div style={{marginTop:"1.5rem"}}>
                                        <Button onClick={createBtnHandler} style={{marginLeft:"1.5rem", marginRight:"1.5rem", fontSize:"large"}} color="success" variant="outlined">Confirm Order</Button>
                                        <Button onClick={cancelBtnHandler} style={{ fontSize:"large"}} color="error" variant="outlined">cancel</Button>
                                    </div>
                                </div>
                            </section>:
                            (type==="edit")?
                                <section>
                                    <Typography variant="h6">Edit Order</Typography>
                                    <div style={{color:"black" , marginTop:"3rem"}}>
                                        <div>
                                            <FormControl style={{width:"20rem", marginRight:"3rem", }}>
                                                <InputLabel >Item</InputLabel>
                                                <Select variant="filled" value={selectedRow.item} name="item" onChange={changeHandler}>
                                                    {Menu.map((data:any, )=>{
                                                        return <MenuItem value={data.foodName}>{data.foodName}</MenuItem>;
                                                    })}
                                                </Select>
                                            </FormControl>
                                            <TextField onChange={changeHandler} name="quantity" value={selectedRow.quantity} style={{width:"20rem", marginRight:"3rem"}} variant="filled" InputProps={{inputProps: { max: 9, min: 1 }}} label="Quantities" type="number"></TextField>
                                        </div>
                                        <div style={{marginTop:"1.5rem"}}>
                                            <Button onClick={updateBtnHandler} style={{marginLeft:"1.5rem", marginRight:"1.5rem", fontSize:"large"}} color="success" variant="outlined">Confirm Update</Button>
                                            <Button onClick={cancelBtnHandler} style={{ fontSize:"large"}} color="error" variant="outlined">cancel</Button>
                                        </div>
                                    </div>
                                </section>:
                                (type==="delete")?
                                    <section><Typography variant="h6">Delete Order</Typography>
                                        <div style={{color:"black" , marginTop:"1.5rem"}}>
                                            <Typography variant="h6">Are you sure you want to delete the {selectedRow.item} record ?</Typography>
                                            <Button onClick={deleteBtnHandler} style={{fontSize:"large" , marginRight:"1.5rem", marginTop:"1rem"}} color="error" variant="outlined">Confirm Delete</Button>
                                            <Button onClick={cancelBtnHandler} style={{fontSize:"large", marginTop:"1rem"}} color="success" variant="outlined">cancel</Button>
                                        </div>
                                    </section>:null
                        }
                    </Box>
                </Box>
            </section>        
        );};

    return <div>
        <p>welcome <strong>{User.userID}</strong></p>
        <nav>
            <Button onClick={createClickeHandle} sx={{ "&:hover": {backgroundColor: "transparent",}, color:"black",  marginTop:3, fontWeight:"bold" }} variant="text" size="large" color="secondary" startIcon={<FastfoodRoundedIcon/>}>New Order</Button>
            
            <Button sx={{marginLeft:2, color:"black", marginTop:3, }} variant="text" size="large"  startIcon={<TaskOutlinedIcon/>} >
                <NavLink className="navlink" activeClassName="Anavlink" to="/user/deliveredOrders">Order Logs</NavLink>
            </Button>
        </nav>
        {visibility.createBox? displayBox("create") : 
            visibility.editBox? displayBox("edit") :
                visibility.deleteBox? displayBox("delete"):
                    <div style={{ margin:"auto", padding:"0rem 3rem 2rem 5rem", width:"45rem"}}>
                        <DataGrid rows={rowData} columns={columns} style={{ margin:"2rem"}} hideFooter={true}  onSelectionModelChange={handleRowSelection} density="compact" autoHeight />
                    </div>
        }

    </div>;
};
export default UserHome;