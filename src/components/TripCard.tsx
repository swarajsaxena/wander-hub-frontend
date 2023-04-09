import React, { useState } from 'react';
import { TripCardComponent } from '../screens/screens.styled';

interface props {
	bannerImage: string;
	title: string;
	likes: any[];
	duration: number;
	username: string;
	description: string;
}

const TripCard = ({
	bannerImage,
	title,
	duration,
	likes,
	username,
	description,
}: props) => {
	const [srcImage, setSrcImage] = useState<string>(bannerImage);
	return (
		<TripCardComponent className='flex flex-col gap-4 max-w-sm rounded overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border h-full'>
			<div className='h-40 overflow-hidden relative flex items-center'>
				<img
					className='w-full transition-all'
					alt='Sunset in the mountains'
					src={srcImage}
					onError={() => {
						setSrcImage(
							'./placeholder_image.png'
						);
					}}
				/>
				<div className='absolute p-4 bottom-0 w-full h-[50%] flex items-end bg-gradient-to-b from-transparent to-black/80 z-50 text-white opacity-80'>
					{username}
				</div>
			</div>
			<div className='px-4'>
				<div className='font-bold text-xl mb-2 truncate'>{title}</div>
				<p className='text-gray-700 text-base line-clamp-3'>{description}</p>
			</div>
			<div className='p-4 border-t flex gap-2 mt-auto'>
				<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
					{likes.length} ❤️
				</span>
				<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
					{duration} {duration > 1 ? 'days' : 'day'}
				</span>
			</div>
		</TripCardComponent>
	);
};

export default TripCard;
