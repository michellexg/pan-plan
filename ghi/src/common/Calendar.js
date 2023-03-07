import React, { useState, useEffect } from "react";
import { DateObject } from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import Card from "react-bootstrap/esm/Card";
import { useToken } from '../Auth';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import AddRecipeModal from "./CalendarModal";
import { useNavigate } from "react-router-dom";
import { Trash3 } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'

function MealCalendar(props) {

    // STATE MANAGEMENT AND HOOKS
    const [values, setValues] = useState(new DateObject())
    const [mealDict, setMealDict] = useState({})
    const navigate = useNavigate();
    const [token] = useToken()

    function handleClick(path) {
        navigate(path);
  }

    // GETTING ACCOUNT TOKEN
    var accountId
    if (token) {
        const decoded = jwt_decode(token);
        const account_id = decoded.account.id;
        accountId = account_id
    }

    // GETTING MEALS ALREADY ENTERED FOR AN ACCOUNT AND CREATING A MEAL DICTIONARY BY DATES
    const fetchMeals = async () => {
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/meals/${accountId}`;
        const fetchConfig = {
                    credentials: 'include',
                }
        const response = await fetch(url, fetchConfig)
        let statelessMealDict = {}
        if (response.ok) {
            const data = await response.json()
            let index = 0
            for (let meal of data) {
                if (meal["date"] in statelessMealDict){
                    statelessMealDict[meal["date"]].push( [meal["recipe_id"]["id"], meal["recipe_id"]["name"], index, meal["id"]] )
                    index += 1
                } else {
                    statelessMealDict[meal["date"]] = [ [meal["recipe_id"]["id"], meal["recipe_id"]["name"], index, meal["id"]] ]
                    index += 1
                }
            }
        setMealDict(statelessMealDict)
        }
    }

    useEffect(() => {
        if (token){
        fetchMeals();
        }
        // eslint-disable-next-line
    }, [accountId, token]);

    // USEFUL FUNCTIONS
    function convertDateNumberToStr(number){
        let numberStr = number.toString()
        if (numberStr.length === 1){
            numberStr = '0' + numberStr
            return numberStr
        }
        return numberStr
    }

    // eslint-disable-next-line no-extend-native
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }


    // Logic for displaying dates
    let monthNumberStr1 = ""
    let dayNumberStr1 = ""
    let yearNumberStr1 = ""
    let monthNumberStr2 = ""
    let dayNumberStr2 = ""
    let yearNumberStr2 = ""
    let dateArray = []
    let strDateArray = []

    if (values.length === 1){
            monthNumberStr1 = convertDateNumberToStr(values[0].month.number)
            dayNumberStr1 = convertDateNumberToStr(values[0].day)
            yearNumberStr1 = convertDateNumberToStr(values[0].year)
            let date1 = `${yearNumberStr1}-${monthNumberStr1}-${dayNumberStr1}`
            strDateArray = [date1]
    }
    if (values.length === 2){
        // converting selected values to strings
        monthNumberStr1 = convertDateNumberToStr(values[0].month.number)
        dayNumberStr1 = convertDateNumberToStr(values[0].day)
        yearNumberStr1 = convertDateNumberToStr(values[0].year)
        monthNumberStr2 = convertDateNumberToStr(values[1].month.number)
        dayNumberStr2 = convertDateNumberToStr(values[1].day)
        yearNumberStr2 = convertDateNumberToStr(values[1].year)
        // creating date strings to pass into function to generate date array
        let date1Str = `${yearNumberStr1}-${monthNumberStr1}-${dayNumberStr1}`
        let date2Str = `${yearNumberStr2}-${monthNumberStr2}-${dayNumberStr2}`
        let date1 = new Date(date1Str)
        let date2 = new Date(date2Str)
        // need to add 1 to each date string to properly include the edges in the array
        let newDate1 = date1.setDate(date1.getDate() + 1)
        let newDate2 = date2.setDate(date2.getDate() + 1)
        dateArray = getDates(new Date(newDate1), new Date(newDate2))
        for (let d of dateArray){
            strDateArray.push(`${convertDateNumberToStr(d.getFullYear())}-${convertDateNumberToStr(d.getMonth()+1)}-${convertDateNumberToStr(d.getDate())}`)
        }
    }

    // HANDLE DELETE FOR MEALS
    async function handleDelete(id) {
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/meals/${id}`;
        const fetchConfig = {
            method: "DELETE",
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            console.log('deleted')
            fetchMeals()
        } else {
            console.error(response)
        }
        return
    }


    return (
        <div>
            <Calendar value={values} onChange={setValues} range rangeHover />

            <div className="container">
                <div className="row">
                {strDateArray.map((date) => (
                    <div className="col-3" key={date} style={{padding: "20px"}} >
                        <Card className="text-center" style={{ width: "19rem", height: "19rem" }}>
                            <Card.Body>
                                <Card.Title>{date}</Card.Title>
                                <Card.Text>
                                    {mealDict[`${date}`] === undefined ?
                                    <p>
                                    </p> :
                                    mealDict[`${date}`].map((meal) => (
                                        <p key={meal[2]}>
                                            <Button className='btn-meal' onClick={() => handleClick(`/recipes/${meal[0]}`)}>
                                                {meal[1]}
                                            </Button>
                                            {' '}
                                            <Link onClick={() => handleDelete(meal[3])}>
                                                <Trash3 size={15} color="red" />
                                            </Link>
                                        </p>
                                    ))
                                    }
                                </Card.Text>
                                <AddRecipeModal date={date} token={token} recipes={props.recipes} accountId={accountId} fetchMeals={fetchMeals} />

                            </Card.Body>
                        </Card>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default MealCalendar
