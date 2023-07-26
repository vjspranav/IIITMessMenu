import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// import json
import NorthMess from "./menus/northmess.json";
import SouthMess from "./menus/southmess.json";
import Kadamba from "./menus/kadamba.json";
import Yuktahar from "./menus/yuktahar.json";

import MyTable from "./components/MyTable";
import CurrentMeal from "./components/currentMealTable";

import ReactGA from "react-ga4";

const messFiles = [
  NorthMess, // North Mess
  SouthMess, // South Mess
  null, // Non Veg Kadamba
  Kadamba, // Kadamba
  Yuktahar, // Yuktahar
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
      {messFiles[value] ? (
        <MyTable menu={messFiles[value]} />
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h1>Coming Soon!</h1>
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
      opacity: 0.3,
    },
  },
});

function BasicTabs(props) {
  const classes = useStyles();
  const { value, onChange } = props;

  return (
    <Tabs
      value={value}
      onChange={onChange}
      classes={classes}
      aria-label="basic tabs example"
      variant="scrollable"
      allowScrollButtonsMobile
      sx={{ flex: 1 }}
    >
      <Tab label="North Mess" {...a11yProps(0)} />
      <Tab label="South Mess" {...a11yProps(1)} />
      <Tab label="Non Veg Kadamba" {...a11yProps(2)} />
      <Tab label="Kadamba" {...a11yProps(3)} />
      <Tab label="Yuktahar" {...a11yProps(4)} />
    </Tabs>
  );
}

BasicTabs.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

function App() {
  const TRACKING_ID = "G-MDDETF26DX";
  ReactGA.initialize(TRACKING_ID);

  const [value, setValue] = React.useState(0);
  const [mealMenu, setMealMenu] = React.useState("Full Menu");

  const handleChange = (event) => {
    const selectedMenu = event.target.value;
    setMealMenu(selectedMenu);

    if (selectedMenu === "Today Menu" || selectedMenu === "Upcoming Meal") {
      // Set value to the index of the corresponding tab
      setValue(selectedMenu === "Today Menu" ? 2 : 3);
    }
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
        }}
      >
        <FormControl variant="standard" sx={{ minWidth: 150 }}>
          <InputLabel htmlFor="meal-menu">Select Menu</InputLabel>
          <Select
            value={mealMenu}
            onChange={handleChange}
            label="Select Menu"
            inputProps={{ id: "meal-menu" }}
          >
            <MenuItem value="Full Menu">Full Menu</MenuItem>
            <MenuItem value="Today Menu">Today Menu</MenuItem>
            <MenuItem value="Upcoming Meal">Upcoming Meal</MenuItem>
          </Select>
        </FormControl>

        {/* Print Last updated date and WEF date */}
        <div style={{ fontSize: "12px" }}>
          Last Updated: {messFiles[value]?.lastUpdated}
        </div>
        <div
          style={{ fontSize: "12px" }}
        >{`WEF: ${messFiles[value]?.wef}`}</div>
      </Box>

      {mealMenu === "Full Menu" && (
        <div>
          <BasicTabs
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
          />
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
        </div>
      )}

      {mealMenu === "Today Menu" && (
        <div>
          <Box sx={{ px: 3, py: 2 }}>
            <h1>Coming Soon!</h1>
          </Box>
        </div>
      )}

      {mealMenu === "Upcoming Meal" && (
        <div>
          <CurrentMeal meal={messFiles} />
        </div>
      )}

      {/* Additional Info */}
      {messFiles[value] && (
        <div style={{ float: "left", marginLeft: "10px", marginTop: "10px" }}>
          <b>Additional Info:</b>
          <ul>
            {messFiles[value].additionalInfo.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Copyright and Source */}
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
