/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext } from "react";
import ContextUserID from "../Contexts/ContextUserID";
import ContextOrders from "../Contexts/ContextOrders";
import { NavLink } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const UserDeliveredOrders = () =>{

    const User = useContext(ContextUserID);
    const Orders = useContext(ContextOrders);
    
    const columns: GridColDef[] = [
        {field: "Items", headerName: "Items", width:150 ,headerAlign: "center"},
        {field: "Quantity", headerName: "Quantity",  width:150, headerAlign: "center"},
        {field: "Status", headerName: "Status",  width:150, headerAlign: "center"},
    ];    
    const order = Orders?.filter((data:any)=>  data.userID === User.userID);
    const UserOrders = order?.filter((data:any)=>  data.status === "completed");

    const rowData = UserOrders?.map((data:any) => {
        return{
            Items:data.item,
            Quantity:data.quantity,
            Status:data.status,
            id:data.id,
        };
    });

    return(<div>
        <p>welcome <strong>{User.userID}</strong></p>
        <Button variant="text" startIcon={<KeyboardBackspaceIcon/>} sx={{ color:"black" , marginTop:3, borderRadius: 50,  marginLeft:20}}>
            <NavLink className="navlink" to="/user">back</NavLink>
        </Button>
        <div style={{ margin:"auto", padding:"0rem 3rem 2rem 5rem", width:"35rem"}}>
            <DataGrid rows={rowData} columns={columns} style={{ margin:"2rem"}} hideFooter={true} density="compact" autoHeight />
        </div>
    </div>);
};
export default UserDeliveredOrders;