import ClubCard from '../components/clubCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Clubs = () => {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/clubs');
                setClubs(res.data);
            } catch (err) {
                console.error('Error fetching clubs');
            }
        };
        fetchClubs();
    }, []);

    return (
        <div className="container py-4">
            <h2 className="text-primary mb-4 fw-bold">All Clubs</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {clubs.map((club) => (
                    <div className="col" key={club._id}>
                        <ClubCard club={club} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clubs;
