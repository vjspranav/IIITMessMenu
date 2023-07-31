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

const FullMealTable = ({ menu, darkMode }) => {
  const classes = useStyles();

  const days = Object.keys(menu.Days);
  const meals = Object.keys(menu.Days[days[0]]);

  return (
    <TableContainer component={Paper} sx={{ height: "60vh" }}>
      <Table stickyHeader className={classes.customTable}>
        <TableHead>
          <TableRow key={0}>
            <TableCell
              key={1}
              style={{
                position: "sticky",
                left: 0,
                zIndex: 100,
                background: darkMode ? "#121212" : "#f5f5f5",
              }}
            >
              Meal
            </TableCell>
            <TableCell
              style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
              key={2}
            >
              Items
            </TableCell>
            {days.map((day) => (
              <TableCell
                style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
                key={day}
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal) => (
            <React.Fragment key={meal}>
              {/* Add key to the outer Fragment */}
              {Object.keys(menu.Days["Monday"][meal]).map((item, index) => (
                <TableRow key={item}>
                  {index === 0 && (
                    <TableCell
                      className={classes.customCell}
                      rowSpan={Object.keys(menu.Days["Monday"][meal]).length}
                      style={{
                        position: "sticky",
                        left: 0,
                        background: darkMode ? "#121212" : "#f5f5f5",
                      }}
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
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FullMealTable;
