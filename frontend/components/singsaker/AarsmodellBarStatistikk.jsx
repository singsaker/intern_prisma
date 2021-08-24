import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useSelector } from "react-redux";
import Spinner from "../CustomSpinner";

const AarsmodellPie = () => {
  const [data, setData] = useState([]);
  const beboere = useSelector((state) => Object.values(state.beboer.beboere));

  useEffect(() => {
    if (beboere && data.length < 1) {
      const rawData = beboere
        .filter((x) => {
          return x.fodselsdato.split("-")[0] !== "1000";
        })
        .map((x) => {
          return { aar: x.fodselsdato.split("-")[0], jente: x.kjonn };
        })
        .sort((a, b) => b.aar - a.aar);
      let currentYear = rawData[0].aar;
      let count = 0;
      let gutter = 0;
      let jenter = 0;
      let tempData = [];

      rawData.forEach((x) => {
        if (x.aar === currentYear) {
          count++;
          if (x.jente) {
            jenter++;
          } else {
            gutter++;
          }
        } else {
          tempData.push({
            id: currentYear,
            label: currentYear,
            antall: count,
            gutter: gutter,
            jenter: jenter,
          });
          currentYear = x.aar;
          count = 1;
          if (x.jente) {
            jenter = 1;
            gutter = 0;
          } else {
            jenter = 0;
            gutter = 1;
          }
        }
      });
      tempData.push({
        id: currentYear,
        label: currentYear,
        antall: count,
        gutter: gutter,
        jenter: jenter,
      });
      setData(tempData);
    }
  }, [beboere]);

  if (typeof window !== "undefined") {
    return (
      <ResponsiveBar
        data={data}
        keys={["jenter", "gutter"]}
        indexBy="label"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        colors={{ scheme: "nivo" }}
        theme={{
          textColor: "#F2EBC7",
          fontSize: 14,
          axis: {
            domain: {
              line: {
                stroke: "#396873",
                strokeWidth: 1,
              },
            },
            ticks: {
              line: {
                stroke: "#396873",
                strokeWidth: 1,
              },
            },
          },
          grid: {
            line: {
              stroke: "#396873",
              strokeWidth: 1,
            },
          },
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#396873",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#396873",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{ from: "color", modifiers: [["brighter", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "År",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Antall beboere",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 3]],
        }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    );
  } else {
    return <Spinner />;
  }
};

export default AarsmodellPie;
