import React from 'react';
import { makeStyles } from '@mui/styles';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const useStyles = makeStyles({
  table: {
    borderCollapse: 'collapse',
  },
  cell: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  },
  mealType: {
    fontWeight: 'bold',
  },
  noBorder: {
    borderTop: 'none',
    borderBottom: 'none',
  },
});

const MealPlanTable = () => {
  const classes = useStyles();

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Meal</TableCell>
          <TableCell>Items</TableCell>
          <TableCell>Monday</TableCell>
          <TableCell>Tuesday</TableCell>
          {/* Add more day columns here */}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className={`${classes.mealType}`} rowSpan={4}>Breakfast</TableCell>
          <TableCell>Item 1</TableCell>
          <TableCell>...</TableCell>
          <TableCell>...</TableCell>
          {/* Add more day cells here */}
        </TableRow>
        <TableRow>
          <TableCell>Item 2</TableCell>
          <TableCell>...</TableCell>
          <TableCell>...</TableCell>
          {/* Add more day cells here */}
        </TableRow>
        <TableRow>
          <TableCell>Item 3</TableCell>
          <TableCell>...</TableCell>
          <TableCell>...</TableCell>
          {/* Add more day cells here */}
        </TableRow>
        <TableRow className={`${classes.noBorder}`}>
          <TableCell>Item 4</TableCell>
          <TableCell>...</TableCell>
          <TableCell>...</TableCell>
          {/* Add more day cells here */}
        </TableRow>
        {/* Repeat the above structure for Lunch, Snacks, and Dinner rows */}
        <TableRow>
          <TableCell className={`${classes.mealType}`} rowSpan={3}>Lunch</TableCell>
          <TableCell>Item 5</TableCell>
          <TableCell>...</TableCell>
          <TableCell>...</TableCell>
          {/* Add more day cells here */}
        </TableRow>
        <TableRow>
          <TableCell>Item 6</TableCell>
          <TableCell>...</TableCell>
          <TableCell>...</TableCell>
          {/* Add more day cells here */}
        </TableRow>
        <TableRow className={`${classes.noBorder}`}>
          <TableCell>Item 7</TableCell>
          <TableCell>...</TableCell>
          <TableCell>...</TableCell>
          {/* Add more day cells here */}
        </TableRow>
        {/* Repeat the above structure for Snacks and Dinner rows */}
        {/* Add more rows for other meal types if needed */}
      </TableBody>
    </Table>
  );
};

export default MealPlanTable;
