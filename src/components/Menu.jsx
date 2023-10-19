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
import Image from "next/image";
import { menu } from "@/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMenu } from "@/context/MenuContext";
import { Auth } from "aws-amplify";
import { useUser } from "@/context/UserContext";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';

const Menu = () => {
  const { userAuth, profileAuth, setTokenProfile, setTokenUser, setClearAll } = useUser();
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
  const LogoutAccount = async () => {
    setClearAll()
    Auth.signOut()
  }
  console.log(profileAuth);

  return (
    userAuth && (
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
              router.push(
                `/home/dashboard?type=${profileAuth?.rol}&id=${profileAuth?.id}`
              );
              updateIndex(0);
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
                  <SubjectRoundedIcon
                    sx={{
                      color:
                        selectedIndex === 1 ? "white" : "#1f1f1f",
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
              router.push(
                `/auth/profiles`
              );
            }}
          >
            <ListItemIcon>
            <KeyboardBackspaceRoundedIcon
            sx={{
              color: "#1f1f1f",
            }}
          />
            </ListItemIcon>
            <ListItemText primary={`Salir del perfil`} />
          </ListItemButton>
          <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.04)" }} />
          <ListItemButton
            // sx={{ borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }}
            selected={selectedIndex === 2}
            onClick={(e) => {
              // setTokenProfile(null);
              // setTokenUser(null);
              LogoutAccount()
              // Auth.signOut();
            }}
          >
            <ListItemIcon>
              <LogoutRoundedIcon
                sx={{
                  color: selectedIndex === 2 ? "white" : "#1f1f1f",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesion" />
          </ListItemButton>
        </List>

        <div className={styles.panel}></div>
      </div>
    )
  );
};

export default Menu;
