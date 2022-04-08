import React from "react";
import AvailableMeals from "./AvailableMeal";
import MealsSummary from "./MealsSummary";
const Meals = () => {
  return (
    <React.Fragment>
      <MealsSummary />
      <AvailableMeals />
    </React.Fragment>
  );
};

export default Meals;
