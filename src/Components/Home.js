import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'

const Home = () => {
    const [shows, setShows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchShows();
                setShows(response);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
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
        <div className="container">
            {isLoading && <p>Loading shows...</p>}
            {error && <p>Error fetching shows: {error.message}</p>}
            {shows.length > 0 &&
                (
                    <div className="row">
                        {shows.map((show) => (
                            <div key={show.show.id} className="col-4">
                                <Link to={`/details/${show.show.id}` } style={{'text-decoration': 'none', 'color':'black' }}>
                                {show.show.image?.medium ? (
                                    <img src={show.show.image.medium} alt={show.show.name} className="show-image" />):
                                    (<img src= "https://www.shutterstock.com/image-vector/image-photo-jpg-file-mountains-600nw-2122527767.jpg" alt={show.show.name} className="show-image" />
                                )}
                                {show.show?.name && (
                                <h4>{show.show.name}</h4>
                                )}
                                <p>
                                    Genres: {show.show.genres.join(', ')} <br /></p>
                                    {show.show.network?.name && (
                                    <p>Network: {show.show.network.name} <br /></p>
                                    )}
                                {show.show.rating?.average && (
                                <p>   Rating: {show.show.rating.average}</p>
                                )}
                                
                                </Link>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default Home