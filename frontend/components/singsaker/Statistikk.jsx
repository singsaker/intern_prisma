import React, { useState } from "react";

// Material UI
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const Statistikk = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper>
      <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange}>
        <Tab label="Årsmodell (pie)" value={0} />
        <Tab label="Årsmodell (bar)" value={1} />
      </Tabs>
      <div role="tabpanel" style={{ height: "80vh" }} hidden={value !== 0}>
        {/* <Aarsmodell /> */}
      </div>

      <div role="tabpanel" style={{ height: "80vh" }} hidden={value !== 1}>
        {/* <AarsmodellBarStatistikk /> */}
      </div>
    </Paper>
  );
};

export default Statistikk;
