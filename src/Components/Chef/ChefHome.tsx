/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DisplayBoxComponent from "../DisplayBoxComponent";
import ContextMenu from "../Contexts/ContextMenu";
import ContextUserID from "../Contexts/ContextUserID";

const ChefWelcome = ()=>{
    
    const Menu = useContext(ContextMenu);
    const User = useContext(ContextUserID);
    const [selectedRow, setSelectedRow] = useState({foodName:"" ,recipe:"" , id:"" });
    const [type, setType] = useState("");
    const rowData = Menu?.map((data:any) => {
        return{
            id:data.id, items:data.foodName, recipes:data.recipe,
        };});
        
    const columnData: GridColDef[] = [
        {field: "items", headerName: "Items", width:150 , headerAlign: "center",  },
        {field: "recipes", headerName: "Recipes",  width:300 ,headerAlign: "center"},
        {field: "actions",  headerName: "Actions", sortable: false, width: 150, headerAlign: "center", renderCell: () => {
            return (
                <div style={{display:"flex" , flexDirection:"row"} }> 
                    <Button tabIndex={0} style={{color:"black"}} onClick={editClickeHandle} id="Edit" aria-label="Edit Button" variant="text" startIcon={<EditIcon />}></Button>
                    <div tabIndex={0} style={{borderLeft:"solid gray 0.1rem" , paddingLeft:"0.5rem"}} >
                        <Button style={{color:"#1976d2"}} onClick={deleteClickeHandle} id="Delete" aria-label="Delete Button" variant="text" color="primary" startIcon={<DeleteIcon />}></Button>
                    </div></div>
            );
        }},
    ];

    const handleRowSelection = (e:any) => {
        const filterSelectedROwData = (Menu?.filter((data:any)=> data.id === e[0]));
        setSelectedRow(filterSelectedROwData[0]);
    };
    const createNewMenuHandler = () =>{ setType("create") ; setSelectedRow({ foodName:"", recipe:"", id:""}); };
    const deleteClickeHandle = (e:any) =>{ handleRowSelection(e);  setType("delete"); setSelectedRow({ foodName:"", recipe:"", id:""}); };
    const editClickeHandle = (e:any) =>{ handleRowSelection(e);  setType("edit"); setSelectedRow({ foodName:"", recipe:"", id:""}); };
    const typeHandler = ()=> setType("");

    return <div>
        <p>welcome <strong>{User.userID}</strong></p>
        <nav style={{marginTop:"2rem", }}>
            <Button tabIndex={0} sx={{ color:"black" }} 
                variant="text" size="large"  startIcon={<FastfoodRoundedIcon/>}>
                <NavLink className="navlink" activeClassName="Anavlink" to="/chef/order">Orders</NavLink>           
            </Button>

            <Button tabIndex={0} onClick={createNewMenuHandler} startIcon={<MenuBookIcon/>} sx=  {{borderRadius: 50 , fontWeight:"bold", marginLeft:2, color:"black" }} variant="text" >Create New Menu</Button>
        </nav>
        <div style={{marginTop:"1rem"}}>
            <div style={{ margin:"auto", padding:"0rem 3rem 2rem 5rem", width:"45rem"}}>
                <DataGrid style={{ margin:"2rem"}} rows={rowData} columns={columnData} hideFooter={true} onSelectionModelChange={handleRowSelection} density="compact" autoHeight />
            </div>
            {type? <DisplayBoxComponent type={type} selectedRowData={selectedRow} OnType={typeHandler} />: ""}
        </div>
    </div>;
};
export default ChefWelcome;
