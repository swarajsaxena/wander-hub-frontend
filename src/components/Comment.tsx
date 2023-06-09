import React from 'react';
import { useSelector } from 'react-redux';
import { FiTrash } from 'react-icons/fi';

// Generated by https://quicktype.io

interface props {
	user: User;
	comment: string;
	postedDate: string;
}

interface User {
	userId: string;
	username: string;
	email: string;
}

const Comment = ({ comment, postedDate, user }: props) => {
	// new Date(postedDate).toString()
	const username = useSelector((state: any) => state.user.username);
	return (
		<div className='comment flex flex-col gap-2 w-full'>
			<div className='flex gap-2'>
				<div className='mx-0 aspect-square w-8 h-8 text-xs bg-primary grid place-items-center uppercase text-white rounded-full'>
					{user.username[0]}
				</div>
				<div className='flex flex-col w-full'>
					<div className='flex items-center gap-1 font-medium h-8'>
						{user.username} <span>&#x2022;</span>
						<span className='opacity-60'>
							{new Date(postedDate).toDateString()}{' '}
						</span>
					</div>
				</div>
				{username === user.username && (
					<div className='dltBtn bg-red-100 text-red-600 p-2 rounded-full opacity-0 transition-all cursor-pointer hover:bg-red-200'>
						<FiTrash />
					</div>
				)}
			</div>
			<div className='my-2 bg-slate-100 border-2 border-primary rounded-md w-full px-3 py-2'>
				{comment}
			</div>
		</div>
	);
};

export default Comment;
