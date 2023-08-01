import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
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

const KadambaNonVeg = ({ darkMode }) => {
  const classes = useStyles();

  // Three tables one below other
  // T1. (2 rows): 1. Monday, Wednesday, Thursday, Friday, Sunday, 2. Items for each day
  // T2. (2 columns, 1 row for each day): first row Day, second row Egg type
  // T3. (3 columns, 5 rows): I'll fill this

  return (
    <Box
      sx={{
        height: "60vh",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        style={{ marginTop: "1rem" }}
      >
        Kadamba Non-Veg Menu
      </Typography>
      <TableContainer component={Paper}>
        <Table stickyHeader className={classes.customTable}>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
              >
                Monday
              </TableCell>
              <TableCell
                style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
              >
                Wednesday
              </TableCell>
              <TableCell
                style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
              >
                Thursday
              </TableCell>
              <TableCell
                style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
              >
                Friday
              </TableCell>
              <TableCell
                style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
              >
                Sunday
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Dinner: Chicken (Wet)</TableCell>
              <TableCell>Lunch: Chicken Biryani</TableCell>
              <TableCell>Dinner: Egg curry/bhurji</TableCell>
              <TableCell>Dinner: Chicken (Dry)</TableCell>
              <TableCell>Lunch: Chicken Biryani</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        style={{ marginTop: "1rem" }}
      >
        Everyday Egg Items - 2 pieces
      </Typography>
      <TableContainer component={Paper}>
        <Table stickyHeader className={classes.customTable}>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
              >
                Day
              </TableCell>
              <TableCell
                style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
              >
                Egg Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Monday</TableCell>
              <TableCell>Omlette</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tuesday</TableCell>
              <TableCell>Omlette</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Wednesday</TableCell>
              <TableCell>Boiled Egg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Thursday</TableCell>
              <TableCell>Omlette</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Friday</TableCell>
              <TableCell>Omlette</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Saturday</TableCell>
              <TableCell>Omlette</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sunday</TableCell>
              <TableCell>Boiled Egg</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        style={{ marginTop: "1rem" }}
      >
        Kadamba Non-Veg
      </Typography>
      <TableContainer component={Paper}>
        <Table stickyHeader className={classes.customTable}>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
              >
                Chicken Wet Items
              </TableCell>
              <TableCell
                style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
              >
                Chicken Dry Items
              </TableCell>
              <TableCell
                style={{ background: darkMode ? "#121212" : "#f5f5f5" }}
              >
                Egg Curry
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Gongura Chicken Curry</TableCell>
              <TableCell>Chilly Manchurian</TableCell>
              <TableCell>Week-1 Egg Curry</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Butter Chicken</TableCell>
              <TableCell>Chicken 65</TableCell>
              <TableCell>Week-2 Egg Bhurji</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Chicken Curry Home Style</TableCell>
              <TableCell>Kerala Chicken</TableCell>
              <TableCell>Week-3 Egg Curry</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Moghal chicken</TableCell>
              <TableCell>Chicken Kosha</TableCell>
              <TableCell>Week-4 Egg Bhurji</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kadhai chicken</TableCell>
              <TableCell></TableCell>
              <TableCell>Week-5 Egg Curry</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Punjabi chicken</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add some empty space */}
      <Box sx={{ height: "4rem" }} />
    </Box>
  );
};

export default KadambaNonVeg;
