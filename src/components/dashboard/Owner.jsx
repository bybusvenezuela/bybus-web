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
import { InputLabel, FormControl, MenuItem, Select } from "@mui/material";
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
              <h2>Lista de Oficinas</h2>
            </div>
            {data?.officies?.items && (
              <TableOffices rows={data?.officies?.items} />
            )}
          </div>
          <div className={styles.agencies}>
            <div className={styles.title}>
              <h2>Lista de Empleados</h2>
            </div>
            <FormControl
              sx={{
                width: 900,
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Seleccionar oficina
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={officeList}
                label="Seleccionar oficina"
                onChange={(e) => setOfficeList(e.target.value)}
              >
                {data?.officies?.items.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.id}
                  >{`ID: ${item.id} - Nombre: ${item.name} - Estado: ${item.state} - Ciudad: ${item.city}`}</MenuItem>
                ))}
              </Select>
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
              <h2>Lista de Viajes</h2>
            </div>
            <div className={styles.inputs}>
            <FormControl
              sx={{
                width: 400,
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Seleccionar oficina
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={officeListT}
                label="Seleccionar oficina"
                onChange={(e) => setOfficeListT(e.target.value)}
              >
                {data?.officies?.items.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.id}
                  >{`ID: ${item.id} - Nombre: ${item.name} - Estado: ${item.state} - Ciudad: ${item.city}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: 400,
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Seleccionar empleado
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={employeeListT}
                label="Seleccionar empleado"
                disabled={!officeListT}
                onChange={(e) => setEmployeeListT(e.target.value)}
              >
                {dataOfficeTravel?.employees?.items.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.id}
                  >{`Nombre: ${item.name} - Telefono: ${item.phone} - Email: ${item.email}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            </div>
            
            {employeeListT ? <TableTravels rows={filteredData} /> : dataOfficeTravel?.bookings?.items ? (
              <TableTravels rows={dataOfficeTravel?.bookings?.items} />
            ) : (
              <div className={styles.nothingTable}>
                Selecciona una oficina o un empleado para ver sus viajes
              </div>
            )}
          </div>
          <ModalOffice open={office} close={() => setOffice(!office)} />
          {data?.officies?.items?.length > 0 && (
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
