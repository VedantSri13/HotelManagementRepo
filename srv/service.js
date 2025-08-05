const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
  const { Bookings, Hotels } = this.entities;

  this.before('CREATE', Bookings, async (req) => {
    const { hotelID, roomsBooked } = req.data;
    const hotel = await SELECT.one.from(Hotels).where({ hotelID });

    if (hotel.availableRooms < roomsBooked) {
      return req.error(400, `Only ${hotel.availableRooms} rooms are available`);
    }

    const nights = (new Date(req.data.checkOutDate) - new Date(req.data.checkInDate)) / (1000 * 60 * 60 * 24);
    req.data.totalAmount = nights * hotel.pricePerNight * roomsBooked;
  });

  this.after('CREATE', Bookings, async (data) => {
    await UPDATE(Hotels)
      .set({ availableRooms: { '-=': data.roomsBooked } })
      .where({ hotelID: data.hotelID });
  });

  this.on('cancelBooking', async (req) => {
    const { bookingID } = req.data;

    const booking = await SELECT.one.from(Bookings).where({ bookingID });
    if (!booking) return req.error(404, 'Booking not found');

    await DELETE.from(Bookings).where({ bookingID });

    await UPDATE(Hotels)
      .set({ availableRooms: { '+=': booking.roomsBooked } })
      .where({ hotelID: booking.hotelID });

    return 'Booking cancelled and rooms released';
  });
});
