import React, { useEffect, useState } from "react";
import styles from "@/styles/Dashboard.module.css";
import Card from "@/components/Card";
import ModalOffice from "@/components/ModalOffice";
import ModalEmployee from "@/components/ModalEmployee";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as queries from "@/graphql/custom/queries/home";
import * as subscriptions from "@/graphql/custom/subscriptions/home";
import TableEmployees from "@/components/TableEmployees";
import TableOffices from "@/components/TableOffices";
import { InputLabel, FormControl, MenuItem, Select, Autocomplete, Box, TextField } from "@mui/material";
import TableTravels from "../TableTravels";

const Dashboard = ({ dataResult, userType }) => {
  const [office, setOffice] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [data, setData] = useState(dataResult);
  const [dataO, setDataO] = useState([]);
  const [dataOfficeTravel, setDataOfficeTravel] = useState([]);
  const [userT, setUserT] = useState(userType);
  const [officeList, setOfficeList] = useState("");
  const [officeListT, setOfficeListT] = useState("");
  const [employeeListT, setEmployeeListT] = useState("");
  const filteredData =  dataOfficeTravel?.bookings?.items?.filter(item => item.createdBy === employeeListT);
  const openOffice = () => {
    setOffice(true);
  };
  const openEmployee = () => {
    setEmployee(true);
  };

  const Agency = async () => {
    const user = await Auth.currentAuthenticatedUser({});
    const list = await API.graphql({
      query: queries.getAgency,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: user?.attributes?.["custom:agencyID"],
      },
    });
    setData(list?.data?.getAgency);
  };
  const Employees = async () => {
    const list = await API.graphql({
      query: queries.getOffice,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: officeList,
      },
    });
    setDataO(list?.data?.getOffice);
  };
  const OfficeTravels = async () => {
    const list = await API.graphql({
      query: queries.getOffice,
      authMode: "AMAZON_COGNITO_USER_POOLS",
      variables: {
        id: officeListT,
      },
    });
    let array = list?.data?.getOffice?.bookings?.items.sort((a, b) => new Date(a.departure.date) - new Date(b.departure.date));
    console.log('AQUI MI BRO', list?.data?.getOffice)
    // setDataTravels(array);
    setDataOfficeTravel(list?.data?.getOffice);
  };

  useEffect(() => {
    if (!office) Agency();
    if (officeList) Employees();
    if (officeListT) OfficeTravels()
  }, [office, employee, officeList, officeListT]);

  return (
    data && (
      <div className={styles.section}>
        <div className={styles.pages}>
          <div className={styles.panel}>
            {userT === "owner" && (
              <>
                <Card
                  title={`Agregar una nueva oficina`}
                  onHandle={openOffice}
                  icon={`bx bx-buildings`}
                />
                <Card
                  title={`Agregar un nuevo empleado`}
                  onHandle={openEmployee}
                  icon={`bx bxs-user-badge`}
                />
              </>
            )}
          </div>

          <div className={styles.agencies}>
            <div className={styles.title}>
              <h2 style={{fontWeight: 'bold'}}>Lista de Oficinas</h2>
            </div>
            {data?.officies?.items && (
              <TableOffices rows={data?.officies?.items} />
            )}
          </div>
          <div className={styles.agencies}>
            <div className={styles.title}>
              <h2 style={{fontWeight: 'bold'}}>Lista de Empleados</h2>
            </div>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                // getOptionLabel={(option) => option.rif}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                options={data?.officies?.items}
                value={officeList}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <div
                      onClick={() => {
                        setOfficeList(option.id);
                      }}
                    >{`Nombre: ${option.name} - Estado: ${option.state} - Ciudad: ${option.city}`}</div>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar oficina" />
                )}
              />
            </FormControl>

            {dataO?.employees?.items ? (
              <TableEmployees rows={dataO?.employees?.items} />
            ) : (
              <div className={styles.nothingTable}>
                Selecciona una oficina para poder ver sus empleados
              </div>
            )}
          </div>
          <div className={styles.agencies}>
            <div className={styles.title}>
              <h2 style={{fontWeight: 'bold'}}>Lista de Viajes</h2>
            </div>
            <div className={styles.inputs}>
            <FormControl sx={{
                width: 500,
              }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                // getOptionLabel={(option) => option.rif}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                options={data?.officies?.items}
                value={officeListT}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <div
                      onClick={() => {
                        setOfficeListT(option.id);
                      }}
                      style={{
                        fontSize: 12
                      }}
                    >{`Nombre: ${option.name} - Estado: ${option.state} - Ciudad: ${option.city}`}</div>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar oficina" />
                )}
              />
            </FormControl>
            <FormControl sx={{
                width: 400,
              }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                // getOptionLabel={(option) => option.rif}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                disabled={!officeListT}
                options={dataOfficeTravel.length !== 0 && dataOfficeTravel?.employees?.items}
                value={employeeListT}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <div
                      onClick={() => {
                        setEmployeeListT(option.id);
                      }}
                      style={{
                        fontSize: 12
                      }}
                    >{`Nombre: ${option.name} - Telefono: ${option.phone} - Email: ${option.email}`}</div>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Seleccionar empleado" />
                )}
              />
            </FormControl>
            </div>
            
            {employeeListT ? <TableTravels type={`employee`} rows={filteredData} /> : dataOfficeTravel?.bookings?.items ? (
              <TableTravels type={`dash`} rows={dataOfficeTravel?.bookings?.items?.sort((a, b) => new Date(a.departure.date) - new Date(b.departure.date))} />
            ) : (
              <div className={styles.nothingTable}>
                Selecciona una oficina o un empleado para ver sus viajes
              </div>
            )}
          </div>
          <ModalOffice open={office} close={() => setOffice(!office)} />
          {data?.officies?.items?.length !== 0 && (
            <ModalEmployee
              open={employee}
              close={() => setEmployee(!employee)}
              offices={data?.officies?.items}
            />
          )}
        </div>
      </div>
    )
  );
};

export default Dashboard;
