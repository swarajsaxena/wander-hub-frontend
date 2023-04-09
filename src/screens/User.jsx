import React, { useEffect, useState } from 'react';
import { StyledGridBox } from './screens.styled';
import TripCard from '../components/TripCard';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import { getUserData } from '../apiFunctions';

const User = () => {
	const t = [
		{
			createdBy: {
				userId: '640da9edee157c8dabb95429',
				username: 'swaraj24',
				email: 'swaraj@gmail.com',
			},
			_id: '640daeb3c1577df5331dda0e',
			title: 'Exploring Paris',
			cityToVisit: 'Paris',
			description: 'Discover the beauty of Paris, its culture, and history.',
			duration: 2,
			days: [
				{
					place: 'Eiffel Tower',
					attractions: [
						'Climb the tower',
						'Watch the sunset',
						'Enjoy the view',
					],
					photos: [
						'https://images.unsplash.com/photo-1505205296326-2178af1b47bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
						'https://images.unsplash.com/photo-1508050919630-b135583b29ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
					],
					description:
						'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris.',
					_id: '640daeb3c1577df5331dda0f',
				},
				{
					place: 'Notre-Dame Cathedral',
					attractions: [
						'Visit the cathedral',
						'Climb the towers',
						'Enjoy the view',
					],
					photos: [
						'https://images.unsplash.com/photo-1581211653431-310ba15ff9bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
						'https://images.unsplash.com/photo-1555425748-f780612e5634?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
					],
					description:
						'Notre-Dame de Paris is a medieval Catholic cathedral on the Île de la Cité in the fourth arrondissement of Paris.',
					_id: '640daeb3c1577df5331dda10',
				},
			],
			bannerImage:
				'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80',
			comments: [],
			likes: [],
			createdOn: '2023-03-12T10:51:31.994Z',
			__v: 0,
		},
		{
			createdBy: {
				userId: '640da9edee157c8dabb95429',
				username: 'swaraj24',
				email: 'swaraj@gmail.com',
			},
			_id: '640db12dfa4b414459f53aff',
			title: 'One Day in Paris',
			cityToVisit: 'Paris',
			description: 'Discover the beauty of Paris in just one day.',
			duration: 1,
			days: [
				{
					place: 'Louvre Museum',
					attractions: [
						'See the Mona Lisa',
						'Admire the Winged Victory of Samothrace',
						'Explore the Egyptian Antiquities',
					],
					photos: [
						'https://images.unsplash.com/photo-1554403464-aa07c1d085f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80',
						'https://images.unsplash.com/photo-1558611913-d707111c702e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
					],
					description:
						"The Louvre Museum is the world's largest art museum and a historic monument in Paris. It is home to some of the world's most famous works of art, including the Mona Lisa and the Winged Victory of Samothrace.",
					_id: '640db12dfa4b414459f53b00',
				},
			],
			bannerImage:
				'https://images.unsplash.com/photo-1478145046317-39f10e56b5c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXMlMjBjaXR5JTIwc3RhdGVzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
			comments: [],
			likes: [],
			createdOn: '2023-03-12T11:02:05.460Z',
			__v: 0,
		},
		{
			createdBy: {
				userId: '640da9edee157c8dabb95429',
				username: 'swaraj24',
				email: 'swaraj@gmail.com',
			},
			_id: '640db1c93577ef060f66b3db',
			title: 'Another Day in Paris',
			cityToVisit: 'Paris',
			description: 'Discover the beauty of Paris in just one day.',
			duration: 1,
			days: [
				{
					place: 'Louvre Museum',
					attractions: [
						'See the Mona Lisa',
						'Admire the Winged Victory of Samothrace',
						'Explore the Egyptian Antiquities',
					],
					photos: [
						'https://images.unsplash.com/photo-1554403464-aa07c1d085f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80',
						'https://images.unsplash.com/photo-1558611913-d707111c702e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
					],
					description:
						"The Louvre Museum is the world's largest art museum and a historic monument in Paris. It is home to some of the world's most famous works of art, including the Mona Lisa and the Winged Victory of Samothrace.",
					_id: '640db1c93577ef060f66b3dc',
				},
			],
			bannerImage:
				'https://images.unsplash.com/photo-1478145046317-39f10e56b5c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXMlMjBjaXR5JTIwc3RhdGVzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
			comments: [],
			likes: [],
			createdOn: '2023-03-12T11:04:41.946Z',
			__v: 0,
		},
		{
			createdBy: {
				userId: '640da9edee157c8dabb95429',
				username: 'swaraj24',
				email: 'swaraj@gmail.com',
			},
			_id: '640f0b2c6dfaebc405742097',
			title: 'Another Day in Paris',
			cityToVisit: 'Paris',
			description: 'Discover the beauty of Paris in just one day.',
			duration: 1,
			days: [
				{
					place: 'Louvre Museum',
					attractions: [
						'See the Mona Lisa',
						'Admire the Winged Victory of Samothrace',
						'Explore the Egyptian Antiquities',
					],
					photos: [
						'https://images.unsplash.com/photo-1554403464-aa07c1d085f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80',
						'https://images.unsplash.com/photo-1558611913-d707111c702e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
					],
					description:
						"The Louvre Museum is the world's largest art museum and a historic monument in Paris. It is home to some of the world's most famous works of art, including the Mona Lisa and the Winged Victory of Samothrace.",
					_id: '640f0b2c6dfaebc405742098',
				},
			],
			bannerImage:
				'https://images.unsplash.com/photo-1478145046317-39f10e56b5c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXMlMjBjaXR5JTIwc3RhdGVzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
			comments: [],
			likes: [],
			createdOn: '2023-03-13T11:38:20.066Z',
			__v: 0,
		},
		{
			createdBy: {
				userId: '640da9edee157c8dabb95429',
				username: 'swaraj24',
				email: 'swaraj@gmail.com',
			},
			_id: '640f0f56172b63e565a48d6f',
			title: 'Exploring Delhi',
			cityToVisit: 'Delhi',
			description:
				'A two-day itinerary for exploring the rich cultural heritage and delicious food of Delhi.',
			duration: 2,
			days: [
				{
					place: 'Old Delhi',
					attractions: ['Red Fort', 'Chandni Chowk', 'Jama Masjid'],
					photos: [
						'https://images.unsplash.com/photo-1676305295296-74620d7c5443?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
						'https://images.unsplash.com/photo-1513014576558-921f00d80b77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80',
						'https://images.unsplash.com/photo-1637301625903-e25a30ba1bb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80',
					],
					description:
						'Experience the charm of Old Delhi by visiting the iconic Red Fort, exploring the vibrant markets of Chandni Chowk, and offering prayers at the historic Jama Masjid.',
					_id: '640f0f56172b63e565a48d70',
				},
				{
					place: 'New Delhi',
					attractions: ['India Gate', 'Qutub Minar', 'Lotus Temple'],
					photos: [
						'https://images.unsplash.com/photo-1586183189334-1ad3cd238e21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80',
						'https://images.unsplash.com/photo-1586183189334-1ad3cd238e21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80',
						'https://images.unsplash.com/photo-1586520748101-a5df6afa76f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
					],
					description:
						'Spend the second day exploring the landmarks of New Delhi, including the majestic India Gate, the historic Qutub Minar, and the serene Lotus Temple.',
					_id: '640f0f56172b63e565a48d71',
				},
			],
			bannerImage:
				'https://www.travelandleisure.com/thmb/iAIrOVW7yWrDG8pZBpKMOvEGuNQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/new-delhi-india-NEWDELHITG0721-60d592e1603349298a0206d67d08582b.jpg',
			comments: [
				{
					user: {
						userId: '640da9edee157c8dabb95429',
						username: 'swaraj24',
					},
					comment:
						'This is a very good trip, i had gone to this place myself and it was wonderful.',
					_id: '64104d0dd4afb02d978bba33',
					postedDate: '2023-03-14T10:31:41.735Z',
				},
				{
					user: {
						userId: '640da9edee157c8dabb95429',
						username: 'swaraj24',
					},
					comment:
						'This is a great post! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dolor et consequatur sit. Necessitatibus corrupti rem nulla provident consectetur molestias impedit ipsa accusamus quibusdam, iure consequatur deserunt aperiam quas neque sapiente earum, nam beatae laboriosam enim! Amet autem, officia nulla, fugit esse hic, eius tempora magnam asperiores doloremque molestiae recusandae.',
					_id: '64104d39d4afb02d978bba39',
					postedDate: '2023-03-14T10:32:25.475Z',
				},
				{
					user: {
						userId: '640da9edee157c8dabb95429',
						username: 'swaraj24',
					},
					comment: 'Wow what a trip it was, really enjoyed it!!',
					_id: '641050e1d4afb02d978bba86',
					postedDate: '2023-03-14T10:48:01.096Z',
				},
				{
					user: {
						userId: '640db3273ee769909189df4b',
						username: 'shadankazmi',
					},
					comment:
						'This is a very good trip, i had gone to this place myself and it was wonderful.',
					_id: '64105309d4afb02d978bbacd',
					postedDate: '2023-03-14T10:57:13.992Z',
				},
				{
					user: {
						userId: '640db3273ee769909189df4b',
						username: 'shadankazmi',
					},
					comment: 'Wow what a trip it was, really enjoyed it!!',
					_id: '64105378d4afb02d978bbadd',
					postedDate: '2023-03-14T10:59:04.854Z',
				},
				{
					user: {
						userId: '640db3273ee769909189df4b',
						username: 'shadankazmi',
					},
					comment:
						'This is a great post! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dolor et consequatur sit. Necessitatibus corrupti rem nulla provident consectetur molestias impedit ipsa accusamus quibusdam, iure consequatur deserunt aperiam quas neque sapiente earum, nam beatae laboriosam enim! Amet autem, officia nulla, fugit esse hic, eius tempora magnam asperiores doloremque molestiae recusandae.',
					_id: '641053acd4afb02d978bbb1a',
					postedDate: '2023-03-14T10:59:56.246Z',
				},
				{
					user: {
						userId: '640db3273ee769909189df4b',
						username: 'shadankazmi',
					},
					comment: 'Wow what a trip it was, really enjoyed it!!',
					_id: '6410543cd4afb02d978bbba3',
					postedDate: '2023-03-14T11:02:20.898Z',
				},
				{
					user: {
						userId: '640db3273ee769909189df4b',
						username: 'shadankazmi',
					},
					comment:
						'This is a great post! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem dolor et consequatur sit. Necessitatibus corrupti rem nulla provident consectetur molestias impedit ipsa accusamus quibusdam, iure consequatur deserunt aperiam quas neque sapiente earum, nam beatae laboriosam enim! Amet autem, officia nulla, fugit esse hic, eius tempora magnam asperiores doloremque molestiae recusandae.',
					_id: '6410548ad4afb02d978bbbc3',
					postedDate: '2023-03-14T11:03:38.417Z',
				},
				{
					user: {
						userId: '64106cc6a79f8b047f85e745',
						username: 'rmaini',
					},
					comment: 'Very nice, I love it!',
					_id: '64106d02a79f8b047f85e773',
					postedDate: '2023-03-14T12:48:02.312Z',
				},
				{
					user: {
						userId: '640db3273ee769909189df4b',
						username: 'shadankazmi',
					},
					comment: 'woruvnowurnwb',
					_id: '6410af450bf0fb6b6015b2fc',
					postedDate: '2023-03-14T17:30:45.635Z',
				},
				{
					user: {
						userId: '640db3273ee769909189df4b',
						username: 'shadankazmi',
					},
					comment: 'oeunoqgr',
					_id: '6410af690bf0fb6b6015b30b',
					postedDate: '2023-03-14T17:31:21.844Z',
				},
				{
					user: {
						userId: '6427ebea038358bf8bb667a0',
						username: 'rohan',
					},
					comment: 'this is great',
					_id: '6427ec42038358bf8bb667ef',
					postedDate: '2023-04-01T08:33:06.849Z',
				},
			],
			likes: [],
			createdOn: '2023-03-13T11:56:06.877Z',
			__v: 12,
		},
		{
			createdBy: {
				userId: '640da9edee157c8dabb95429',
				username: 'swaraj24',
				email: 'swaraj@gmail.com',
			},
			_id: '640f0fd0172b63e565a48d73',
			title: 'Exploring Mumbai',
			cityToVisit: 'Mumbai',
			description:
				'A two-day itinerary for exploring the rich cultural heritage and delicious food of Mumbai.',
			duration: 2,
			days: [
				{
					place: 'Old Delhi',
					attractions: ['Red Fort', 'Chandni Chowk', 'Jama Masjid'],
					photos: [
						'https://images.unsplash.com/photo-1676305295296-74620d7c5443?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
						'https://images.unsplash.com/photo-1513014576558-921f00d80b77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80',
						'https://images.unsplash.com/photo-1637301625903-e25a30ba1bb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80',
					],
					description:
						'Experience the charm of Old Delhi by visiting the iconic Red Fort, exploring the vibrant markets of Chandni Chowk, and offering prayers at the historic Jama Masjid.',
					_id: '640f0fd0172b63e565a48d74',
				},
				{
					place: 'New Delhi',
					attractions: ['India Gate', 'Qutub Minar', 'Lotus Temple'],
					photos: [
						'https://images.unsplash.com/photo-1586183189334-1ad3cd238e21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80',
						'https://images.unsplash.com/photo-1586183189334-1ad3cd238e21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80',
						'https://images.unsplash.com/photo-1586520748101-a5df6afa76f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
					],
					description:
						'Spend the second day exploring the landmarks of New Delhi, including the majestic India Gate, the historic Qutub Minar, and the serene Lotus Temple.',
					_id: '640f0fd0172b63e565a48d75',
				},
			],
			bannerImage:
				'https://images.unsplash.com/photo-1573132223210-d65883b944aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2094&q=80',
			comments: [
				{
					user: {
						userId: '640db3273ee769909189df4b',
						username: 'shadankazmi',
					},
					comment: 'nice trip.',
					_id: '64105d49a79f8b047f85e708',
					postedDate: '2023-03-14T11:40:57.667Z',
				},
			],
			likes: [],
			createdOn: '2023-03-13T11:58:08.552Z',
			__v: 1,
		},
		{
			createdBy: {
				userId: '640da9edee157c8dabb95429',
				username: 'swaraj24',
				email: 'swaraj@gmail.com',
			},
			_id: '640f2acdc26cf825acf2312a',
			title: 'A Boaty Trip To Venice ',
			cityToVisit: 'Venice',
			description: 'A very good wet trip.',
			duration: 1,
			days: [
				{
					place: 'Water Playground',
					attractions: ['Fishes'],
					photos: [
						'https://plus.unsplash.com/premium_photo-1675864033915-9a677ea3c515?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmlzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
					],
					description: 'Very wet. Not recommended/.',
					_id: '640f2acdc26cf825acf2312b',
				},
			],
			bannerImage:
				'https://images.unsplash.com/photo-1558271736-cd043ef2e855?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8VmVuaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
			comments: [],
			likes: [],
			createdOn: '2023-03-13T13:53:17.506Z',
			__v: 0,
		},
		{
			createdBy: {
				userId: '640db3273ee769909189df4b',
				username: 'shadankazmi',
				email: 'shadan@gmail.com',
			},
			_id: '640f6ebfc26cf825acf233de',
			title: 'Shadan Trip',
			cityToVisit: 'sfobunworbnwoun',
			description: 'spfibnwprbinwpribnwpi',
			duration: 1,
			days: [
				{
					place: 'fpbinwprbinwpin',
					attractions: ['wprbinwpirbnwpribn', 'erberb', 'erberberb'],
					photos: [],
					description: 'wfpbinwpibnwpirbn',
					_id: '640f6ebfc26cf825acf233df',
				},
			],
			bannerImage:
				'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
			comments: [],
			likes: [],
			createdOn: '2023-03-13T18:43:11.140Z',
			__v: 0,
		},
	];

	const [user, setUser] = useState();
	const [trips, setTrips] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [isError, setIsError] = useState(false);
	const { userId } = useParams();

	useEffect(() => {
		getUserData(userId)
			.then(data => {
				setTrips(data.trips);
				setUser(data.user);
				setLoading(!loading);
			})
			.catch(error => {
				console.log(error);
				setIsError(!error);
				setError(error.message);
				setLoading(!loading);
			});
	}, []);

	return loading ? (
		<Loading />
	) : (
		<div className='max-w-[1080px] flex flex-col w-full mx-auto overscroll-y-auto p-4 pb-24'>
			<div className='bg-gradient-to-r from-primary to-primaryDark py-16 mx-4 flex justify-center items-center rounded-md text-white flex-col mt-8'>
				<div className='text-3xl font-bold'>{user.name}</div>
				<div className='flex gap-1 justify-center items-center'>
					<span>@{user.username}</span>&#x2022;<span>{user.email}</span>
				</div>
			</div>
			<div className='mx-4 mt-8 text-2xl font-medium text-center'>All Trips</div>
			<StyledGridBox>
				{trips.map(
					(
						{
							bannerImage,
							title,
							likes,
							duration,
							_id,
							createdBy,
							description,
						},
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
		</div>
	);
};

export default User;
