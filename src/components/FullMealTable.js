import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const FullMealTable = ({ menu }) => {
  const days = Object.keys(menu.Days);
  const meals = Object.keys(menu.Days[days[0]]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow key={0}>
            <TableCell key={1}>Meal</TableCell>
            <TableCell key={2}>Items</TableCell>
            {days.map((day) => (
              <TableCell key={day}>{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal) => (
            <>
              {Object.keys(menu.Days["Monday"][meal]).map((item, index) => (
                <TableRow key={item}>
                  {index === 0 && (
                    <TableCell
                      rowSpan={Object.keys(menu.Days["Monday"][meal]).length}
                    >
                      {meal}
                    </TableCell>
                  )}
                  <TableCell>{item}</TableCell>
                  {days.map((day) => (
                    <TableCell key={day}>
                      {menu.Days[day][meal][item]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FullMealTable;
