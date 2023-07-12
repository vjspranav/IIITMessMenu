import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: "1px solid rgba(224, 224, 224, 1)",
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  height: "90%",
  width: "100vw",
  overflow: "auto",
}));

const MyTable = ({ menu }) => {
  const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Meal</StyledTableCell>
            {Object.keys(menu.Days).map((day) => (
              <StyledTableCell>{day}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal) => (
            <TableRow>
              <StyledTableCell>{meal}</StyledTableCell>
              {Object.keys(menu.Days).map((day) => (
                <StyledTableCell>
                  {Object.keys(menu.Days[day][meal]).map((item) => (
                    <>
                      {menu.Days[day][meal][item]}
                      {menu.Days[day][meal][item] !== "" && <br />}
                    </>
                  ))}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default MyTable;
