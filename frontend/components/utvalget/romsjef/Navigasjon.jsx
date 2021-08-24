import React from "react";

import { useRouter } from "next/router";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const Navigasjon = () => {
  const router = useRouter();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color={router.pathname === "/utvalget/romsjef" ? "primary" : "inherit"}
        onClick={() => router.push("/utvalget/romsjef")}
        style={{ cursor: "pointer" }}
      >
        Beboerliste
      </Link>
      <Link
        color={
          router.pathname === "/utvalget/romsjef/gamlebeboere"
            ? "primary"
            : "inherit"
        }
        onClick={() => router.push("/utvalget/romsjef/gamlebeboere")}
        style={{ cursor: "pointer" }}
      >
        Gamle beboere
      </Link>
      <Link
        color={
          router.pathname === "/utvalget/romsjef/permliste"
            ? "primary"
            : "inherit"
        }
        onClick={() => router.push("/utvalget/romsjef/permliste")}
        style={{ cursor: "pointer" }}
      >
        Permliste
      </Link>
      <Link
        color={
          router.pathname === "/utvalget/romsjef/ansiennitet"
            ? "primary"
            : "inherit"
        }
        onClick={() => router.push("/utvalget/romsjef/ansiennitet")}
        style={{ cursor: "pointer" }}
      >
        Ansiennitet
      </Link>
      <Link
        color={
          router.pathname === "/utvalget/romsjef/storhybelliste"
            ? "primary"
            : "inherit"
        }
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/utvalget/romsjef/storhybelliste")}
      >
        Storhybellister
      </Link>
      <Link
        onClick={() => router.push("/utvalget/romsjef/soknader")}
        color={
          router.pathname === "/utvalget/romsjef/soknader"
            ? "primary"
            : "inherit"
        }
        style={{ cursor: "pointer" }}
      >
        Søknader
      </Link>
    </Breadcrumbs>
  );
};

export default Navigasjon;
