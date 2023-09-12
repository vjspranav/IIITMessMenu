import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  customTable: {
    borderCollapse: "collapse",
    "& th, td": {
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(1),
    },
    "& th": {
      fontWeight: "bold",
      // backgroundColor: theme.palette.primary.main, // Customize the background color of the header row
      // color: theme.palette.common.white, // Customize the text color of the header row
    },
  },
  customCell: {
    fontWeight: "bold",
  },
}));

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MEALS = ["Breakfast", "Lunch", "Snacks", "Dinner"];

const NORTHMESS = 0;
const SOUTHMESS = 1;
const KADAMBA = 3;
const YUKTAHAR = 4;

const CurrentMeal = ({ meal, darkMode }) => {
  const classes = useStyles();

  const [day, setDay] = useState(DAYS[new Date().getDay()]);
  const [curMeal, setCurMeal] = useState("");
  const [items, setItems] = useState([]);
  const [maxItems, setMax] = useState(0);

  useEffect(() => {
    // Get today's day and time and decide day and meal
    let today = new Date();
    const cur_day = DAYS[today.getDay()];
    const time = today.getHours();
    let tMeal = "Breakfast";
    setDay(cur_day);

    if (time < 10) {
      tMeal = "Breakfast";
    } else if (time < 15) {
      tMeal = "Lunch";
    } else if (time < 18) {
      tMeal = "Snacks";
    } else if (time < 22) {
      tMeal = "Dinner";
    } else {
      const nextDay = DAYS[(today.getDay() + 1) % 7];
      tMeal = "Breakfast";
      setDay(nextDay);
      today = nextDay;
    }

    setCurMeal(tMeal);

    let items = [
      [], // North Mess
      [], // South Mess
      [], // Kadamba
      [], // NULL
      [], // Yuktahar
    ];

    // Populate items, meals[mess]["Days"][day][meal]
    [NORTHMESS, SOUTHMESS, KADAMBA, YUKTAHAR].forEach((cMess) => {
      for (let item in meal[cMess]["Days"][cur_day][tMeal]) {
        items[cMess].push(meal[cMess]["Days"][cur_day][tMeal][item]);
      }
      //   Remove empty items
      items[cMess] = items[cMess].filter((item) => item !== "");

      //   Set max items
      // if (items[cMess].length > maxItems) {
      setMax(items[cMess].length + 1);
      // }
    });

    setItems(items);
  }, [meal]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <h1>
          {day} - {curMeal}
        </h1>
        <Button
          onClick={() => {
            if (curMeal === "Breakfast")
              setDay(DAYS[(DAYS.indexOf(day) + 6) % 7]);
            let tMeal = MEALS[(MEALS.indexOf(curMeal) + 3) % 4];
            setCurMeal(tMeal);

            // Populate items, meals[mess]["Days"][day][meal]
            [NORTHMESS, SOUTHMESS, KADAMBA, YUKTAHAR].forEach((cMess) => {
              items[cMess] = [];
              for (let item in meal[cMess]["Days"][day][tMeal]) {
                items[cMess].push(meal[cMess]["Days"][day][tMeal][item]);
              }

              //   Remove empty items
              items[cMess] = items[cMess].filter((item) => item !== "");

              //   Set max items
              setMax(items[cMess].length + 1);
            });
          }}
        >
          Prev
        </Button>
        <Button
          onClick={() => {
            if (curMeal === "Dinner") setDay(DAYS[(DAYS.indexOf(day) + 1) % 7]);
            let tMeal = MEALS[(MEALS.indexOf(curMeal) + 1) % 4];
            setCurMeal(tMeal);

            // Populate items, meals[mess]["Days"][day][meal]
            [NORTHMESS, SOUTHMESS, KADAMBA, YUKTAHAR].forEach((cMess) => {
              items[cMess] = [];
              for (let item in meal[cMess]["Days"][day][tMeal]) {
                items[cMess].push(meal[cMess]["Days"][day][tMeal][item]);
              }

              //   Remove empty items
              items[cMess] = items[cMess].filter((item) => item !== "");

              //   Set max items
              setMax(items[cMess].length + 1);
            });
          }}
        >
          Next
        </Button>
      </div>
      {day && (
        <TableContainer
          component={Paper}
          sx={{ height: "60vh", overscrollBehavior: "none" }}
        >
          <Table stickyHeader className={classes.customTable}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
                >
                  North Mess
                </TableCell>
                <TableCell
                  style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
                >
                  South Mess
                </TableCell>
                <TableCell
                  style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
                >
                  Kadamba
                </TableCell>
                <TableCell
                  style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
                >
                  Yuktahar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(maxItems)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>{items[NORTHMESS][index]}</TableCell>
                  <TableCell>{items[SOUTHMESS][index]}</TableCell>
                  <TableCell>{items[KADAMBA][index]}</TableCell>
                  <TableCell>{items[YUKTAHAR][index]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default CurrentMeal;
