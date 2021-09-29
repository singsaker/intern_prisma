/* eslint-disable jsx-a11y/anchor-is-valid */
// ROUTER MÅ BYTTES UT TIL NEXT/LINK HER

import React from "react";

import { useRouter } from "next/router";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const Navigasjon = () => {
  const router = useRouter();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color={router.pathname === "/utvalget/sekretaer" ? "primary" : "inherit"}
        onClick={() => router.push("/utvalget/sekretaer")}
        style={{ cursor: "pointer" }}
      >
        Åpmandsverv
      </Link>
      <Link
        color={router.pathname === "/utvalget/sekretaer/utvalgsverv" ? "primary" : "inherit"}
        onClick={() => router.push("/utvalget/sekretaer/utvalgsverv")}
        style={{ cursor: "pointer" }}
      >
        Utvalgsverv
      </Link>
      <Link
        color={router.pathname === "/utvalget/sekretaer/helga" ? "primary" : "inherit"}
        onClick={() => router.push("/utvalget/sekretaer/helga")}
        style={{ cursor: "pointer" }}
      >
        Helga
      </Link>
      <Link
        color={router.pathname === "/utvalget/sekretaer/lister" ? "primary" : "inherit"}
        onClick={() => router.push("/utvalget/sekretaer/lister")}
        style={{ cursor: "pointer" }}
      >
        Skrive ut lister
      </Link>
    </Breadcrumbs>
  );
};

export default Navigasjon;
