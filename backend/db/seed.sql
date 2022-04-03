DROP DATABASE if exists stonebookings;

CREATE DATABASE stonebookings;

\c stonebookings

CREATE TABLE meetingRooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    capacity VARCHAR,
    floor VARCHAR
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    meetingName VARCHAR,
    meetingRoom_id INT references meetingRooms (id),
    startDate VARCHAR,
    endDate VARCHAR  
);
