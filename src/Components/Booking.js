import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';

const Booking = () => {
    let { id } = useParams();
    const [show, setShow] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        date: '',
        time: '',
        numTickets: 1,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShow = async () => {
            setIsLoading(true);
            try {
                const response = await fetchShows();
                const objectById = response.filter((obj) => obj.show.id === Number(id));
                setShow(objectById[0]);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchShow();
    }, []);

    const handleBooking = async () => {
        // Send booking request to server
        try {
            // setIsLoading(true);
            // const response = await axios.post('/api/bookings', bookingDetails); 
            // Handle successful booking (e.g., display confirmation message)
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchShows = async () => {
        try {
            const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
            return response.data;
        } catch (error) {
            console.error('Error fetching shows:', error);
            throw error;
        }
    };
    return (
        <div className="booking-container">
            {isLoading && <p>Loading show details...</p>}
            {error && <p>Error fetching show: {error.message}</p>}
            {show && (
                <>
                    {show.show.image?.medium ? (
                        <img src={show.show.image.medium} alt={show.show.name} className="show-image" />) :
                        (<img src="https://www.shutterstock.com/image-vector/image-photo-jpg-file-mountains-600nw-2122527767.jpg" alt={show.show.name} className="show-image" />
                        )}
                    {show.show?.name && (
                        <h2>Movie: {show.show.name}</h2>
                    )}

                    <h2>Booking Details</h2>
                    <div className="booking-form">
                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" value={bookingDetails.date} onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })} />

                        <label htmlFor="time">Time:</label>
                        <input type="time" id="time" value={bookingDetails.time} onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })} />

                        <label htmlFor="numTickets">Number of Tickets:</label>
                        <input type="number" id="numTickets" min="1" value={bookingDetails.numTickets} onChange={(e) => setBookingDetails({ ...bookingDetails, numTickets: e.target.value })} />
                    </div>

                    <button onClick={handleBooking} disabled={isLoading}>
                        {isLoading ? 'Booking...' : 'Book Now'}
                    </button>

                </>
            )}
        </div>
    )
}

export default Booking