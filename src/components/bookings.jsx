import React, { Component } from "react";
import axios from "axios";
import Calendar from "./calendar";

class Bookings extends Component {
  state = {
    bookings: [],
    start: "",
    end: ""
  };

  sameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  componentDidMount() {
    axios.get("https://fipho.sse.codesandbox.io/bookings").then(response => {
      let minDate = false;
      let maxDate = false;

      for (let cleanBooking of response.data) {
        let startDate = new Date(Date.parse(cleanBooking.time));
        let endDate = new Date(
          (startDate * 1 + cleanBooking.duration * 60 * 1000) * 1
        );

        let minDateCompare = Date.parse(
          startDate.getFullYear() +
            "-" +
            (startDate.getMonth() * 1 + 1 * 1) * 1 +
            "-" +
            startDate.getDate()
        );
        let maxDateCompare = Date.parse(
          startDate.getFullYear() +
            "-" +
            (startDate.getMonth() * 1 + 1 * 1) * 1 +
            "-" +
            startDate.getDate()
        );

        if (!this.sameDay(startDate, endDate))
          maxDateCompare = Date.parse(
            endDate.getFullYear() +
              "-" +
              (endDate.getMonth() * 1 + 1 * 1) * 1 +
              "-" +
              endDate.getDate()
          );

        if (minDate === false || minDate > minDateCompare)
          minDate = minDateCompare;

        if (maxDate === false || maxDate < maxDateCompare)
          maxDate = maxDateCompare;
      }

      this.setState({ start: minDate, end: maxDate, bookings: response.data });
    });
  }

  render() {
    const { start, end, bookings } = this.state;
    return <Calendar start={start} end={end} booking_data={bookings} />;
  }
}

export default Bookings;
