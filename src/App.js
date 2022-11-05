import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { makeStyles } from "@mui/styles";

function App() {
  return <BasicTabs sx={{width: "100vw"}} />;
}

const messFiles = {
  0: "/menu/northmess.pdf",
  1: "/menu/southmess.pdf",
  2: "/menu/kadamba_nonveg.pdf",
  3: "/menu/kadamba.pdf",
  4: "/menu/yuktahar.pdf",
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
        <div style={{ }}>
          <Document file={messFiles[index]}>
            <Page pageNumber={1} />
          </Document>
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

const useStyles = makeStyles({
  scrollButtons: {
    "&.Mui-disabled": {
      opacity: 0.3
    }
  }
});

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const lastUpdated = [
    "05/11/2022",
    "05/11/2022",
    "19/09/2022",
    "19/09/2022",
    "19/09/2022",
  ]

  const wef = [
    "07/11/2022",
    "07/11/2022",
    "12/09/2022",
    "12/09/2022",
    "12/09/2022",
  ]

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
          sx={{width: "100%"}}
        >
          <Tab label="North Mess" {...a11yProps(0)} />    
          <Tab label="South Mess" {...a11yProps(1)} />
          <Tab label="Non Veg Kadamba" {...a11yProps(2)} />
          <Tab label="Kadamba" {...a11yProps(3)} />
          <Tab label="Yuktahar" {...a11yProps(4)} />{" "}
        </Tabs>
        {/* Print Last updated date to right */}
        <div style={{float: "right", marginRight: "10px", marginTop: "10px"}}>
          Last Updated: {lastUpdated[value]}
        </div>
        {/* Print wef date to right */}
        <div style={{float: "right", marginRight: "10px", marginTop: "10px"}}>
          WEF: {wef[value]}
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
      {/* Add copyright and source at the bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          textAlign: "center",
          fontSize: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          paddingBottom: "5px",
        }}
      >
        <div style={{float: "left", marginLeft: "10px", marginTop: "10px"}}>
          © 2022, vjspranav
        </div>
        <div style={{float: "right", marginRight: "10px", marginTop: "10px"}}>
          Source: <a href="https://github.com/vjspranav/IIITMessMenu/" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
      </Box>
  );
}

export default App;
