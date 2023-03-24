import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import TripCard from '../components/TripCard';
import { TripI } from './interface';
import { StyledBox, StyledGridBox, TripCardComponent } from './screens.styled';

const Home = () => {
	const t = [
		{
			title: 'Camping in Yosemite',
			bannerImage:
				'https://images.unsplash.com/photo-1518623380242-d992d3c57b37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80',
			likes: 20,
			duration: 5,
		},
		{
			title: 'Exploring the Grand Canyon',
			bannerImage:
				'https://images.unsplash.com/photo-1575527048208-6475b441e0a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
			likes: 15,
			duration: 4,
		},
		{
			title: 'Beach Vacation in Hawaii',
			bannerImage:
				'https://images.unsplash.com/photo-1545251142-f32339076e6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
			likes: 25,
			duration: 7,
		},
		{
			title: 'Skiing in the Swiss Alps',
			bannerImage:
				'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
			likes: 18,
			duration: 6,
		},
		{
			title: 'Road Trip across America',
			bannerImage:
				'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
			likes: 30,
			duration: 14,
		},
		{
			title: 'Hiking in Patagonia',
			bannerImage:
				'https://images.unsplash.com/photo-1558517286-8a9cb0b8c793?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80',
			likes: 12,
			duration: 8,
		},
		{
			title: 'Exploring the Wonders of Machu Picchu',
			bannerImage:
				'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80',
			likes: 22,
			duration: 5,
		},
		{
			title: 'Safari in Serengeti National Park',
			bannerImage:
				'https://images.unsplash.com/photo-1602410125631-7e736e36797c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80',
			likes: 27,
			duration: 10,
		},
		{
			title: 'Relaxing at a Spa Retreat in Bali',
			bannerImage:
				'https://images.unsplash.com/photo-1491510736257-3ad769ff47b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
			likes: 19,
			duration: 3,
		},
		{
			title: 'Camping in Yosemite',
			bannerImage:
				'https://images.unsplash.com/photo-1518623380242-d992d3c57b37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80',
			likes: 20,
			duration: 5,
		},
		{
			title: 'Exploring the Grand Canyon',
			bannerImage:
				'https://images.unsplash.com/photo-1575527048208-6475b441e0a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
			likes: 15,
			duration: 4,
		},
		{
			title: 'Beach Vacation in Hawaii',
			bannerImage:
				'https://images.unsplash.com/photo-1545251142-f32339076e6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
			likes: 25,
			duration: 7,
		},
		{
			title: 'Skiing in the Swiss Alps',
			bannerImage:
				'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
			likes: 18,
			duration: 6,
		},
		{
			title: 'Road Trip across America',
			bannerImage:
				'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
			likes: 30,
			duration: 14,
		},
		{
			title: 'Hiking in Patagonia',
			bannerImage:
				'https://images.unsplash.com/photo-1558517286-8a9cb0b8c793?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80',
			likes: 12,
			duration: 8,
		},
		{
			title: 'Exploring the Wonders of Machu Picchu',
			bannerImage:
				'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80',
			likes: 22,
			duration: 5,
		},
		{
			title: 'Safari in Serengeti National Park',
			bannerImage:
				'https://images.unsplash.com/photo-1602410125631-7e736e36797c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80',
			likes: 27,
			duration: 10,
		},
		{
			title: 'Relaxing at a Spa Retreat in Bali',
			bannerImage:
				'https://images.unsplash.com/photo-1491510736257-3ad769ff47b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
			likes: 19,
			duration: 3,
		},
	];

	const [trips, setTrips] = useState<TripI[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		axios
			.request({ method: 'GET', url: 'http://localhost:4000/api/allTrips' })
			.then(response => {
				setTrips(response.data);
				setLoading(!loading);
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

	return trips ? (
		<StyledGridBox>
			{trips.map(
				(
					{ bannerImage, title, likes, duration, _id, createdBy, description },
					index
				) => (
					<Link className='h-full' to={`/trip/${_id}`} key={index}>
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
