import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const NORTHMESS = 0;
const SOUTHMESS = 1;
const KADAMBA = 3;
const YUKTAHAR = 4;

const CurrentMeal = ({ meal }) => {
  const [day, setDay] = useState("");
  const [curMeal, setCurMeal] = useState("");
  const [items, setItems] = useState([]);
  const [maxItems, setMax] = useState(0);

  useEffect(() => {
    // Get today's day and time and decide day and meal
    let today = new Date();
    const day = DAYS[today.getDay()];
    const time = today.getHours();
    let tMeal = "Breakfast";
    setDay(day);

    if (time < 10) {
      tMeal = "Breakfast";
    } else if (time < 15) {
      tMeal = "Lunch";
    } else if (time < 18) {
      tMeal = "Snack";
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
      for (let item in meal[cMess]["Days"][day][tMeal]) {
        items[cMess].push(meal[cMess]["Days"][day][tMeal][item]);
      }
      //   Remove empty items
      items[cMess] = items[cMess].filter((item) => item !== "");

      //   Set max items
      if (items[cMess].length > maxItems) {
        setMax(items[cMess].length);
      }
    });

    setItems(items);
  }, [meal, maxItems]);

  return (
    <div>
      <h1>
        {day} - {curMeal}
      </h1>
      {day && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>North Mess</TableCell>
                <TableCell>South Mess</TableCell>
                <TableCell>Kadamba</TableCell>
                <TableCell>Yuktahar</TableCell>
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
