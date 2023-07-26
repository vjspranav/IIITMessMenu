import { useEffect, useState } from "react";
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

const TodayMealTable = ({ menu }) => {
  const [day, setDay] = useState("");
  const [todayMess, setTodayMess] = useState(null);

  const [maxMeals, setMaxMeals] = useState({
    Breakfast: 0,
    Lunch: 0,
    Snack: 0,
    Dinner: 0,
  });

  useEffect(() => {
    const menuCopy = JSON.parse(JSON.stringify(menu));

    // Get today's day and time and decide day and meal
    let today = DAYS[new Date().getDay()];
    let time = new Date().getHours();

    // If time is greater than 22, then it is next day
    if (time >= 22) {
      today = DAYS[(new Date().getDay() + 1) % 7];
    }

    setDay(today);

    // Get today's menu for all messes
    const todayMess = {
      NORTHMESS: menuCopy[NORTHMESS].Days[today],
      SOUTHMESS: menuCopy[SOUTHMESS].Days[today],
      KADAMBA: menuCopy[KADAMBA].Days[today],
      YUKTAHAR: menuCopy[YUKTAHAR].Days[today],
    };

    // Convert each meal to array of items
    Object.keys(todayMess).forEach((mess) => {
      Object.keys(todayMess[mess]).forEach((meal) => {
        todayMess[mess][meal] = Object.values(todayMess[mess][meal]);
      });
    });

    // Remove empty items
    Object.keys(todayMess).forEach((mess) => {
      Object.keys(todayMess[mess]).forEach((meal) => {
        todayMess[mess][meal] = todayMess[mess][meal].filter(
          (item) => item !== ""
        );
      });
    });

    // Get max number of items in each meal
    const maxMeals = {
      Breakfast: Math.max(
        todayMess["NORTHMESS"]["Breakfast"].length,
        todayMess["SOUTHMESS"]["Breakfast"].length,
        todayMess["KADAMBA"]["Breakfast"].length,
        todayMess["YUKTAHAR"]["Breakfast"].length
      ),
      Lunch: Math.max(
        todayMess["NORTHMESS"]["Lunch"].length,
        todayMess["SOUTHMESS"]["Lunch"].length,
        todayMess["KADAMBA"]["Lunch"].length,
        todayMess["YUKTAHAR"]["Lunch"].length
      ),
      Snack: Math.max(
        todayMess["NORTHMESS"]["Snack"].length,
        todayMess["SOUTHMESS"]["Snack"].length,
        todayMess["KADAMBA"]["Snack"].length,
        todayMess["YUKTAHAR"]["Snack"].length
      ),
      Dinner: Math.max(
        todayMess["NORTHMESS"]["Dinner"].length,
        todayMess["SOUTHMESS"]["Dinner"].length,
        todayMess["KADAMBA"]["Dinner"].length,
        todayMess["YUKTAHAR"]["Dinner"].length
      ),
    };

    setMaxMeals(maxMeals);
    setTodayMess(todayMess);
  }, [menu]);

  // Function to generate table rows for a specific meal
  const generateMealRows = (mealType) => {
    return Array.from(Array(maxMeals[mealType]), (_, i) => i).map((item) => (
      <TableRow key={item}>
        {item === 0 && (
          <TableCell rowSpan={maxMeals[mealType]}>
            {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
          </TableCell>
        )}
        <TableCell>{todayMess["NORTHMESS"][mealType][item]}</TableCell>
        <TableCell>{todayMess["SOUTHMESS"][mealType][item]}</TableCell>
        <TableCell>{todayMess["KADAMBA"][mealType][item]}</TableCell>
        <TableCell>{todayMess["YUKTAHAR"][mealType][item]}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      <h1>{day}</h1>
      <TableContainer component={Paper}>
        {todayMess && (
          <Table>
            <TableHead>
              <TableRow key={0}>
                <TableCell key={1}>Meal</TableCell>
                <TableCell key={2}>NorthMess</TableCell>
                <TableCell key={3}>SouthMess</TableCell>
                <TableCell key={4}>Kadamba</TableCell>
                <TableCell key={5}>Yuktahar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {generateMealRows("Breakfast")}
              {generateMealRows("Lunch")}
              {generateMealRows("Snack")}
              {generateMealRows("Dinner")}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default TodayMealTable;
