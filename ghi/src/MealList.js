import React from 'react';
import MealCard from './MealCard';

function MealList({ recipes }) {
    return (
        <div className='container'>
            <div className='row d-flex justify-content-between'>
                <MealCard date_int={1} recipes={recipes} />
                <MealCard date_int={2} recipes={recipes} />
                <MealCard date_int={3} recipes={recipes} />
                <MealCard date_int={4} recipes={recipes} />
            </div>
            <div className='row d-flex justify-content-around'>
                <MealCard date_int={5} recipes={recipes} />
                <MealCard date_int={6} recipes={recipes} />
                <MealCard date_int={7} recipes={recipes} />
            </div>
        </div>
    )
}

export default MealList;
