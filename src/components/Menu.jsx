import React, { useState } from "react";
import styles from "@/styles/Menu.module.css";
import {
  List,
  ListItemText,
  ListItemButton,
  Divider,
  ListItemIcon,
} from "@mui/material";
import Image from "next/image";
import { menu } from "@/constants";
import { useRouter } from "next/navigation";
import { useMenu } from "@/context/MenuContext";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { Auth } from "aws-amplify";

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
            e.preventDefault();
            router.push("/home/dashboard");
            updateIndex(0);
            console.log(selectedIndex);
          }}
        >
          <ListItemIcon>
            <DashboardRoundedIcon
              sx={{
                color: selectedIndex === 0 ? "white" : "#1f1f1f",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Panel de control" />
        </ListItemButton>
        <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }} />
        <ListItemButton
          // sx={{ borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }}
          selected={selectedIndex === 1}
          onClick={(e) => {
            e.preventDefault();
            router.push("/home/management");
            updateIndex(1);
            console.log(selectedIndex);
          }}
        >
          <ListItemIcon>
            <PaidRoundedIcon
              sx={{
                color: selectedIndex === 1 ? "white" : "#1f1f1f",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Gestion de pagos" />
        </ListItemButton>
        <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }} />
        <ListItemButton
          // sx={{ borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }}
          selected={selectedIndex === 2}
          onClick={(e) => {
            e.preventDefault();
            router.push("/home/support");
            updateIndex(2);
            console.log(selectedIndex);
          }}
        >
          <ListItemIcon>
            <SupportAgentRoundedIcon
              sx={{
                color: selectedIndex === 2 ? "white" : "#1f1f1f",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Devoluciones" />
        </ListItemButton>
        <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }} />
        <ListItemButton
          // sx={{ borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }}
          selected={selectedIndex === 3}
          onClick={(e) => {
            e.preventDefault();
            router.push("/home/pays");
            updateIndex(3);
            console.log(selectedIndex);
          }}
        >
          <ListItemIcon>
            <AccountBalanceRoundedIcon
              sx={{
                color: selectedIndex === 3 ? "white" : "#1f1f1f",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Aceptar pagos" />
        </ListItemButton>
        <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }} />
        <ListItemButton
          sx={{ borderBottomLeftRadius: "7px", borderBottomRightRadius: "7px" }}
          selected={selectedIndex === 6}
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
            Auth.signOut();
          }}
        >
          <ListItemIcon>
            <LogoutRoundedIcon
              sx={{
                color: selectedIndex === 6 ? "white" : "#1f1f1f",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesion" />
        </ListItemButton>
      </List>
      {/* <div className={styles.panel}></div> */}
    </div>
  );
};

export default Menu;
