import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./table.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: "1px solid rgba(224, 224, 224, 1)",
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
}));

const MyTable = ({ menu }) => {
  // Menu is of the form
  // {
  //   "Days": {
  //     "Monday": {
  //       "Breakfast": [],
  //       "Lunch": [],
  //       "Snacks": [],
  //       "Dinner": []
  //     },
  //     ...
  //   },
  //   ...
  // }
  // Render the table

  console.log(menu);

  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Day</StyledTableCell>
            <StyledTableCell>Breakfast</StyledTableCell>
            <StyledTableCell>Lunch</StyledTableCell>
            <StyledTableCell>Snacks</StyledTableCell>
            <StyledTableCell>Dinner</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(menu).map((day) => (
            <TableRow key={day}>
              <StyledTableCell>{day}</StyledTableCell>
              <StyledTableCell>
                {menu[day]["Breakfast"].join("\n")}
              </StyledTableCell>
              <StyledTableCell>{menu[day]["Lunch"].join("\n")}</StyledTableCell>
              <StyledTableCell>
                {menu[day]["Snacks"].join("\n")}
              </StyledTableCell>
              <StyledTableCell>
                {menu[day]["Dinner"].join("\n")}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default MyTable;
