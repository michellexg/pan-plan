import React from 'react';
import MealCard from './MealCard';

function MealList({ recipes }) {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm'>
                    <MealCard date_int={1} recipes={recipes} />
                </div>
                <div className="col-sm">
                    <MealCard date_int={2} recipes={recipes} />
                </div>
                <div className="col-sm">
                    <MealCard date_int={3} recipes={recipes} />
                </div>
                <div className="col-sm">
                    <MealCard date_int={4} recipes={recipes} />
                </div>
            </div>
            <div className='row'>
                <div className="col-sm">
                    <MealCard date_int={5} recipes={recipes} />
                </div>
                <div className="col-sm">
                    <MealCard date_int={6} recipes={recipes} />
                </div>
                <div className="col-sm">
                    <MealCard date_int={7} recipes={recipes} />
                </div>
            </div>
        </div>
    )
}

export default MealList;
