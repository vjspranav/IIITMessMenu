import React from "react";
import "./table.css";

const MealPlanTable = ({ menu }) => {
  const days = Object.keys(menu.Days);
  const meals = Object.keys(menu.Days[days[0]]);

  return (
    <table>
      <thead>
        <tr>
          <th>Meal</th>
          <th>Items</th>
          {days.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {meals.map((meal) => (
          <>
            {Object.keys(menu.Days["Monday"][meal]).map((item, index) => (
              <tr key={item}>
                {index === 0 && (
                  <td rowSpan={Object.keys(menu.Days["Monday"][meal]).length}>
                    {meal}
                  </td>
                )}
                <td>{item}</td>
                {days.map((day) => (
                  <td key={day}>{menu.Days[day][meal][item]}</td>
                ))}
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default MealPlanTable;
