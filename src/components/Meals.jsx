import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
    const [fetchedMeals, setFetchedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            const response = await fetch('http://localhost:3000/meals');

            if (!response.ok) {
                return;
            }

            const meals = await response.json();
            setFetchedMeals(meals);
        }

        fetchMeals();
    }, []);

    return <ul id="meals">{fetchedMeals.map(meal => <MealItem key={meal.id} meal={meal} />)}</ul>;
}