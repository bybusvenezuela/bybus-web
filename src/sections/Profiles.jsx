import React, { useRef, useState, useEffect } from "react";
import styles from "@/styles/Profiles.module.css";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Modal from "@mui/material/Modal";
import { TextField, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { Auth, API } from "aws-amplify";
import { getAgency } from "@/graphql/queries";
import {
  updateAgency,
  updateEmployee,
} from "@/graphql/custom/mutations/profile";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
const Profiles = ({ error }) => {
  // if (error) alert(error);
  const router = useRouter();
  const { userAuth, setUserAuth, profileAuth, setProfileAuth } = useUser();
  const [agency, setAgency] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firsTime, setFirsTime] = useState(false);
  const [modalParams, setmodalParams] = useState(null);
  const [pin, setPin] = useState([]);
  const one = useRef();
  const two = useRef();
  const three = useRef();
  const four = useRef();
  const five = useRef();
  const six = useRef();
  useEffect(() => {
    if (userAuth) fetchEmployees();
  }, [userAuth]);

  const fetchEmployees = async () => {
    try {
      console.log(userAuth);
      const employees = await API.graphql({
        query: getAgency,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          id: userAuth?.attributes["custom:agencyID"],
        },
      });
      setAgency(employees.data.getAgency);
      setEmployees(employees.data.getAgency.employees.items);
    } catch (error) {
      console.error("Ocurrrio un error");
    }
  };

  const onHandleProfileClick = (params) => {
    const saveToLocalStorage = () => {
      try {
        setProfileAuth(params);
        localStorage.setItem("profileAuth", JSON.stringify(params));
      } catch (error) {
        setProfileAuth(null);
        console.error("Error al guardar en el local storage:", error);
      }
    };
    saveToLocalStorage();
    switch (params.rol) {
      case "owner":
        if (!agency.pin) setFirsTime(true);
        break;
      case "employee":
        if (!params.data.pin) setFirsTime(true);
        break;
      default:
        break;
    }
    setVisible(true);
  };

  const onHandlePress = async () => {
    const stringPin = pin.join("");

    try {
      switch (profileAuth.rol) {
        case "owner":
          if (firsTime) {
            await API.graphql({
              query: updateAgency,
              authMode: "AMAZON_COGNITO_USER_POOLS",
              variables: {
                input: {
                  id: agency.id,
                  pin: stringPin,
                },
              },
            });
            router.push(
              `/home/dashboard?type=${profileAuth.rol}&pin=${stringPin}&id=${userAuth.attributes["custom:agencyID"]}`
            );
          } else {
            const pin = agency.pin;
            if (pin === stringPin) {
              router.push(
                `/home/dashboard?type=${profileAuth.rol}&pin=${stringPin}&id=${userAuth.attributes["custom:agencyID"]}`
              );
            } else {
              alert("pin incorrecto");
            }
          }
          break;
        case "employee":
          if (firsTime) {
            await API.graphql({
              query: updateEmployee,
              authMode: "AMAZON_COGNITO_USER_POOLS",
              variables: {
                input: {
                  id: profileAuth?.data?.id,
                  pin: stringPin,
                },
              },
            });
            router.push(
              `/home/dashboard?type=${profileAuth.rol}&pin=${stringPin}&id=${profileAuth?.data?.id}`
            );
          } else {
            const pin = profileAuth?.data?.pin;
            if (pin === stringPin) {
              router.push(
                `/home/dashboard?type=${profileAuth.rol}&pin=${stringPin}&id=${profileAuth?.data?.id}`
              );
            } else {
              alert("pin incorrecto");
            }
          }
          break;
        default:
          break;
      }
    } catch (error) {
      const { message } = new Error(error);
      console.error("Error en crear: ", message);
    }
    // reset();
  };

  const reset = () => {
    setVisible(false);
    setPin([]);
  };
  return (
    <div className="container section">
      <div className={styles.content}>
        <h1 className={styles.title}>Elija un perfil para acceder al panel</h1>
        {userAuth && (
          <div className={styles.profiles}>
            <AccountManager onHandleProfileClick={onHandleProfileClick} />
            {employees?.length > 0 &&
              employees.map((item, index) => (
                <AccountEmployee
                  onHandleProfileClick={onHandleProfileClick}
                  name={item.name}
                  key={index}
                  data={item}
                />
              ))}
          </div>
        )}
      </div>
      <Modal
        open={visible}
        // onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div
              className={styles.arrow}
              onClick={() => {
                setVisible(false);
                setPin([]);
              }}
            >
              <ArrowBackRoundedIcon
                sx={{
                  color: "rgba(0, 0, 0, 0.85)",
                  height: 30,
                  width: 30,
                }}
              />
            </div>
            <div className={styles.panel}>
              <h2 className={styles.modalTitle}>
                {firsTime ? "Primera Vez" : "Ingresa tu Ping"}
              </h2>
              <div className={styles.inputs}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPin([...pin, e.target.value]);
                    two.current.focus();
                  }}
                  inputRef={one}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPin([...pin, e.target.value]);
                    three.current.focus();
                  }}
                  inputRef={two}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPin([...pin, e.target.value]);
                    four.current.focus();
                  }}
                  inputRef={three}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPin([...pin, e.target.value]);
                    five.current.focus();
                  }}
                  inputRef={four}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPin([...pin, e.target.value]);
                    six.current.focus();
                  }}
                  inputRef={five}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPin([...pin, e.target.value]);
                  }}
                  inputRef={six}
                />
              </div>
              <Button
                variant="contained"
                size="large"
                disabled={isLoading ? true : false}
                onClick={onHandlePress}
              >
                {isLoading ? <CircularProgress /> : "Ingresar"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profiles;

const AccountEmployee = ({ onHandleProfileClick, name = "", data = "" }) => {
  const params = {
    rol: "employee",
    data: data,
  };
  return (
    <div
      className={styles.profile}
      onClick={() => onHandleProfileClick(params)}
    >
      <PersonRoundedIcon
        sx={{ color: "rgba(0, 0, 0, 0.85)", height: 100, width: 100 }}
      />
      <p>{name}</p>
    </div>
  );
};
const AccountManager = ({ onHandleProfileClick }) => {
  const params = {
    rol: "owner",
    data: null,
  };
  return (
    <div
      className={styles.profile}
      onClick={() => onHandleProfileClick(params)}
    >
      <ManageAccountsRoundedIcon
        sx={{ color: "rgba(0, 0, 0, 0.85)", height: 100, width: 100 }}
      />
      <p>Administrador</p>
    </div>
  );
};

// export async function getServerSideProps({ query, req }) {
//   const SSR = withSSRContext({ req });
//   try {
//     SSR.Auth.currentAuthenticatedUser().then((r) => console.log(r));
//     return {
//       props: {},
//     };
//   } catch (error) {
//     return {
//       props: {},
//     };
//   }
// }
