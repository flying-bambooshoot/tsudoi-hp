import React from "react";
import { Drawer } from "@mui/material";

function Sidebar() {
    return (
        <>
            <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                {list(anchor)}
            </Drawer>
            <div className="Sidebar"></div></>)
}

export default Sidebar;