import React, { useState, useEffect, componentDidMount } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from '@material-ui/styles';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import ListItemIcon from '@material-ui/core/ListItemIcon';


import CakeIcon from '@material-ui/icons/Cake';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    kalenderContainer: {
        backgroundColor: "#888"
    },
    day: {
        display: 'flex',
        justifyContent: 'center',
        border: "1px solid #ccc",
        width: "100%",
        paddingTop: "25%",
        paddingBottom: "25%",
    },

    currentDay: {
        border: "4px solid rgba(255, 255, 0, 1);"
    },
    prevMonth: {
        color: "rgba(255, 255, 255, 0.4);",
        backgroundColor: "rgba(0, 0, 0, 0.4);",
        border: "1px solid #555",
    },

    nextMonth: {
        color: "rgba(255, 255, 255, 0.4);",
        backgroundColor: "rgba(0, 0, 0, 0.4);",
        border: "1px solid #555",
    },

    weekDays: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.20);",
        fontSize: "16px",
        border: "1px solid #777",
        color: "rgba(255, 255, 255, 0.75);",
        paddingTop: "15%",
        paddingBottom: "15%"
    },
    calenderHeader: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

const Kalender = (props) => {

    const checkIfNewYear = (value) => {
        if (value > 11) {
            setYear(year + 1)
        }

        else if (value < 0) {
            setYear(year - 1)
        }

        else {

        }
    }

    const correctMonthValues = (value) => {
        if (value > 11) {
            return 0;
        }

        if (value < 0) {
            return 11;
        }

        else {
            return value;
        }
    }
    const classes = useStyles();
    const date = new Date();
    let [year, setYear] = useState(date.getFullYear());

    const currentDay = date.getDate();
    const weekdayIndex = date.getDay();
    const weekDays = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];

    let [dayOffset, setDayOffset] = useState(weekdayIndex - (currentDay % 7));

    let [monthIndex, setMonthIndex] = useState(date.getMonth());
    const months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
    const monthDays = [31, year % 4 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const beboere = useSelector((state) => Object.values(state.beboer.beboere));

    const beboereBursdag = beboere.filter(beboer =>
        (beboer.fodselsdato).includes("-0" + (correctMonthValues(monthIndex - 1) + 1).toString() + "-") ||
        (beboer.fodselsdato).includes("-" + (correctMonthValues(monthIndex - 1) + 1).toString() + "-") ||
        (beboer.fodselsdato).includes("-0" + (correctMonthValues(monthIndex) + 1).toString() + "-") ||
        (beboer.fodselsdato).includes("-" + (correctMonthValues(monthIndex) + 1).toString() + "-") ||
        (beboer.fodselsdato).includes("-0" + (correctMonthValues(monthIndex + 1) + 1).toString() + "-") ||
        (beboer.fodselsdato).includes("-" + (correctMonthValues(monthIndex + 1) + 1).toString() + "-")
    );

    const calculateDayOffset = (monthIndexCopy) => {
        let offset = 0;
        let yearOffset = 0;

        if (monthIndexCopy == date.getMonth()) {
            offset = weekdayIndex - (currentDay % 7);
        }
        else {

            let offsets = [];

            if (monthIndexCopy < date.getMonth()) {
                for (let i = date.getMonth() - 1; i >= monthIndexCopy; i--) {
                    let value;
                    if (i == date.getMonth() - 1) {
                        value = (7 - ((monthDays[correctMonthValues(i)] - (weekdayIndex - (currentDay % 7))) % 7)) % 7;
                    }
                    else {
                        value = (7 - ((monthDays[correctMonthValues(i)] - offsets.pop()) % 7)) % 7;
                    }

                    offsets.push(value);
                }
                offset = offsets.pop();
            }

            else {
                for (let i = date.getMonth() + 1; i < monthIndexCopy + 1; i++) {
                    let value;
                    if (i == date.getMonth() + 1) {
                        value = ((weekdayIndex - (currentDay % 7)) + (monthDays[correctMonthValues(i - 1)] % 7)) % 7;
                    }
                    else {
                        value = (offsets.pop() + (monthDays[correctMonthValues(i - 1)] % 7)) % 7;
                    }



                    offsets.push(value);
                }
                offset = offsets.pop();
            }
        }
        return offset;
    }

    let createCalendar = () => {
        let calendar = [];
        // Calculate the dayOffset for the month showing in the calendar.

        for (var i = 0; i < 42; i++) {
            let dato = "";
            let day;
            let dayNumber;
            let dayClassName = `${classes.day} `;
            let bursdager = [];


            // Check if the day is part of the next or previous month.
            if ((i < dayOffset) || (i - dayOffset >= monthDays[monthIndex])) {

                // The day is part of the previous month.
                if (i < dayOffset) {
                    dayNumber = monthDays[correctMonthValues(monthIndex - 1)] - dayOffset + i + 1;
                    bursdager = beboereBursdag.filter(beboer =>
                        (beboer.fodselsdato).includes("-0" + (correctMonthValues(monthIndex - 1) + 1).toString() + "-" + dayNumber.toString()) ||
                        (beboer.fodselsdato).includes("-" + (correctMonthValues(monthIndex - 1) + 1).toString() + "-" + dayNumber.toString())
                    );
                    dayClassName += `${classes.prevMonth}`;
                    dato += dayNumber.toString() + ". " + months[correctMonthValues(monthIndex - 1)] + ", " + year.toString();
                }
                // The day is part of the next month.
                else {
                    dayNumber = i + 1 - dayOffset - monthDays[monthIndex];
                    if (dayNumber < 10) {
                        bursdager = beboereBursdag.filter(beboer =>
                            (beboer.fodselsdato).includes("-0" + (correctMonthValues(monthIndex + 1) + 1).toString() + "-0" + dayNumber.toString()) ||
                            (beboer.fodselsdato).includes("-" + (correctMonthValues(monthIndex + 1) + 1).toString() + "-0" + dayNumber.toString())
                        );
                    }

                    else {
                        bursdager = beboereBursdag.filter(beboer =>
                            (beboer.fodselsdato).includes("-0" + (correctMonthValues(monthIndex + 1) + 1).toString() + "-" + dayNumber.toString()) ||
                            (beboer.fodselsdato).includes("-" + (correctMonthValues(monthIndex + 1) + 1).toString() + "-" + dayNumber.toString())
                        );
                    }
                    dayClassName += `${classes.nextMonth}`;
                    dato += dayNumber.toString() + ". " + months[correctMonthValues(monthIndex + 1)] + ", " + year.toString();
                }

            }

            // Since the day was not a part of the previous or next month, it has to be the current month.
            else {
                // If day is the current day, add extra styling properties to that day.
                if ((currentDay - 1 == i - dayOffset) && (monthIndex == date.getMonth())) {
                    dayClassName += `${classes.currentDay}`;
                }
                // If the day has not been assigned a day number, assign a value.
                if (!dayNumber) {
                    dayNumber = i + 1 - dayOffset;
                }

                if (dayNumber < 10) {
                    bursdager = beboereBursdag.filter(beboer =>
                        (beboer.fodselsdato).includes("-0" + (correctMonthValues(monthIndex) + 1).toString() + "-0" + dayNumber.toString()) ||
                        (beboer.fodselsdato).includes("-" + (correctMonthValues(monthIndex) + 1).toString() + "-0" + dayNumber.toString())
                    );
                }

                else {
                    bursdager = beboereBursdag.filter(beboer =>
                        (beboer.fodselsdato).includes("-0" + (correctMonthValues(monthIndex) + 1).toString() + "-" + dayNumber.toString()) ||
                        (beboer.fodselsdato).includes("-" + (correctMonthValues(monthIndex) + 1).toString() + "-" + dayNumber.toString())
                    );
                }
                dato += dayNumber.toString() + ". " + months[correctMonthValues(monthIndex)] + ", " + year.toString();
            }

            if (bursdager.length == 0) {

                day = <ListItem onClick={() => props.toggleSeDetaljertDag(dato, bursdager)} button className={dayClassName}>{dayNumber}</ListItem>;
            }
            else {
                day = <ListItem onClick={() => props.toggleSeDetaljertDag(dato, bursdager)} button className={dayClassName} > {dayNumber}
                    < CakeIcon />

                </ListItem >;
            }
            calendar.push(day);
        }
        return calendar;
    }


    return (
        <Card>
            <CardHeader title={"Kalender"}>
            </CardHeader>
            <CardContent>
                <Typography>
                    I dag er det {date.getDate() + ". " + months[date.getMonth()] + ", " + date.getFullYear() + "."}
                </Typography>



                <List style={{ display: "grid", gridTemplateColumns: "14.286% 14.286% 14.286% 14.286% 14.286% 14.286% 14.286%" }}>

                    {weekDays.map((weekday) => <ListItem className={classes.weekDays}>{weekday}</ListItem>)}
                    {createCalendar()}
                </List>
                <Container style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <Button onClick={() => { setMonthIndex(correctMonthValues(monthIndex - 1)); checkIfNewYear(monthIndex - 1); setDayOffset(calculateDayOffset(correctMonthValues(monthIndex - 1))); }} variant="contained" >{"< " + months[correctMonthValues(monthIndex - 1)]}</Button>
                    <Typography className={classes.calenderHeader} variant="h6">
                        {months[monthIndex] + ", " + year}
                    </Typography>
                    <Button onClick={() => { setMonthIndex(correctMonthValues(monthIndex + 1)); checkIfNewYear(monthIndex + 1); setDayOffset(calculateDayOffset(correctMonthValues(monthIndex + 1))); }} variant="contained" >{months[correctMonthValues(monthIndex + 1)] + " >"}</Button>
                </Container>
            </CardContent>
        </Card>
    )
}

export default Kalender;