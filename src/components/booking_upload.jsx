import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

import Calendar from "./calendar";
import "./bookings.css";

class BookingUpload extends Component {
  state = {
    new_bookings: {},
    overlaped_bookings: []
  };

  sameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  onDrop = files => {
    const data = new FormData();
    data.append("file", files[0]);
    axios
      .post("https://fipho.sse.codesandbox.io/upload", data, {})
      .then(res => {
        const { clean, overlaped } = JSON.parse(res.data);

        console.log("===>", clean);
        console.log("+++", overlaped);

        let new_bookings = {};

        if (clean.length > 0) {
          let minDate = false;
          let maxDate = false;

          for (let cleanBooking of clean) {
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

          new_bookings = {
            start: minDate,
            end: maxDate,
            data: clean
          };
        } else new_bookings = {};

        this.setState({
          new_bookings: new_bookings,
          overlaped_bookings: overlaped
        });
      });
  };

  handleOverlapedBookingSave = booking => {
    console.log(booking);
    axios
      .post("https://fipho.sse.codesandbox.io/booking", {
        booking: booking,
        checkOverlap: false
      })
      .then(res => {
        console.log(res);
        if (res.status) {
          const newD = this.state.overlaped_bookings.filter(ob => {
            return ob.file_entry.time === booking.time &&
              ob.file_entry.duration === booking.duration &&
              ob.file_entry.user_id === booking.user_id
              ? false
              : true;
          });

          this.setState({ overlaped_bookings: newD });
        }
      });
  };

  renderOverlapedBookings = () => {
    const { overlaped_bookings } = this.state;
    const html = [];
    if (overlaped_bookings.length > 0) {
      html.push(
        <h3>The following entries has been overlapped. Please review:</h3>
      );

      const htmlArray = overlaped_bookings.map(obData => {
        return (
          <div className="row" style={{ marginLeft: 20 }}>
            <div className="col-xs-4" style={{ color: "red" }}>
              {`Time: ${obData.file_entry.time}, Duration: ${
                obData.file_entry.duration
              }, User: ${obData.file_entry.user_id}`}
            </div>
            <div className="col-xs-4">
              {`Time: ${obData.db_entry.time}, Duration: ${
                obData.db_entry.duration
              }, User: ${obData.db_entry.user_id}`}
            </div>
            <div className="col-xs-4">
              <button
                onClick={() =>
                  this.handleOverlapedBookingSave(obData.file_entry)
                }
                className="btn btn-sm btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        );
      });

      htmlArray.map(h => html.push(h));
    }

    return html;
  };

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <div className="App-header">
          <Dropzone accept=".csv" onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => {
              return (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                </div>
              );
            }}
          </Dropzone>
        </div>

        {Object.keys(this.state.new_bookings).length > 0 && (
          <Calendar
            start={this.state.new_bookings.start}
            end={this.state.new_bookings.end}
            booking_data={this.state.new_bookings.data}
          />
        )}

        {this.renderOverlapedBookings()}

        <div className="App-main">
          <p>Existing bookings:</p>
          {(this.state.bookings || []).map((booking, i) => {
            const date = new Date(booking.time);
            const duration = booking.duration / (60 * 1000);
            return (
              <p key={i} className="App-booking">
                <span className="App-booking-time">{date.toString()}</span>
                <span className="App-booking-duration">
                  {duration.toFixed(1)}
                </span>
                <span className="App-booking-user">{booking.userId}</span>
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

export default BookingUpload;
