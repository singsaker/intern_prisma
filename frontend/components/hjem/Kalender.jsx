import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_VAKTER } from "../../src/query/vakt";
import { getVakter } from "../../src/actions/vakt";

import { useLazyQuery } from "@apollo/client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

import { TextField } from "@mui/material";
import { alpha, styled } from "@mui/system";
import { CalendarPicker, LocalizationProvider, PickersDay } from "@mui/lab";

import endOfWeek from "date-fns/endOfWeek";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfWeek from "date-fns/startOfWeek";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Badge from "@mui/material/Badge";

import dateFormat from "dateformat";

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, isFirstDay, isLastDay }) => ({
  // ...(dayIsBetween && {
  //   borderRadius: 0,
  //   backgroundColor: theme.palette.primary.main,
  //   color: theme.palette.common.white,
  //   "&:hover, &:focus": {
  //     backgroundColor: theme.palette.primary.dark,
  //   },
  // }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
  height: 80,
  width: 80,
  backgroundColor: alpha(theme.palette.background.paper, 0.4),
}));

const CustomDatePicker = styled(CalendarPicker)(({ theme }) => ({
  width: "100%",
  maxHeight: "100%",
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadiusSm,
  paddingBottom: theme.spacing(2),

  ".PrivatePickersSlideTransition-root": {
    minHeight: 500,
  },
  ".PrivatePickersFadeTransitionGroup-root > div > div > span": {
    width: 76,
  },
}));

const Kalender = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();

  const beboere = useSelector((state) => Object.values(state.beboer.beboere));
  const birthdays = beboere.map((b) => dateFormat(new Date(b.fodselsdato), "dd.mm"));
  const bruker_id = useSelector((state) => state.auth.bruker_id);

  //Hent vaktene for personen som er logget inn.
  const [vakterQuery] = useLazyQuery(GET_VAKTER, {
    variables: {
      bruker_id: bruker_id,
      fraDato: `${currentDate.getFullYear()}-01-01T00:00:00.000Z`,
      tilDato: `${currentDate.getFullYear()}-12-31T00:00:00.000Z`,
    },
    onCompleted(data) {
      dispatch(getVakter(data));
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    vakterQuery();
  }, [bruker_id]);

  const brukerVakter = useSelector((state) => Object.values(state.vakt.vakter));
  const vakter = brukerVakter.map((v) => dateFormat(new Date(v.dato), "dd.mm"));

  const [value, setValue] = React.useState(new Date());
  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(value);
    const end = endOfWeek(value);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    const isSelected = !pickersDayProps.outsideCurrentMonth && birthdays.indexOf(dateFormat(date, "dd.mm")) > 0;
    const isVaktSelected = !pickersDayProps.outsideCurrentMonth && vakter.indexOf(dateFormat(date, "dd.mm")) > 0;

    return (
      <Badge
        sx={{ top: -10 }}
        key={date.toString()}
        overlap="circular"
        variant="dot"
        invisible={!isSelected}
        color="secondary"
      >
        <Badge
          sx={{ top: 10 }}
          key={date.toString()}
          overlap="circular"
          variant="dot"
          invisible={!isVaktSelected}
          color="error"
        >
          <CustomPickersDay
            {...pickersDayProps}
            disableMargin
            dayIsBetween={dayIsBetween}
            isFirstDay={isFirstDay}
            isLastDay={isLastDay}
          />
        </Badge>
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader title={"Kalender"}></CardHeader>
      <CardContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CustomDatePicker
            label="Week picker"
            value={value}
            view="day"
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderDay={renderWeekPickerDay}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="'Week of' MMM d"
          />
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
};

export default Kalender;
