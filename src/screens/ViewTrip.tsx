import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Stepper from '../components/Stepper';
import { TripI } from './interface';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledBox } from './screens.styled';
import Loading from '../components/Loading';
import Comment from '../components/Comment';
import { useSelector } from 'react-redux';
import { getOneTrip, postComment } from '../apiFunctions';

const ViewTrip = () => {
	const userExist = useSelector((state: any) => state.user.userExist);
	const user = useSelector((state: any) => state.user);
	const navigate = useNavigate();
	const [commentBtnText, setCommentBtnText] = useState('Post ✈️');

	const [trip, setTrip] = useState<any>(null);
	const [comment, setComment] = useState('');
	let { tripId } = useParams();
	const [srcImage, setSrcImage] = useState<string>(trip?.bannerImage);

	const handlePostComment = e => {
		e.preventDefault();
		setCommentBtnText('Posting ⏳');
		postComment(user, tripId, comment)
			.then(comments => {
				setTrip({ ...trip, comments: comments });
				setCommentBtnText('Post ✈️');
			})
			.catch(error => {
				console.error(error.message);
			});
		setComment('');
	};

	useEffect(() => {
		getOneTrip(tripId)
			.then(resultTrip => {
				setTrip(resultTrip);
			})
			.catch(error => {
				console.error(error.message);
			});
	}, []);

	return (
		<div className='max-w-[1080px] gap-4 flex flex-col w-full mx-auto overscroll-y-auto p-4 pb-32'>
			{trip ? (
				<>
					<h3 className='text-2xl font-bold'>{trip.title}</h3>
					<img
						alt=''
						className='object-cover object-center w-full h-64 flex items-center overflow-hidden rounded-lg'
						src={trip?.bannerImage || './placeholder_image.png'}
						// onError={() => {
						// 	setSrcImage('./placeholder_image.png');
						// }}
					/>
					<div className='flex items-center justify-between'>
						<div className='font-medium'>
							<span
								className='cursor-pointer'
								onClick={() =>
									navigate(`/user/${trip.createdBy.username}`)
								}
							>
								{trip.createdBy.username} &#x2022;{' '}
							</span>
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
										{commentBtnText}
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
