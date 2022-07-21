import React, { useState, useEffect} from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";
const AvailableMeals = (props) => {
  const [mealList, setMealList] = useState([]);

  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     const respone = await fetch(
  //       "https://foodorder-948d1-default-rtdb.firebaseio.com/meal.json"
  //     );
  //     const data = await respone.json();

  //     const meals = [];
  //     for (const key in data) {
  //       meals.push({
  //         id: key,
  //         name: data[key].name,
  //         description: data[key].description,
  //         price: data[key].price,
  //       });
  //     }
  //     setMealList(meals);
  //   };
  //   fetchMeals();
  // }, []);
  
  

  const {isLoading,hasError,sentRequest:fetchMeals} = useHttp();
  
  useEffect(()=>{
    const mealsShowHandler = (data) => {
      const meals= []
      for (const key in data) {
              meals.push({
                id: data[key].id,
                name: data[key].name,
                description: data[key].description,
                price: data[key].price,
              });
            }
            setMealList(meals);
    }
   
    fetchMeals({url:"http://127.0.0.1:8000/food"},mealsShowHandler);
    
  },[fetchMeals])

  if (hasError){
    return <section className={classes.hasError}>
      <p>Something went wrong!</p>
    </section>
  }
  
    const mealsAvaiable = mealList.map((meal) => (
      <MealItem
        name={meal.name}
        key={meal.id}
        id={meal.id}
        description={meal.description}
        price={meal.price}
      />
    ));
  
    
  

  return (
    <Card>
      <section className={classes.meals}>
        {isLoading ? <p>LOADING...</p>:<ul>{mealsAvaiable}</ul>}      
      </section>
    </Card>
  );
};

export default AvailableMeals;
