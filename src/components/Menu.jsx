import React, { useState } from "react";
import styles from "@/styles/Menu.module.css";
import {
  List,
  ListItemText,
  ListItemButton,
  Collapse,
  Divider,
  ListItemIcon,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Image from "next/image";
import { menu } from "@/constants";
import { useRouter } from "next/navigation";
import { useMenu } from "@/context/MenuContext";

const Menu = () => {
  const { updateIndex, selectedIndex } = useMenu();
  const router = useRouter();
  const [openAgencies, setOpenAgencies] = useState(true);
  const [openUsers, setOpenUsers] = useState(true);

  const handleAgencies = () => {
    setOpenAgencies(!openAgencies);
  };
  const handleUsers = () => {
    setOpenUsers(!openUsers);
  };

  return (
    <div className={styles.menu}>
      <div className={styles.logo}>
        <Image src={menu.image} alt="" />
      </div>
      <List
        sx={{
          width: "100%",
          padding: 0,
          border: "1px solid rgba(0, 0, 0, 0.14)",
          borderRadius: "8px",
          color: "#1e1e1e",
          "&& .Mui-selected, && .Mui-selected:hover": {
            bgcolor: "#1e1e1e",
            color: "#fff",
          },
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          sx={{ borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }}
          selected={selectedIndex === 0}
          onClick={(e) => {
            e.preventDefault;
            router.push("/home/dashboard");
            updateIndex(0);
            console.log(selectedIndex);
          }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: selectedIndex === 0 ? 'white' : 'rgba(0, 0, 0, 0.54)' }}/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }} />

        <ListItemButton onClick={handleAgencies}>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Agencies" />
          {openAgencies ? <ExpandLessIcon sx={{ color: 'rgba(0, 0, 0, 0.54)'}} /> : <ExpandMoreIcon sx={{ color: 'rgba(0, 0, 0, 0.54)'}}/>}
        </ListItemButton>
        <Collapse in={openAgencies} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Divider
              sx={{ width: "93%", position: "relative", right: "-7%" }}
            />

            <ListItemButton
              sx={{
                pl: 4,
                width: "95%",
                position: "relative",
                right: "-5%",
                borderTopLeftRadius: "7px",
                borderBottomLeftRadius: "7px",
              }}
              selected={selectedIndex === 1}
              onClick={(e) => {
                e.preventDefault;
                router.push(`/home/agencies/panel`);
                updateIndex(1);
                console.log(selectedIndex);
              }}
            >
              <ListItemText primary="Panel" />
            </ListItemButton>
            <Divider
              sx={{ width: "93%", position: "relative", right: "-7%" }}
            />
            <ListItemButton
              sx={{
                pl: 4,
                width: "95%",
                position: "relative",
                right: "-5%",
                borderTopLeftRadius: "7px",
                borderBottomLeftRadius: "7px",
              }}
              selected={selectedIndex === 2}
              onClick={(e) => {
                e.preventDefault;
                router.push(`/home/agencies/list`);
                updateIndex(2);
                console.log(selectedIndex);
              }}
            >
              <ListItemText primary="List" />
            </ListItemButton>
            <Divider
              sx={{ width: "93%", position: "relative", right: "-7%" }}
            />

            <ListItemButton
              sx={{
                pl: 4,
                width: "95%",
                position: "relative",
                right: "-5%",
                borderTopLeftRadius: "7px",
                borderBottomLeftRadius: "7px",
              }}
              selected={selectedIndex === 3}
              onClick={(e) => {
                e.preventDefault;
                router.push(`/home/agencies/travels`);
                updateIndex(3);
                console.log(selectedIndex);
              }}
            >
              <ListItemText primary="Travels" />
            </ListItemButton>
            <Divider
              sx={{ width: "93%", position: "relative", right: "-7%" }}
            />

            <ListItemButton
              sx={{
                pl: 4,
                width: "95%",
                position: "relative",
                right: "-5%",
                borderTopLeftRadius: "7px",
                borderBottomLeftRadius: "7px",
              }}
              selected={selectedIndex === 4}
              onClick={(e) => {
                e.preventDefault;
                router.push(`/home/agencies/tickets`);
                updateIndex(4);
                console.log(selectedIndex);
              }}
            >
              <ListItemText primary="Tickets" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }} />

        <ListItemButton onClick={handleUsers}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
          {openUsers ? <ExpandLessIcon sx={{ color: 'rgba(0, 0, 0, 0.54)'}}/> : <ExpandMoreIcon sx={{ color: 'rgba(0, 0, 0, 0.54)'}}/>}
        </ListItemButton>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Divider
              sx={{ width: "93%", position: "relative", right: "-7%" }}
            />

            <ListItemButton
              sx={{
                pl: 4,
                width: "95%",
                position: "relative",
                right: "-5%",
                borderTopLeftRadius: "7px",
                borderBottomLeftRadius: "7px",
              }}
              selected={selectedIndex === 5}
              onClick={(e) => {
                e.preventDefault;
                router.push(`/home/users/panel`);
                updateIndex(5);
                console.log(selectedIndex);
              }}
            >
              <ListItemText primary="Panel" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }} />
        <ListItemButton
          sx={{ borderBottomLeftRadius: "7px", borderBottomRightRadius: "7px" }}
          selected={selectedIndex === 6}
          onClick={(e) => {
            e.preventDefault;
            router.push("/home/configuration");
            updateIndex(6);
            console.log(selectedIndex);
          }}
        >
          <ListItemIcon>
            <SettingsIcon sx={{ color: selectedIndex === 6 ? 'white' : 'rgba(0, 0, 0, 0.54)' }}/>
          </ListItemIcon>
          <ListItemText primary="Configuration" />
        </ListItemButton>
      </List>
      <div className={styles.panel}>
        
      </div>
    </div>
  );
};

export default Menu;
