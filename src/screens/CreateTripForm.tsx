import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiTrash } from 'react-icons/fi';
import axios from 'axios';
import { createNewTrip } from '../apiFunctions';

const dataX = {
	title: 'Exploring Delhi',
	bannerImage: 'https://example.com/images/delhi_banner.jpg',
	description:
		'A two-day itinerary for exploring the rich cultural heritage and delicious food of Delhi',
	cityToVisit: 'Delhi',
	days: [
		{
			attractions: ['Red Fort', 'Chandni Chowk', 'Jama Masjid'],
			photos: [
				'https://example.com/images/red_fort.jpg',
				'https://example.com/images/chandni_chowk.jpg',
				'https://example.com/images/jama_masjid.jpg',
			],
			place: 'Old Delhi',
			description:
				'Experience the charm of Old Delhi by visiting the iconic Red Fort, exploring the vibrant markets of Chandni Chowk, and offering prayers at the historic Jama Masjid.',
		},
		{
			attractions: ['India Gate', 'Qutub Minar', 'Lotus Temple'],
			photos: [
				'https://example.com/images/india_gate.jpg',
				'https://example.com/images/qutub_minar.jpg',
				'https://example.com/images/lotus_temple.jpg',
			],
			place: 'New Delhi',
			description:
				'Spend the second day exploring the landmarks of New Delhi, including the majestic India Gate, the historic Qutub Minar, and the serene Lotus Temple.',
		},
	],
	createdBy: {
		userId: '640da9edee157c8dabb95429',
		username: 'swaraj24',
		email: 'swaraj@gmail.com',
	},
	duration: 2,
};

