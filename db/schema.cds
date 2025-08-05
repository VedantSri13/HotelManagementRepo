namespace hotel.booking;

entity Hotels {
  key hotelID       : UUID;
  name              : String(100);
  location          : String(100);
  rating            : Decimal(2,1);
  totalRooms        : Integer;
  availableRooms    : Integer;
  pricePerNight     : Decimal(10,2);
  description       : String(500);
}

entity Guests {
  key guestID       : UUID;
  name              : String(100);
  email             : String(100);
  phone             : String(20);
}

entity Bookings {
  key bookingID     : UUID;
  hotelID           : Association to Hotels;
  guestID           : Association to Guests;
  checkInDate       : Date;
  checkOutDate      : Date;
  numberOfGuests    : Integer;
  roomsBooked       : Integer;
  totalAmount       : Decimal(10,2);
}
