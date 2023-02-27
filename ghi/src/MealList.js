import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useAuthContext } from './Auth';
import { useToken } from './Auth';


function MealList() {
    const [mondayMeals, setMondayMeals] = useState([]);
    const [tuesdayMeals, setTuesdayMeals] = useState([]);
    const [wednesdayMeals, setWednesdayMeals] = useState([]);
    const [thursdayMeals, setThursdayMeals] = useState([]);
    const [fridayMeals, setFridayMeals] = useState([]);
    const [saturdayMeals, setSaturdayMeals] = useState([]);
    const [sundayMeals, setSundayMeals] = useState([]);
    const { token } = useToken()


    var accountId
    if (token) {
        const decoded = jwt_decode(token);
        const account_id = decoded.account.id;
        accountId = account_id

    }

    const getMeals = async () => {
        const response = await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/meals`);
        if (response.ok) {
            const meals = await response.json();
            let mondayMeals = [];
            let tuesdayMeals = [];
            let wednesdayMeals = [];
            let thursdayMeals = [];
            let fridayMeals = [];
            let saturdayMeals = [];
            let sundayMeals = [];
            for (let meal of meals) {
                console.log("MEAL", meal)

                if (meal.date_int === 1 && meal.account_id === accountId) {
                    console.log("MADE HERE")
                    mondayMeals.push(meal)
                }

                if (meal.date_int === 2 && meal.account_id === accountId) {
                    console.log("MADE HERE")
                    tuesdayMeals.push(meal)
                }

                if (meal.date_int === 3 && meal.account_id === accountId) {
                    console.log("MADE HERE")
                    wednesdayMeals.push(meal)
                }

                if (meal.date_int === 4 && meal.account_id === accountId) {
                    console.log("MADE HERE")
                    thursdayMeals.push(meal)
                }

                if (meal.date_int === 5 && meal.account_id === accountId) {
                    console.log("MADE HERE")
                    fridayMeals.push(meal)
                }

                if (meal.date_int === 6 && meal.account_id === accountId) {
                    console.log("MADE HERE")
                    saturdayMeals.push(meal)
                }

                if (meal.date_int === 7 && meal.account_id === accountId) {
                    console.log("MADE HERE")
                    sundayMeals.push(meal)
                }

            }
            setMondayMeals(mondayMeals)
            setTuesdayMeals(tuesdayMeals)
            setWednesdayMeals(wednesdayMeals)
            setThursdayMeals(thursdayMeals)
            setFridayMeals(fridayMeals)
            setSaturdayMeals(saturdayMeals)
            setSundayMeals(sundayMeals)
            console.log(mondayMeals)
        } else {
            console.error(response)
        }
    }

    useEffect(() => {
        getMeals();
    }, [accountId])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Monday</h5>
                            {mondayMeals.map((mondayMeal) => {
                                return (
                                    <div key={mondayMeal.id}>{mondayMeal.recipe_id.name}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='col-sm'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Tuesday</h5>
                            {tuesdayMeals.map((tuesdayMeal) => {
                                return (
                                    <div key={tuesdayMeal.id}>{tuesdayMeal.recipe_id.name}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='col-sm'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Wednesday</h5>
                            {wednesdayMeals.map((wednesdayMeal) => {
                                return (
                                    <div key={wednesdayMeal.id}>{wednesdayMeal.recipe_id.name}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='col-sm'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Thursday</h5>
                            {thursdayMeals.map((thursdayMeal) => {
                                return (
                                    <div key={thursdayMeal.id}>{thursdayMeal.recipe_id.name}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Friday</h5>
                            {fridayMeals.map((fridayMeal) => {
                                return (
                                    <div key={fridayMeal.id}>{fridayMeal.recipe_id.name}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='col-sm'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Saturday</h5>
                            {saturdayMeals.map((saturdayMeal) => {
                                return (
                                    <div key={saturdayMeal.id}>{saturdayMeal.recipe_id.name}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='col-sm'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Sunday</h5>
                            {sundayMeals.map((sundayMeal) => {
                                return (
                                    <div key={sundayMeal.id}>{sundayMeal.recipe_id.name}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MealList;
