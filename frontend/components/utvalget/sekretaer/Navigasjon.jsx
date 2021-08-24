import React from "react";

import { useRouter } from "next/router";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const Navigasjon = () => {
  const router = useRouter();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color={
          router.pathname === "/utvalget/sekretaer" ? "primary" : "inherit"
        }
        onClick={() => router.push("/utvalget/sekretaer")}
        style={{ cursor: "pointer" }}
      >
        Åpmandsverv
      </Link>
      <Link
        color={
          router.pathname === "/utvalget/sekretaer/utvalgsverv"
            ? "primary"
            : "inherit"
        }
        onClick={() => router.push("/utvalget/sekretaer/utvalgsverv")}
        style={{ cursor: "pointer" }}
      >
        Utvalgsverv
      </Link>
      <Link
        color={
          router.pathname === "/utvalget/sekretaer/helga"
            ? "primary"
            : "inherit"
        }
        onClick={() => router.push("/utvalget/sekretaer/helga")}
        style={{ cursor: "pointer" }}
      >
        Helga
      </Link>
      <Link
        color={
          router.pathname === "/utvalget/sekretaer/lister"
            ? "primary"
            : "inherit"
        }
        onClick={() => router.push("/utvalget/sekretaer/lister")}
        style={{ cursor: "pointer" }}
      >
        Skrive ut lister
      </Link>
    </Breadcrumbs>
  );
};

export default Navigasjon;
