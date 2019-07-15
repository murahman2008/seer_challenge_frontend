import React, { Component } from "react";

class Calendar extends Component {
  renderBookingColumns = (date, bookings) => {
    //console.log(date, bookings);
    if (bookings.length <= 0) {
      return [<td colSpan="13" />];
    } else {
      const tmpBookings = [];
      for (let booking of bookings) {
        const tmpData = Object.assign({}, booking);
        tmpData.start = Date.parse(
          new Date(Date.parse(tmpData.time)).toUTCString()
        );
        tmpData.end =
          (tmpData.start * 1 + tmpData.duration * 60 * 1000 * 1) * 1;
        tmpBookings.push(tmpData);
      }

      const html = [];

      for (let i = 6; i <= 22; i++) {
        const tableStart = Date.parse(
          date.toDateString() + " 0" + i + ":00:00 GMT+1000"
        );
        const tableEnd = Date.parse(
          date.toDateString() + " 0" + (i * 1 + 1 * 1) * 1 + ":00:00 GMT+1000"
        );

        const bookingsToShow = tmpBookings.filter(tb => {
          return (
            (tb.start >= tableStart && tb.start <= tableEnd) ||
            (tb.end >= tableStart && tb.end <= tableEnd) ||
            (tb.start <= tableStart && tb.end >= tableEnd)
          );
        });

        //console.log(`For ${i} to ${i + 1} :`, bookingsToShow);

        const slotArray = [
          { start: tableStart, end: (tableStart * 1 + 600 * 1000) * 1 },
          {
            start: (tableStart * 1 + 600 * 1000) * 1,
            end: (tableStart * 1 + 1200 * 1000) * 1
          },
          {
            start: (tableStart * 1 + 1200 * 1000) * 1,
            end: (tableStart * 1 + 1800 * 1000) * 1
          },
          {
            start: (tableStart * 1 + 1800 * 1000) * 1,
            end: (tableStart * 1 + 2400 * 1000) * 1
          },
          {
            start: (tableStart * 1 + 2400 * 1000) * 1,
            end: (tableStart * 1 + 3000 * 1000) * 1
          },
          {
            start: (tableStart * 1 + 3000 * 1000) * 1,
            end: (tableStart * 1 + 3600 * 1000) * 1
          }
        ];
        const colorArray = ["blue", "green"];
        let i = 0;
        html.push(
          <td>
            {bookingsToShow.map(bs => {
              i = (i * 1 + 1) * 1;
              let index = 0;
              if (i % 2 === 0) index = 1;

              return (
                <React.Fragment>
                  <div className="row">
                    <div
                      className="col-xs-2"
                      style={{ backgroundColor: colorArray[index] }}
                    >
                      {bs.start <= slotArray[0].start &&
                        bs.end >= slotArray[0].end && <div>&nbsp;</div>}
                    </div>
                    <div
                      className="col-xs-2"
                      style={{ backgroundColor: colorArray[index] }}
                    >
                      {bs.start <= slotArray[1].start &&
                        bs.end >= slotArray[1].end && <div>&nbsp;</div>}
                    </div>
                    <div
                      className="col-xs-2"
                      style={{ backgroundColor: colorArray[index] }}
                    >
                      {bs.start <= slotArray[2].start &&
                        bs.end >= slotArray[2].end && <div>&nbsp;</div>}
                    </div>
                    <div
                      className="col-xs-2"
                      style={{ backgroundColor: colorArray[index] }}
                    >
                      {bs.start <= slotArray[3].start &&
                        bs.end >= slotArray[3].end && <div>&nbsp;</div>}
                    </div>
                    <div
                      className="col-xs-2"
                      style={{ backgroundColor: colorArray[index] }}
                    >
                      {bs.start <= slotArray[4].start &&
                        bs.end >= slotArray[4].end && <div>&nbsp;</div>}
                    </div>
                    <div
                      className="col-xs-2"
                      style={{ backgroundColor: colorArray[index] }}
                    >
                      {bs.start <= slotArray[5].start &&
                        bs.end >= slotArray[5].end && <div>&nbsp;</div>}
                    </div>
                  </div>
                  {/* <span>{bs.time}</span>
                  <span>{new Date(bs.start)}</span>
                  <span>{new Date(bs.end)}</span> */}
                </React.Fragment>
              );
            })}
          </td>
        );
      }

      return html;
    }
  };

  generateHTML = dateArray => {
    const html = dateArray.map(d => {
      const bookingColumns = this.renderBookingColumns(d.date, d.bookings);
      return (
        <tr>
          <td>{d.date.toString()}</td>
          {bookingColumns}
        </tr>
      );
    });

    return html;
  };

  render() {
    const { start, end, booking_data } = this.props;

    let date1 = new Date(start);
    let date2 = new Date(end);

    date1 = new Date(
      Date.UTC(
        date1.getUTCFullYear(),
        date1.getUTCMonth(),
        date1.getUTCDate(),
        date1.getUTCHours(),
        date1.getUTCMinutes(),
        date1.getUTCSeconds()
      )
    );

    date2 = new Date(
      Date.UTC(
        date2.getUTCFullYear(),
        date2.getUTCMonth(),
        date2.getUTCDate(),
        date2.getUTCHours(),
        date2.getUTCMinutes(),
        date2.getUTCSeconds()
      )
    );

    /// find the differenc between the dates ///

    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    //console.log(date1, date2);
    //console.log(diffDays);
    let tempDate = new Date();
    const dateArray = [];

    for (let i = 0; i <= diffDays; i++) {
      let tDate = (date1.getTime() * 1 + 86400000 * i) * 1;
      tDate = new Date(tDate).toDateString();

      const bookingDataForDate = booking_data.filter(b => {
        return (
          Date.parse(new Date(Date.parse(b.time)).toDateString()) ===
          Date.parse(tDate)
        );
      });

      dateArray.push({
        date: new Date(tDate),
        bookings: bookingDataForDate
      });
    }

    console.log(dateArray);

    const html = this.generateHTML(dateArray);

    return (
      <table className="table table-bodered">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">6 AM</th>
            <th scope="col">7 AM</th>
            <th scope="col">8 AM</th>
            <th scope="col">9 AM</th>
            <th scope="col">10 AM</th>
            <th scope="col">11 AM</th>
            <th scope="col">12 PM</th>
            <th scope="col">1 PM</th>
            <th scope="col">2 PM</th>
            <th scope="col">3 PM</th>
            <th scope="col">4 PM</th>
            <th scope="col">5 PM</th>
            <th scope="col">6 PM</th>
            <th scope="col">7 PM</th>
            <th scope="col">8 PM</th>
            <th scope="col">9 PM</th>
            <th scope="col">10 PM</th>
            <th scope="col">11 PM</th>
          </tr>
        </thead>
        <tbody>{html}</tbody>
      </table>
    );
  }
}

export default Calendar;
