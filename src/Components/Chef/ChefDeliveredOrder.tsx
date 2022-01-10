/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { NavLink } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext } from "react";
import { Button } from "@mui/material";
import ContextOrders from "../Contexts/ContextOrders";
import ContextUserID from "../Contexts/ContextUserID";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const ChefDeliveredOrder = ()=>{
    const Orders = useContext(ContextOrders);
    const User = useContext(ContextUserID);

    const completedOrders = Orders.filter((data:any)=> data.status === "completed" );
    const rowData = completedOrders?.map((data:any) => {
        return{
            items:data.item, quantity:data.quantity, status:data.status, userID:data.userID, id:data.id,
        };
    });

    const columnData: GridColDef[] = [
        {field: "items", headerName: "Items", headerAlign:"center", width:150},
        {field: "quantity", headerName: "Quantity", headerAlign: "center", width:100},
        {field: "status", headerName: "Status", headerAlign: "center",  width:100},
        {field: "userID", headerName: "UserID", headerAlign: "center",  width:100},
    ];

    return <div>
        <p>welcome <strong>{User.userID}</strong></p>
        <Button tabIndex={0} variant="text" startIcon={<KeyboardBackspaceIcon/>} sx={{ color:"black" , marginTop:3, borderRadius: 50,  marginLeft:20}}>
            <NavLink className="navlink" to="/chef/order">back</NavLink>
        </Button>
        <div style={{ margin:"auto", padding:"0 3rem 2rem 5rem", width:"32rem"}}>
            <DataGrid rows={rowData} style={{ margin:"1rem"}} columns={columnData}  hideFooter={true} density="compact" autoHeight />
        </div>

    </div>;
};
export default ChefDeliveredOrder;