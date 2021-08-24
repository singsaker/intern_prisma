import React from "react";
import { ResponsivePie } from "@nivo/pie";
import Spinner from "../../CustomSpinner";

const AarsmodellPie = (props) => {
  if (typeof window !== "undefined" && props.data) {
    return (
      <ResponsivePie
        data={props.data}
        margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
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
        isInteractive={false}
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
      />
    );
  } else {
    return <Spinner />;
  }
};

export default AarsmodellPie;
