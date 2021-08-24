import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useSelector } from "react-redux";
import Spinner from "../CustomSpinner";

const AarsmodellPie = () => {
  const [data, setData] = useState([]);
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));

  useEffect(() => {
    if (beboere && data.length < 1) {
      const aarstall = beboere
        .filter((x) => {
          return x.fodselsdato.split("-")[0] !== "1000";
        })
        .map((x) => {
          return x.fodselsdato.split("-")[0];
        })
        .sort();
      let currentYear = aarstall[0];
      let count = 0;
      let tempData = [];

      aarstall.forEach((aar) => {
        if (Number(aar) === Number(currentYear)) {
          count++;
        } else {
          tempData.push({ id: currentYear, label: currentYear, value: count });
          currentYear = aar;
          count = 1;
        }
      });
      tempData.push({ id: currentYear, label: currentYear, value: count });
      setData(tempData);
    }
  }, [beboere]);

  if (typeof window !== "undefined") {
    return (
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="white"
        radialLabelsLinkColor={{ from: "color" }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
      />
    );
  } else {
    return <Spinner />;
  }
};

export default AarsmodellPie;
