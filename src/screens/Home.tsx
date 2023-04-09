import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import TripCard from '../components/TripCard';
import { TripI } from './interface';
import { StyledBox, StyledGridBox, TripCardComponent } from './screens.styled';
import { getAllTrips } from '../apiFunctions';

const Home = () => {
	const [trips, setTrips] = useState<TripI[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getAllTrips()
			.then(data => {
				setTrips(data);
				setLoading(false);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	return trips ? (
		<StyledGridBox className='mt-8'>
			{trips.map(
				(
					{ bannerImage, title, likes, duration, _id, createdBy, description },
					index
				) => (
					<Link className='h-full w-max' to={`/trip/${_id}`} key={index}>
						<TripCard
							bannerImage={bannerImage}
							title={title}
							likes={likes}
							duration={duration}
							username={createdBy.username}
							description={description}
						/>
					</Link>
				)
			)}
		</StyledGridBox>
	) : loading ? (
		<StyledBox>
			<Loading />
		</StyledBox>
	) : (
		<div>no data</div>
	);
};

export default Home;
