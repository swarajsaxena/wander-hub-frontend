import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Stepper from '../components/Stepper';
import { TripI } from './interface';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledBox } from './screens.styled';
import Loading from '../components/Loading';
import Comment from '../components/Comment';
import { useSelector } from 'react-redux';

const ViewTrip = () => {
	const tripX = {
		title: 'Hiking in the Rocky Mountains',
		createdBy: 'Swaraj Saxena',
		createdOn: new Date().toISOString(),
		description:
			'Hiking in the Rocky Mountains is an unforgettable adventure, offering breathtaking views of towering peaks, alpine lakes, and diverse wildlife. Trails range from easy walks to challenging treks, with opportunities for backpacking and camping. Experience the beauty of nature as you explore this iconic mountain range.',
		duration: 3,
		days: [
			{
				place: 'Rocky Mountain National Park',
				attractions: ['Bear Lake Trailhead', 'Dream Lake', 'Emerald Lake'],
				photos: [
					'https://images.unsplash.com/photo-1492666673288-3c4b4576ad9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
					'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
					'https://images.unsplash.com/photo-1558517286-8a9cb0b8c793?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80',
				],
				description:
					'We will start our hike at the Bear Lake Trailhead and make our way to Dream Lake, where we will have a picnic lunch. From there, we will continue on to Emerald Lake, which is known for its stunning views.',
			},
			{
				place: 'Mount Evans Wilderness Area',
				attractions: [
					'Chicago Lakes Trailhead',
					'Upper Chicago Lake',
					'Lower Chicago Lake',
				],
				photos: [
					'https://images.unsplash.com/photo-1491510736257-3ad769ff47b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
					'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
					'https://images.unsplash.com/photo-1558517286-8a9cb0b8c793?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80',
				],
				description:
					'On day two, we will hike the Chicago Lakes Trailhead in the Mount Evans Wilderness Area. The trail offers breathtaking views of the surrounding mountains and two beautiful lakes, Upper and Lower Chicago Lake.',
			},
			{
				place: 'Indian Peaks Wilderness',
				attractions: [
					'Brainard Lake Recreation Area',
					'Isabelle Glacier Trailhead',
					'Long Lake',
				],
				photos: [
					'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
					'https://images.unsplash.com/photo-1491510736257-3ad769ff47b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
					'https://images.unsplash.com/photo-1558517286-8a9cb0b8c793?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1465&q=80',
				],
				description:
					'Our final day of hiking will take us to the Isabelle Glacier Trailhead in the Indian Peaks Wilderness. The trail follows a creek and passes several beautiful lakes, including Long Lake. We will have lunch at the trailhead before making our way back to the trailhead.',
			},
		],
		comments: [
			{
				user: '609d6bf96a6d1528f0c9bdef',
				comment:
					'The views on this hike were absolutely breathtaking! I highly recommend it.',
				postedDate: '2022-08-01T00:00:00.000Z',
			},
			{
				user: '609d6bf96a6d1528f0c9bdff',
				comment:
					'The hike to Emerald Lake was my favorite. The water was so blue!',
				postedDate: '2022-08-03T00:00:00.000Z',
			},
			{
				user: '609d6bf96a6d1528f0c9be0',
				comment:
					'The Chicago Lakes Trailhead was challenging, but the views were worth it.',
				postedDate: '2022-08-04T00:00:00.000Z',
			},
		],
		likes: 15,
		dislikes: 5,
		bannerImage:
			'https://images.unsplash.com/photo-1551411444-d4d4b91e729e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
	};

	const userExist = useSelector((state: any) => state.user.userExist);
	const user = useSelector((state: any) => state.user);
	const navigate = useNavigate();

	const [trip, setTrip] = useState<any>(null);
	const [comment, setComment] = useState('');
	let { tripId } = useParams();

	const handlePostComment = e => {
		e.preventDefault();
		var data = {
			userId: user.id,
			username: user.username,
			tripId: tripId,
			comment: comment,
		};

		setComment('');

		var config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://localhost:4000/api/comment/post',
			headers: {
				'Content-Type': 'application/json',
			},
			data: data,
		};

		axios(config)
			.then(function (response) {
				setTrip({ ...trip, comments: response.data.comments });
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	useEffect(() => {
		console.log({ tripId });

		const options = {
			method: 'GET',
			url: 'http://localhost:4000/api/getOne',
			headers: { id: tripId },
		};

		axios
			.request(options)
			.then(function (response) {
				const { success, trip: resulttrip } = response.data;

				if (success && resulttrip !== null) {
					setTrip(resulttrip);
				}
			})
			.catch(function (error) {
				console.error(error);
			});
	}, []);

	return (
		<div className='max-w-[1080px] gap-4 flex flex-col w-full mx-auto overscroll-y-auto p-4 pb-32'>
			{trip ? (
				<>
					<h3 className='text-2xl font-bold'>{trip.title}</h3>
					<img
						src={trip.bannerImage}
						alt=''
						className='object-cover object-center w-full h-64 flex items-center overflow-hidden rounded-lg'
					/>
					<div className='flex items-center justify-between'>
						<div className='font-medium'>
							<span>{trip.createdBy.username} &#x2022; </span>
							<span>{new Date(trip.createdOn).toUTCString()}</span>
						</div>
						<div className='flex gap-2'>
							<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-base font-semibold text-gray-700 mr-2 mb-2'>
								{trip.duration} {trip.duration > 1 ? 'days' : 'day'}
							</span>
							<span className='inline-block bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-full px-3 py-1 text-base font-semibold text-gray-700 mr-2 mb-2'>
								{trip.likes.length} 👍
							</span>
						</div>
					</div>
					<div className='text-lg'>{trip.description}</div>
					<div className='text-xl font-semibold mt-4 mb-[-4px]'>
						Day Wise Itinerary
					</div>
					<div className='bg-black/30 h-[2px] rounded-full' />
					<Stepper days={trip.days} />{' '}
					<div className='text-xl font-semibold mt-4 mb-[-4px]'>Comments</div>
					<div className='bg-black/30 h-[2px] rounded-full' />
					<div className='flex flex-col gap-4'>
						{trip.comments && trip.comments.length > 0 ? (
							trip.comments.map(comment => (
								<Comment
									user={comment.user}
									comment={comment.comment}
									postedDate={comment.postedDate}
								/>
							))
						) : (
							<div>no comments</div>
						)}
						<form
							onSubmit={handlePostComment}
							className='flex flex-col md:flex-row gap-2 mt-4 justify-center'
						>
							{userExist ? (
								<>
									<input
										className='flex-[0.9]'
										type='text'
										name=''
										id=''
										placeholder='Make a new comment!'
										value={comment}
										onChange={e => setComment(e.target.value)}
									/>
									<button
										type='submit'
										className='bg-primary flex-[0.1] hover:bg-primaryDark text-white px-2 py-2 rounded-md'
									>
										Post ✈️
									</button>
								</>
							) : (
								<button
									onClick={() => navigate('/login')}
									className='bg-primary hover:bg-primaryDark w-max text-white px-4 py-2 rounded-md'
								>
									Login To Comment!
								</button>
							)}
						</form>
					</div>
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default ViewTrip;
