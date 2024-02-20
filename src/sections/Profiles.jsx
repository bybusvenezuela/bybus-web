import React, { useRef, useState, useEffect } from "react";
import styles from "@/styles/Profiles.module.css";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Modal from "@mui/material/Modal";
import { TextField, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { Auth, API } from "aws-amplify";
import { getAgency } from "@/graphql/custom/queries/profile";
import {
  updateAgency,
  updateEmployee,
} from "@/graphql/custom/mutations/profile";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import { getOffice, listOffices } from "@/graphql/queries";

const Profiles = ({ error }) => {
  const router = useRouter();
  const { userAuth, profileAuth, setTokenProfile, setClearAll } = useUser();
  const [agency, setAgency] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [firsTime, setFirsTime] = useState(false);
  const [pinModal, setPinModal] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // si hay un usuairo nuevo logeadpo o algun cambio y no esta visinble un modla busco los empleados
  useEffect(() => {
    if (userAuth && !visible) fetchEmployees();
  }, [userAuth, visible]);

  // manejar el boton dinamico de si est avisible o no
  useEffect(() => {
    const stringPin = pinModal.join("");
    if (stringPin.length === 4) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [pinModal]);

  const LogoutAccount = async () => {
    setClearAll();
    Auth.signOut();
  };
  // buscar empleados de dicha agencia
  const fetchEmployees = async () => {
    try {
      const employees = await API.graphql({
        query: getAgency,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          id: userAuth?.attributes["custom:agencyID"],
        },
      });
      setAgency(employees.data.getAgency);
      const newEmployees = employees.data.getAgency.employees.items.filter(
        (item) => item.type === "OFFICE"
      );
      setEmployees(newEmployees);
    } catch (error) {
      console.error(error);
    }
  };
  // cuando seleciono un perfil guardo la info del perfil y averigupo si es la primera vez o no que ingresa
  const onHandleProfileClick = (params) => {
    // guardamos la informacion del perfil
    const saveToLocalStorage = () => {
      try {
        setTokenProfile(params);
      } catch (error) {
        // algun error es nulo
        setTokenProfile(null);
      }
    };
    saveToLocalStorage();
    // verificamos si es primare vez
    switch (params.rol) {
      case "owner":
        if (!agency?.pin) {
          setFirsTime(true);
        } else {
          setFirsTime(false);
        }
        break;
      case "employee":
        if (!params?.data.pin) {
          setFirsTime(true);
        } else {
          setFirsTime(false);
        }
        break;
      default:
        break;
    }
    // mostramos el modal
    setVisible(true);
  };
  // para manejar el evento de escritura del pin del perfil
  const handlePinChange = (index, value) => {
    const newPin = [...pinModal];
    newPin[index] = value;

    if (value === "" && index > 0) {
      // Retroceder al input anterior si se borra un dígito
      inputRefs[index - 1].current.focus();
    } else if (value !== "" && index < inputRefs.length - 1) {
      // Avanzar al siguiente input si se ingresa un dígito no vacío
      inputRefs[index + 1].current.focus();
    }

    setPinModal(newPin);
  };

  // limpiar todo
  const handleClear = () => {
    setPinModal(["", "", "", ""]);
    inputRefs[0].current.focus(); // Volver al primer input
  };
  // para verificar la contraseña colocada
  const onHandlePress = async () => {
    const stringPin = pinModal.join("");
    console.log("BUSCANDO EL OFFICE ID", profileAuth.data?.officeID);
    setIsLoading(true);
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
              `/home/dashboard?type=${profileAuth?.rol}&id=${profileAuth?.id}`
            );
          } else {
            const pin = agency.pin;
            if (pin === stringPin) {
              router.push(
                `/home/dashboard?type=${profileAuth?.rol}&id=${profileAuth?.id}`
              );
            } else {
              handleClear();
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
              `/home/dashboard?type=${profileAuth?.rol}&id=${profileAuth?.id}&offficeID=${profileAuth?.officeID}`
            );
          } else {
            const pin = profileAuth?.data?.pin;
            if (pin === stringPin) {
              router.push(
                `/home/dashboard?type=${profileAuth?.rol}&id=${profileAuth?.id}&offficeID=${profileAuth?.officeID}`
              );
            } else {
              alert("pin incorrecto");
            }
          }
          break;
        default:
          break;
      }
      setTokenProfile({ ...profileAuth, pin: stringPin });
    } catch (error) {
      const { message } = new Error(error);
      console.error("Error en crear: ", message);
    }
    setIsLoading(false);
  };

  return (
    <div className="container section">
      <div className={styles.content}>
        <h1 className={styles.title}>
          Elija un perfil para acceder al panel -{" "}
          <Button variant="contained" color="error" onClick={LogoutAccount}>
            CERRAR SESION
          </Button>
        </h1>
        {userAuth && (
          <div className={styles.profiles}>
            {userAuth?.attributes && (
              <AccountManager
                onHandleProfileClick={onHandleProfileClick}
                agencyID={userAuth?.attributes["custom:agencyID"]}
              />
            )}
            {employees?.length > 0 &&
              employees.map((item, index) => (
                <>
                  {item?.type === "OFFICE" && (
                    <>
                      {console.log("EMPELADO: ", item)}
                      <AccountEmployee
                        onHandleProfileClick={onHandleProfileClick}
                        name={item.name}
                        type={item.type}
                        key={`${index}-acc`}
                        data={item}
                      />
                    </>
                  )}
                </>
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
                handleClear();
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
                {pinModal.map((digit, index) => (
                  <TextField
                    key={`${index}-text`}
                    id="outlined-basic"
                    variant="outlined"
                    inputProps={{
                      maxLength: 1,
                    }}
                    value={digit}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    inputRef={inputRefs[index]}
                  />
                ))}
              </div>
              <Button
                variant="contained"
                size="large"
                disabled={buttonDisabled || isLoading ? true : false}
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

const AccountEmployee = ({
  onHandleProfileClick,
  name = "",
  type = "",
  data = "",
}) => {
  const params = {
    id: data.id,
    officeID: data.officeID,
    rol: "employee",
    data: data,
  };
  const [office, setOffice] = useState(null);
  const agencyFetch = async () => {
    const result = await API.graphql({
      query: getOffice,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: data.officeID,
      },
    });
    setOffice(result.data.getOffice);
  };

  useEffect(() => {
    agencyFetch();
  }, []);

  return (
    <div
      className={styles.profile}
      onClick={() => onHandleProfileClick(params)}
    >
      <p
        style={{
          fontSize: 14,
        }}
      >
        Oficina: {office?.state}-{office?.city}
      </p>
      <PersonRoundedIcon
        sx={{ color: "rgba(0, 0, 0, 0.85)", height: 100, width: 100 }}
      />
      <div className={styles.profileName}>
        <p>{name} -</p>
        {type === "OFFICE" && (
          <ApartmentIcon
            sx={{ color: "rgba(0, 0, 0, 0.85)", height: 30, width: 30 }}
          />
        )}
      </div>
    </div>
  );
};
const AccountManager = ({ onHandleProfileClick, agencyID = null }) => {
  const params = {
    id: agencyID,
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
      <div className={styles.profileName}>
        <p>Administrador- </p>
        <SupervisorAccountIcon
          sx={{ color: "rgba(0, 0, 0, 0.85)", height: 30, width: 30 }}
        />
      </div>
    </div>
  );
};
