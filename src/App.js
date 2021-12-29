import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function App() {
  return <BasicTabs />;
}

const messFiles = {
  0: "/menu/kadamba.pdf",
  1: "/menu/northmess.pdf",
  2: "/menu/southmess.pdf",
  3: "/menu/yuktahar.pdf",
};

function TabPanel(props) {
  const { value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ overflow: "hidden" }}>
          <iframe
            style={{
              overflow: "hidden",
              height: "93.5vh",
              width: "100vw",
            }}
            title="pdfViewer"
            src={
              "https://docs.google.com/gview?embedded=true&url=https://iiit-mess.ml" +
              messFiles[index]
            }
          ></iframe>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "10vh" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Kadamba" {...a11yProps(0)} />
          <Tab label="North Mess" {...a11yProps(1)} />
          <Tab label="South Mess" {...a11yProps(2)} />
          <Tab label="Yuktahar" {...a11yProps(3)} />{" "}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </Box>
  );
}

export default App;