const CreateTripForm = () => {
	const userExist = useSelector((state: any) => state.user.userExist);
	const { username, email, id } = useSelector((state: any) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		!userExist && navigate('/');
	}, []);

	const [trip, setTrip] = useState({
		title: '',
		bannerImage: '',
		description: '',
		cityToVisit: '',
		days: [
			{
				attractions: [''],
				photos: [''],
				place: '',
				description: '',
			},
		],
		createdBy: {
			userId: id,
			username: username,
			email: email,
		},
	});

	const handleAddDay = e => {
		e.preventDefault();
		setTrip({
			...trip,
			days: [
				...trip.days,
				{ attractions: [''], photos: [''], place: '', description: '' },
			],
		});
	};

	const handleAddAttraction = (dayIndex, attraction) => {
		const updatedDays = [...trip.days];
		updatedDays[dayIndex].attractions.push(attraction);
		setTrip({ ...trip, days: updatedDays });
	};

	const handleAddPhoto = (dayIndex, photoUrl) => {
		const updatedDays = [...trip.days];
		updatedDays[dayIndex].photos.push(photoUrl);
		setTrip({ ...trip, days: updatedDays });
	};

	const handleEditAttraction = (dayIndex, attractionIndex, newAttraction) => {
		const updatedDays = [...trip.days];
		updatedDays[dayIndex].attractions[attractionIndex] = newAttraction;
		setTrip({ ...trip, days: updatedDays });
	};

	const handleEditPhoto = (dayIndex, photoIndex, newPhotoUrl) => {
		const updatedDays = [...trip.days];
		updatedDays[dayIndex].photos[photoIndex] = newPhotoUrl;
		setTrip({ ...trip, days: updatedDays });
	};

	const handleDeleteAttraction = (dayIndex, attractionIndex) => {
		const updatedDays = [...trip.days];
		updatedDays[dayIndex].attractions.splice(attractionIndex, 1);
		setTrip({ ...trip, days: updatedDays });
	};

	const handleDeletePhoto = (dayIndex, photoIndex) => {
		const updatedDays = [...trip.days];
		updatedDays[dayIndex].photos.splice(photoIndex, 1);
		setTrip({ ...trip, days: updatedDays });
	};

	const handlePlaceEdit = (dayIndex, newPlace) => {
		const updatedDays = [...trip.days];
		updatedDays[dayIndex].place = newPlace;
		setTrip({ ...trip, days: updatedDays });
	};
	const handleDescriptionEdit = (dayIndex, newDescription) => {
		const updatedDays = [...trip.days];
		updatedDays[dayIndex].description = newDescription;
		setTrip({ ...trip, days: updatedDays });
	};

	const handleDeleteDay = dayIndex => {
		const updatedDays = [...trip.days];
		updatedDays.splice(dayIndex, 1);
		setTrip({ ...trip, days: updatedDays });
	};

	const handleSubmit = e => {
		e.preventDefault();
		createNewTrip(trip)
			.then(data => {
				navigate('/');
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<div className='max-w-[1080px] gap-4 flex flex-col w-full mx-auto overscroll-y-auto p-4 pb-32'>
			<div className='bg-primary text-white px-6 py-4 rounded-md font-bold text-3xl'>
				Create a new trip ✨✨
			</div>
			<form onSubmit={handleSubmit} className='flex flex-col gap-4 items-start'>
				<div className='flex flex-col gap-2 w-full'>
					<label className='font-bold text-lg' htmlFor='inline-email'>
						Title
					</label>
					<input
						value={trip.title}
						onChange={e => setTrip({ ...trip, title: e.target.value })}
						required
						className='w-full'
						placeholder='Title goes here'
					/>
				</div>
				<div className='flex flex-col gap-2 w-full'>
					<label className='font-bold text-lg' htmlFor='inline-email'>
						City To Visit
					</label>
					<input
						value={trip.cityToVisit}
						onChange={e => setTrip({ ...trip, cityToVisit: e.target.value })}
						required
						className='w-full'
						placeholder='City Name'
					/>
				</div>
				<div className='flex flex-col gap-2 w-full'>
					<label className='font-bold text-lg' htmlFor='inline-email'>
						Image Link
					</label>
					<input
						value={trip.bannerImage}
						onChange={e => setTrip({ ...trip, bannerImage: e.target.value })}
						required
						className='w-full'
						placeholder='Banner image goes here'
					/>
				</div>
				<div className='flex flex-col gap-2 w-full'>
					<label className='font-bold text-lg' htmlFor='inline-email'>
						Description
					</label>
					<textarea
						value={trip.description}
						onChange={e => setTrip({ ...trip, description: e.target.value })}
						className='w-full'
						placeholder='Description goes here'
					/>
				</div>
				<div className='text-xl font-semibold mt-4 mb-[-4px]'>
					Day Wise Itinerary
				</div>
				<div className='bg-black/30 w-full h-[2px] rounded-full' />
				<div className='flex flex-col gap-4 w-full py-4'>
					{trip.days.map((day, dayIndex) => (
						<div key={dayIndex} className='flex gap-4 w-full'>
							<div className='flex flex-col gap-5'>
								<div className=' relative bg-primary aspect-square w-10 h-10 flex items-center justify-center text-white rounded-full'>
									{dayIndex + 1}
								</div>
								<div className='w-10 flex-1'>
									<div className='w-[2px] h-full bg-primaryDark/50 mx-auto' />
								</div>
							</div>
							<div className='flex flex-col gap-2 flex-1'>
								<div className='flex flex-col gap-2'>
									<div className='flex gap-2 w-full mb-4 h-[40px]'>
										<input
											value={day.place}
											onChange={e =>
												handlePlaceEdit(dayIndex, e.target.value)
											}
											required
											className='bg-primary/20 appearance-none border-2 border-transparent text-lg'
											placeholder='Place to visit'
										/>
										<div
											onClick={() => handleDeleteDay(dayIndex)}
											className='aspect-square w-max h-full grid place-items-center bg-primary/20 cursor-pointer hover:bg-primary/10 text-black p-2 rounded-md'
										>
											<FiTrash />
										</div>
									</div>
									<div className='flex flex-col gap-2 w-full mt-2'>
										<label
											className='font-bold text-lg'
											htmlFor='inline-email'
										>
											Description
										</label>
										<textarea
											value={day.description}
											onChange={e =>
												handleDescriptionEdit(
													dayIndex,
													e.target.value
												)
											}
											className='w-full'
											placeholder='Description about the place'
										/>
									</div>
								</div>
								<div className='flex md:flex-row gap-2 justify-center sm:flex-col mb-4'>
									<div className='flex flex-col gap-2 flex-1'>
										<div className='flex gap-2 items-center font-bold text-lg'>
											Attractions
											<button
												className='bg-primary hover:bg-primaryDark aspect-square text-white p-1 rounded-full'
												onClick={e => {
													e.preventDefault();
													handleAddAttraction(dayIndex, '');
												}}
											>
												<FiPlus />
											</button>
										</div>
										{day.attractions.length > 0 && (
											<ul className='flex flex-col gap-2'>
												{day.attractions.map(
													(attraction, attractionIndex) => (
														<li
															key={attractionIndex}
															className='flex gap-2 items-center'
														>
															<input
																required
																type='text'
																value={attraction}
																placeholder={`Attraction ${
																	attractionIndex + 1
																}`}
																onChange={e =>
																	handleEditAttraction(
																		dayIndex,
																		attractionIndex,
																		e.target.value
																	)
																}
															/>
															<div
																onClick={() =>
																	handleDeleteAttraction(
																		dayIndex,
																		attractionIndex
																	)
																}
																className='aspect-square w-max h-max bg-gray-100 cursor-pointer hover:bg-gray-200 p-2 rounded-md'
															>
																<FiTrash />
															</div>
														</li>
													)
												)}
											</ul>
										)}
									</div>
									<div className='flex flex-col gap-2 flex-1'>
										<div className='flex gap-2 items-center font-bold text-lg'>
											Photos
											<button
												className='bg-primary hover:bg-primaryDark text-white p-1 rounded-full'
												onClick={e => {
													e.preventDefault();
													handleAddPhoto(dayIndex, '');
												}}
											>
												<FiPlus />
											</button>
										</div>
										{day.photos.length > 0 && (
											<ul className='flex flex-col gap-2'>
												{day.photos.map(
													(photoUrl, photoIndex) => (
														<li
															key={photoIndex}
															className='flex gap-2 items-center'
														>
															<input
																required
																type='text'
																value={photoUrl}
																placeholder={`Photo ${
																	photoIndex + 1
																} (Valid Img URL)`}
																onChange={e =>
																	handleEditPhoto(
																		dayIndex,
																		photoIndex,
																		e.target.value
																	)
																}
															/>
															<div
																onClick={() =>
																	handleDeletePhoto(
																		dayIndex,
																		photoIndex
																	)
																}
																className='aspect-square w-max h-max bg-gray-100 cursor-pointer hover:bg-gray-200 p-2 rounded-md'
															>
																<FiTrash />
															</div>
														</li>
													)
												)}
											</ul>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='flex gap-2 w-full'>
					<button
						className='bg-primary hover:bg-primaryDark text-white px-2 py-4 mt-4 rounded-md w-full'
						onClick={handleAddDay}
					>
						Add A Day
					</button>
					<button
						className='bg-primary hover:bg-primaryDark text-white px-2 py-4 mt-4 rounded-md w-full'
						type='submit'
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateTripForm;
