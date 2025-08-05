using hotel.booking as db from '../db/schema';

service HotelService {
  entity Hotels    as projection on db.Hotels;
  entity Guests    as projection on db.Guests;
  entity Bookings  as projection on db.Bookings;

  action cancelBooking(bookingID: UUID) returns String;
}