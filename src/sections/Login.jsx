import React, { useState } from "react";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <div className="container section">
      <div className={styles.content}>
        <div className={styles.title}>
          <Image src={login.image} alt=" " />
          <h2>- Panel de Agencias </h2>
        </div>
        <div className={styles.inputs}>
          <TextField id="email" label="Email" variant="outlined"/>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
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
            />
          </FormControl>
        </div>

        <div className={styles.panel}>
          <Link href={`/home/dashboard`}>
            <Button color="primary" variant="contained" fullWidth size="large">
              Connect
            </Button>
          </Link>
          <Link href={`/home/dashboard`} className={styles.forget}>
            Did you forget your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
