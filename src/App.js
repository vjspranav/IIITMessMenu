import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

// import json
import NorthMess from "./menus/northmess.json";

import MyTable from "./components/MyTable";

import ReactGA from "react-ga4";

function App() {
  const TRACKING_ID = "G-MDDETF26DX";
  ReactGA.initialize(TRACKING_ID);
  return <BasicTabs sx={{ width: "100vw" }} />;
}

const messFiles = [
  NorthMess, // North Mess
  NorthMess, // North Mess
  NorthMess, // North Mess
  NorthMess, // North Mess
  NorthMess, // North Mess
];

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
      <MyTable menu={messFiles[index]} />
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

const useStyles = makeStyles({
  scrollButtons: {
    "&.Mui-disabled": {
      opacity: 0.3,
    },
  },
});

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const lastUpdated = [
  //   "05/11/2022",
  //   "01/02/2023",
  //   "01/02/2023",
  //   "01/02/2023",
  //   "01/02/2023",
  // ];

  // const wef = [
  //   "07/11/2022",
  //   "01/02/2023",
  //   "01/02/2023",
  //   "01/02/2023",
  //   "01/02/2023",
  // ];

  return (
    <Box sx={{ width: "100vw", height: "10vh" }}>
      <Box sx={{ width: "100vw", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          classes={classes}
          aria-label="basic tabs example"
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{ width: "100%" }}
        >
          <Tab label="North Mess" {...a11yProps(0)} />
          <Tab label="South Mess" {...a11yProps(1)} />
          <Tab label="Non Veg Kadamba" {...a11yProps(2)} />
          <Tab label="Kadamba" {...a11yProps(3)} />
          <Tab label="Yuktahar" {...a11yProps(4)} />{" "}
        </Tabs>
        {/* Print Last updated date to right */}
        <div style={{ float: "right", marginRight: "10px", marginTop: "10px" }}>
          Last Updated: {messFiles[value].lastUpdated}
        </div>
        {/* Print wef date to right */}
        <div style={{ float: "right", marginRight: "10px", marginTop: "10px" }}>
          WEF: {messFiles[value].wef}
        </div>
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
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      {/* Add additional info if any right below the table */}
      <div>
        <div style={{ float: "left", marginLeft: "10px", marginTop: "10px" }}>
          <b>Additional Info:</b>
          <ul>
            {messFiles[value].additionalInfo.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div>{"             "}</div>
        <div>{"             "}</div>
      </div>
      {/* Add copyright and source at the bottom */}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          textAlign: "center",
          fontSize: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          paddingBottom: "5px",
        }}
      >
        <div style={{ float: "left", marginLeft: "10px", marginTop: "10px" }}>
          © 2023, vjspranav
        </div>
        <div style={{ float: "right", marginRight: "10px", marginTop: "10px" }}>
          Source:{" "}
          <a
            href="https://github.com/vjspranav/IIITMessMenu/"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </Box>
  );
}

export default App;
