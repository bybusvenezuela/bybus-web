import React, { useState, useEffect } from "react";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Image from "next/image";
import { menu } from "@/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMenu } from "@/context/MenuContext";
import { Auth } from "aws-amplify";
import { useUser } from "@/context/UserContext";


const Menu = () => {
  const { userAuth, profileAuth, setTokenProfile, setTokenUser } = useUser();
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
  console.log(profileAuth);

  return (
    userAuth && (
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Image src={menu.image} alt="" />
        </div>

        <Link href="/auth/profiles">
          <ArrowBackIcon
            sx={{
              color: selectedIndex === 0 ? "black" : "rgba(0, 0, 0, 0.54)",
            }}
          />
          {profileAuth?.rol === "owner"
            ? "Administrador"
            : profileAuth?.rol === "employee" && profileAuth?.data?.name}
        </Link>

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
              router.push(
                `/home/dashboard?type=${profileAuth?.rol}&id=${profileAuth?.id}`
              );
              updateIndex(0);
            }}
          >
            <ListItemIcon>
              <DashboardIcon
                sx={{
                  color: selectedIndex === 0 ? "white" : "rgba(0, 0, 0, 0.54)",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Panel de control" />
          </ListItemButton>
          <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }} />

          {profileAuth?.rol === "owner" && (
            <>
              <ListItemButton
                // sx={{ borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }}
                selected={selectedIndex === 1}
                onClick={(e) => {
                  e.preventDefault;
                  router.push(
                    `/home/travels?type=${profileAuth?.rol}&id=${profileAuth?.id}`
                  );
                  updateIndex(1);
                }}
              >
                <ListItemIcon>
                  <DashboardIcon
                    sx={{
                      color:
                        selectedIndex === 1 ? "white" : "rgba(0, 0, 0, 0.54)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Viajes" />
              </ListItemButton>
              <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }} />
            </>
          )}
          <ListItemButton
            // sx={{ borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }}
            selected={selectedIndex === 2}
            onClick={(e) => {
              setTokenProfile(null);
              setTokenUser(null);
              Auth.signOut();
            }}
          >
            <ListItemIcon>
              <DashboardIcon
                sx={{
                  color: selectedIndex === 2 ? "white" : "rgba(0, 0, 0, 0.54)",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesion" />
          </ListItemButton>
        </List>

        <div className={styles.panel}></div>
      </div>
    )
  );
};

export default Menu;
