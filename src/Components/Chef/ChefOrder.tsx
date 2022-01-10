/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { NavLink } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import ContextOrders from "../Contexts/ContextOrders";
import ContextUserID from "../Contexts/ContextUserID";
import { Box, Button, Typography } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { doc, setDoc } from "@firebase/firestore";
import db from "../../FireBaseSetup";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
const ChefOrder = ()=>{

    const User = useContext(ContextUserID);
    const Orders = useContext(ContextOrders);
    const [selectedRow, setSelectedRow] = useState({item:"",quantity:"", status:"",userID:"", id:"" });
    const [visibility, setVisibility] = useState(false);

    const pendingOrders = Orders.filter((data:any)=> data.status === "pending" );
    const rowData = pendingOrders?.map((data:any) => {
        return{
            items:data.item, quantity:data.quantity, status:data.status, userID:data.userID, id:data.id,
        };
    });

    const columnData: GridColDef[] = [
        {field: "items", headerName: "Items", headerAlign:"center", width:150},
        {field: "quantity", headerName: "Quantity", headerAlign: "center", width:100},
        {field: "status", headerName: "Status", headerAlign: "center",  width:100},
        {field: "userID", headerName: "UserID", headerAlign: "center",  width:100},
        {field: "actions",  headerName: "Actions", sortable: false, width: 80, headerAlign: "center", renderCell: () => {
            return (
                <Button  tabIndex={0} style={{color:"black"}} aria-label="Deliver Button" onClick={deliverClickeHandle} variant="text" startIcon={<DoneAllIcon/>}></Button>
            );
        }},
    ];
    
    const handleRowSelection = (e:any) => {
        const filterSelectedROwData = (Orders?.filter((data:any)=> data.id === e[0]));
        setSelectedRow(filterSelectedROwData[0]);
    };
    const deliverClickeHandle = (e:any)=>{
        handleRowSelection(e);
        setVisibility(true);
    };

    const deliverBtnHandler = ()=>{
        if(selectedRow.item && selectedRow.quantity && selectedRow.status && selectedRow.userID && selectedRow.id){
            const docRef = doc(db, "OrderHistory", selectedRow.id);
            const payload = {item:selectedRow.item, quantity:selectedRow.quantity,userID:selectedRow.userID, status:"completed" };
            setDoc(docRef, payload);
        }
        setVisibility(false);
    };
    const cancelBtnHandler = ()=>{
        setVisibility(false);
    };
    const displayBox = () =>{
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
                        <Typography variant="h6">Deliver Order</Typography>
                        <div style={{color:"black" , marginTop:"1.5rem"}}>
                            <Typography tabIndex={0} variant="h6">Delivered This Order? Item: {selectedRow.item}  Quantities: {selectedRow.quantity}</Typography>
                            <Button tabIndex={0} onClick={deliverBtnHandler} style={{fontSize:"large" , marginRight:"1.5rem", marginTop:"1rem"}} color="success" variant="outlined">Delivered</Button>
                            <Button tabIndex={0} onClick={cancelBtnHandler} style={{ fontSize:"large", marginTop:"1rem"}} color="error" variant="outlined">cancel</Button>
                        </div>
                    </Box>
                </Box>
            </section>        
        );};

    return <div>
        {(!visibility)? <section>
            <p>welcome <strong>{User.userID}</strong></p>
            <Button tabIndex={0} variant="text" startIcon={<KeyboardBackspaceIcon/>} sx={{ color:"black" , marginTop:3, borderRadius: 50,  marginLeft:20}}>
                <NavLink className="navlink" to="/chef">back</NavLink>
            </Button>
            <Button tabIndex={0} sx={{marginLeft:2, color:"black", marginTop:3, }} variant="text" size="large"  startIcon={<TaskOutlinedIcon/>} >
                <NavLink className="navlink" activeClassName="Anavlink" to="/chef/deliveredOrders">Order Logs</NavLink>
            </Button>
            <div style={{ margin:"auto", padding:"0 3rem 2rem 5rem", width:"40rem"}}>
                <DataGrid rows={rowData} style={{ margin:"1rem"}} columns={columnData}  hideFooter={true}  onSelectionModelChange={handleRowSelection} density="compact" autoHeight />
            </div>
        </section> : displayBox()
        }

    </div>;
};
export default ChefOrder;