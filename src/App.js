import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// SWAL
import Swal from "sweetalert2";

// Dark Theme Icon Switch
import IconSwitch from "./components/IconSwitch";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// import json
import NorthMess from "./menus/northmess.json";
import SouthMess from "./menus/southmess.json";
import Kadamba from "./menus/kadamba.json";
import KNonVeg from "./menus/kadambanonveg.json";
import Yuktahar from "./menus/yuktahar.json";

import MyTable from "./components/FullMealTable";
import KadambaNonVeg from "./components/KadambaNonVeg";
import CurrentMeal from "./components/currentMealTable";
import TodayMealTable from "./components/TodayMealTable";

import ReactGA from "react-ga4";
import { Link, Typography } from "@mui/material";

const messFiles = [
  NorthMess, // North Mess
  SouthMess, // South Mess
  KNonVeg, // Non Veg Kadamba
  Kadamba, // Kadamba
  Yuktahar, // Yuktahar
];

function TabPanel(props) {
  const { value, index, darkMode, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value !== 2 ? (
        <MyTable menu={messFiles[value]} darkMode={darkMode} />
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <KadambaNonVeg darkMode={darkMode} />
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
      key={value + "tabs"}
      // allowScrollButtonsMobile
      // centered
    >
      <Tab key="north" label="North Mess" {...a11yProps(0)} />
      <Tab key="south" label="South Mess" {...a11yProps(1)} />
      <Tab key="nonveg" label="Non Veg Kadamba" {...a11yProps(2)} />
      <Tab key="kadamba" label="Kadamba" {...a11yProps(3)} />
      <Tab key="yuktahar" label="Yuktahar" {...a11yProps(4)} />
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

  // Add a state to handle the theme mode
  const [darkMode, setDarkMode] = React.useState(true);

  const [value, setValue] = React.useState(0);
  const [mealMenu, setMealMenu] = React.useState("Today Menu");

  useEffect(() => {
    // Check if they are opening for the first time
    const firstTimeVisited = localStorage.getItem("firstTimeV1");
    if (!firstTimeVisited) {
      Swal.fire({
        title: "Welcome to IIIT Mess Menu!",
        text: "This is a new version of the app. Now it allows you to check Only Today's menu or only the upcoming meal. Now with Dark theme!.",
        icon: "info",
        confirmButtonText: "OK",
      });
      localStorage.setItem("firstTimeV1", "true");
    }

    ReactGA.send({ hitType: "pageview", page: window.location.pathname });

    // Check if mealMenu is saved in localStorage
    const savedMealMenu = localStorage.getItem("mealMenu");
    if (savedMealMenu) {
      setMealMenu(savedMealMenu);
      ReactGA.event({
        category: "User",
        action: "Loaded Menu",
        label: savedMealMenu,
      });
    }

    // Load the saved theme mode from localStorage
    const savedThemeMode = localStorage.getItem("themeMode");
    if (savedThemeMode) {
      setDarkMode(savedThemeMode === "dark");
    }
  }, []);

  const handleChangeTheme = () => {
    // Toggle the theme mode
    const newThemeMode = !darkMode;
    setDarkMode(newThemeMode);

    // Save the theme mode to localStorage
    localStorage.setItem("themeMode", newThemeMode ? "dark" : "light");
  };

  const handleChange = (event) => {
    const selectedMenu = event.target.value;
    setMealMenu(selectedMenu);

    if (selectedMenu === "Today Menu" || selectedMenu === "Upcoming Meal") {
      // Set value to the index of the corresponding tab
      setValue(selectedMenu === "Today Menu" ? 2 : 3);
    }

    // Save mealMenu in localStorage
    localStorage.setItem("mealMenu", selectedMenu);

    ReactGA.event({
      category: "User",
      action: "Changed Menu",
      label: selectedMenu,
    });
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ width: "100vw", height: "100vh", paddingBottom: "50px" }}>
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
          <FormControl variant="standard" sx={{ minWidth: 100 }}>
            <InputLabel htmlFor="meal-menu">Select Menu</InputLabel>
            <Select
              value={mealMenu}
              onChange={handleChange}
              label="Select Menu"
              inputProps={{ id: "meal-menu" }}
            >
              <MenuItem value="Full Menu">Full Menu</MenuItem>
              <MenuItem value="Today Menu">Today's Menu</MenuItem>
              <MenuItem value="Upcoming Meal">Upcoming Meal</MenuItem>
            </Select>
          </FormControl>

          {/* Print Last updated date and WEF date */}
          {/* {mealMenu === "Full Menu" && (
            <div style={{ fontSize: "12px" }}>
              Last Updated: {messFiles[value]?.lastUpdated}
            </div>
          )}
          {mealMenu === "Full Menu" && (
            <div
              style={{ fontSize: "12px" }}
            >{`WEF: ${messFiles[value]?.wef}`}</div>
          )} */}
          {mealMenu === "Full Menu" &&
            (messFiles[value]?.lastUpdated === messFiles[value]?.wef ? (
              <div
                style={{
                  margin: "10px",
                  marginTop: "20px",
                  fontSize: "12px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Updated & WEF: {messFiles[value]?.lastUpdated}
              </div>
            ) : (
              <div
                style={{
                  margin: "10px",
                  marginTop: "20px",
                  fontSize: "12px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Updated: {messFiles[value]?.lastUpdated} | WEF:
                {messFiles[value]?.wef}
              </div>
            ))}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: 3,
            }}
          >
            <IconSwitch isDark={darkMode} onToggle={handleChangeTheme} />
          </Box>
        </Box>

        {mealMenu === "Full Menu" && (
          <div>
            <BasicTabs
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
            />
            <TabPanel darkMode={darkMode} value={value} index={0}></TabPanel>
            <TabPanel darkMode={darkMode} value={value} index={1}></TabPanel>
            <TabPanel darkMode={darkMode} value={value} index={2}></TabPanel>
            <TabPanel darkMode={darkMode} value={value} index={3}></TabPanel>
            <TabPanel darkMode={darkMode} value={value} index={4}></TabPanel>
          </div>
        )}

        {mealMenu === "Today Menu" && (
          <div>
            <TodayMealTable menu={messFiles} darkMode={darkMode} />
          </div>
        )}

        {mealMenu === "Upcoming Meal" && (
          <div>
            <CurrentMeal meal={messFiles} darkMode={darkMode} />
          </div>
        )}

        {/* Additional Info */}
        {messFiles[value]?.additionalInfo && mealMenu === "Full Menu" && (
          <div
            style={{
              float: "left",
              marginLeft: "10px",
              marginTop: "10px",
              paddingBottom: "50px",
            }}
          >
            <b>Additional Info:</b>
            <ul>
              {messFiles[value].additionalInfo?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <Box
          sx={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            textAlign: "center",
            fontSize: "15px",
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#333" : "#f5f5f5", // Use MUI theme for background color
            borderRadius: "5px",
            paddingBottom: "5px",
          }}
        >
          <Box sx={{ float: "left", marginLeft: "10px", marginTop: "10px" }}>
            <Typography variant="body2" color="text.primary">
              © 2023, vjspranav
            </Typography>
          </Box>
          <Box sx={{ float: "right", marginRight: "10px", marginTop: "10px" }}>
            <Typography variant="body2" color="text.primary">
              Source:{" "}
              <Link
                href="https://github.com/vjspranav/IIITMessMenu/"
                target="_blank"
                rel="noreferrer"
                color="secondary"
              >
                Github
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
