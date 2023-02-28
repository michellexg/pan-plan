import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useToken } from './Auth';
import UpdateMeal from './Modal';
import Card from "react-bootstrap/esm/Card"


function MealList() {
    const [mondayMeals, setMondayMeals] = useState([]);
    const [tuesdayMeals, setTuesdayMeals] = useState([]);
    const [wednesdayMeals, setWednesdayMeals] = useState([]);
    const [thursdayMeals, setThursdayMeals] = useState([]);
    const [fridayMeals, setFridayMeals] = useState([]);
    const [saturdayMeals, setSaturdayMeals] = useState([]);
    const [sundayMeals, setSundayMeals] = useState([]);
    const { token } = useToken()
    console.log("what is token", token)

    var accountId
    if (token) {
        const decoded = jwt_decode(token);
        const account_id = decoded.account.id;
        accountId = account_id
        console.log(accountId)
    }

    useEffect(() => {
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

                    if (meal.date_int === 1 && meal.account_id === accountId) {
                        mondayMeals.push(meal)
                    }

                    if (meal.date_int === 2 && meal.account_id === accountId) {
                        tuesdayMeals.push(meal)
                    }

                    if (meal.date_int === 3 && meal.account_id === accountId) {
                        wednesdayMeals.push(meal)
                    }

                    if (meal.date_int === 4 && meal.account_id === accountId) {
                        thursdayMeals.push(meal)
                    }

                    if (meal.date_int === 5 && meal.account_id === accountId) {
                        fridayMeals.push(meal)
                    }

                    if (meal.date_int === 6 && meal.account_id === accountId) {
                        saturdayMeals.push(meal)
                    }

                    if (meal.date_int === 7 && meal.account_id === accountId) {
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
                console.log("-----IM HERE------")
            } else {
                console.error(response)
            }
        };
        getMeals();
    }, [accountId])

    return (
        <div className='container'>
            <div className='row'>

                <div className='col-sm'>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Monday</Card.Title>
                            {mondayMeals.map((mondayMeal) => {
                                return (
                                    <Card.Text key={mondayMeal.id}>
                                        {mondayMeal.recipe_id.name}
                                    </Card.Text>
                                )
                            })}
                            <UpdateMeal date_int={1} />
                        </Card.Body>
                    </Card>
                </div>

                <div className='col-sm'>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Tuesday</Card.Title>
                            {tuesdayMeals.map((tuesdayMeal) => {
                                return (
                                    <Card.Text key={tuesdayMeal.id}>{tuesdayMeal.recipe_id.name}</Card.Text>
                                )
                            })}
                            <UpdateMeal date_int={2} />
                        </Card.Body>
                    </Card>
                </div>

                <div className='col-sm'>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Wednesday</Card.Title>
                            {wednesdayMeals.map((wednesdayMeal) => {
                                return (
                                    <Card.Text key={wednesdayMeal.id}>{wednesdayMeal.recipe_id.name}</Card.Text>
                                )
                            })}
                            <UpdateMeal date_int={3} />
                        </Card.Body>
                    </Card>
                </div>

                <div className='col-sm'>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Thursday</Card.Title>
                            {thursdayMeals.map((thursdayMeal) => {
                                return (
                                    <Card.Text key={thursdayMeal.id}>{thursdayMeal.recipe_id.name}</Card.Text>
                                )
                            })}
                            <UpdateMeal date_int={4} />
                        </Card.Body>
                    </Card>
                </div>

            </div>

            <div className='row'>
                <div className='col-sm'>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Friday</Card.Title>
                            {fridayMeals.map((fridayMeal) => {
                                return (
                                    <Card.Text key={fridayMeal.id}>{fridayMeal.recipe_id.name}</Card.Text>
                                )
                            })}
                            <UpdateMeal date_int={5} />
                        </Card.Body>
                    </Card>
                </div>

                <div className='col-sm'>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Saturday</Card.Title>
                            {saturdayMeals.map((saturdayMeal) => {
                                return (
                                    <Card.Text key={saturdayMeal.id}>{saturdayMeal.recipe_id.name}</Card.Text>
                                )
                            })}
                            <UpdateMeal date_int={6} />
                        </Card.Body>
                    </Card>
                </div>

                <div className='col-sm'>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Sunday</Card.Title>
                            {sundayMeals.map((sundayMeal) => {
                                return (
                                    <Card.Text key={sundayMeal.id}>{sundayMeal.recipe_id.name}</Card.Text>
                                )
                            })}
                            <UpdateMeal date_int={7} />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default MealList;
