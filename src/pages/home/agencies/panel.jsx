import Menu from "@/components/Menu";
import React, { useState } from "react";
import styles from "@/styles/Agencies.module.css";
import TableAgencies from "@/components/TableAgencies";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import ModalAgencies from "@/components/ModalAgencies";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import StoreIcon from "@mui/icons-material/Store";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import AddIcon from '@mui/icons-material/Add';
import ModalTravel from "@/components/ModalTravel";
import ModalTicket from "@/components/ModalTicket";

const Panel = () => {
  const router = useRouter();
  let route = router.pathname.split("/");
  const [openAgencies, setOpenAgencies] = useState(false);
  const [openTravel, setOpenTravel] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  return (
    <div className={styles.content}>
      <Menu />
      <div className="container section">
        <div className={styles.navbar}>
          <Link href={`/home/agencies/`}>
            {route[2] === "agencies" ? "Agencies" : "no"}
          </Link>
          <div>{">"}</div>
          <Link href={`/home/agencies/`}>
            {route[3] === "panel" ? "Panel" : "no"}
          </Link>
        </div>
        <div className={styles.panel}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenAgencies(true)}
            startIcon={<StoreIcon />}
            endIcon={<AddIcon />}
          >
            Add new agency
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenTravel(true)}
            startIcon={<AirportShuttleIcon />}
            endIcon={<AddIcon />}
          >
            Add new travel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenTicket(true)}
            startIcon={<ConfirmationNumberIcon />}
            endIcon={<AddIcon />}
          >
            Add new ticket
          </Button>
          <ModalAgencies open={openAgencies} close={() => setOpenAgencies(false)} />
          <ModalTravel open={openTravel} close={() => setOpenTravel(false)} />
          <ModalTicket open={openTicket} close={() => setOpenTicket(false)} />
        </div>
        <div className={styles.stats}>
          <div className={styles.title}>
            <h2>Stadistics</h2>
          </div>
        </div>

        <div className={styles.agencies}>
          <div className={styles.title}>
            <h2>List of Agencies</h2>
          </div>
          <TableAgencies />
        </div>
      </div>
    </div>
  );
};

export default Panel;
