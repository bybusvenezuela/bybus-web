import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/constants";
import styles from "@/styles/Login.module.css";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Auth } from 'aws-amplify'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("")
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [userChangePwd, setUserChangePwd] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    clear();
  }, [])
  useEffect(() => {
    if (isNewPassword) setPassword("")
  }, [isNewPassword])


  const clear = () => {
    setEmail("");
    setPassword("");
    setIsNewPassword(false)
    setNewPassword("");
  }

  const onHandleSubmit = async () => {
    setIsLoading(true)
    try {
      const user = await Auth.signIn(email, password)
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setUserChangePwd(user);
        setIsNewPassword(true)
        setPassword("");
        alert("POR FAVOR ACTUALIZAR CONTRASEÑA")
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false)
  }

  const onHandleNewPassword = async () => {
    setIsLoading(true)
    try {
      const result = await Auth.completeNewPassword(userChangePwd, newPassword)
      setIsNewPassword(false)
      alert("CONTRASEÑA ACTUALIZADA, INICIA SESION")
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false)
  }

  return (
    <div className="container section">
      <div className={styles.content}>
        <div className={styles.title}>
          <Image src={login.image} alt=" " />
          <h2>- Panel Administrativo </h2>
        </div>
        <div className={styles.inputs}>
          {isNewPassword && <h3>- Por Favor Actualiza Contraseña</h3>}
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              readOnly: isNewPassword ? true : false,
            }}
          />
          {
            !isNewPassword ?
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" >
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  value={password}
                />
              </FormControl>
              :
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password-new" >
                  Nueva Contraseña
                </InputLabel>
                <OutlinedInput

                  id="outlined-adornment-password-new"
                  type={showNewPassword ? "text" : "password"}
                  onChange={(e) => setNewPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle new password visibility"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        onMouseDown={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="New Password"
                  value={newPassword}
                />
              </FormControl>
          }


        </div>
        <div className={styles.panel}>
          {
            !isNewPassword ?
              <Button color="primary" variant="contained" fullWidth size="large" onClick={onHandleSubmit} disabled={isLoading ? true : false}>
                {isLoading ? <CircularProgress /> : "Ingresar"}
              </Button>
              :
              <Button color="primary" variant="contained" fullWidth size="large" onClick={onHandleNewPassword} disabled={isLoading ? true : false}>
                {isLoading ? <CircularProgress /> : "Cambiar Contraseña"}
              </Button>
          }
          {/* <Link href={`/home/dashboard`} className={styles.forget}>
            Did you forget your password?
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
