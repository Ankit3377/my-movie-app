import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Details.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Details = (match) => {
    let { id } = useParams();
    const [show, setShow] = useState(null);
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
        <div className="details-container">
            {isLoading && <p>Loading show details...</p>}
            {error && <p>Error fetching show: {error.message}</p>}
            {show && (
                <>
                    <h2>{show.name}</h2>
                    {show.show.image?.medium ? (
                        <img src={show.show.image.medium} alt={show.show.name} className="show-image" />) :
                        (<img src="https://www.shutterstock.com/image-vector/image-photo-jpg-file-mountains-600nw-2122527767.jpg" alt={show.show.name} className="show-image" />
                        )}
                    <div className="show-details">
                        {show.show?.genres && (
                            <p>Genres: {show.show.genres.join(', ')}</p>
                        )}
                        {show.show.network?.name && (
                            <p>Network: {show.show.network.name}</p>
                        )}
                        {show.show.rating?.average && (
                            <p>Rating: {show.show.rating.average}</p>
                        )}
                        <br />
                        <p>Summary: </p>
                        {show.show?.summary && (
                            <p dangerouslySetInnerHTML={{ __html: show.show.summary }}></p>
                        )}
                        <br />
                        <Link to={`/booking/${id}`} className="booking-button">
                            Book Now
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default Details
