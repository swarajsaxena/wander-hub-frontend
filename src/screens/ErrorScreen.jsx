import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorScreen = () => {
	const navigate = useNavigate();
	return (
		<div className='flex-1 flex justify-center items-center gap-4 flex-col'>
			<div>Oops, looks like you have landed on a page that doesn't exists.</div>
			<div className='flex justify-center items-center gap-4'>
				<button
					onClick={() => navigate('/')}
					className='border-2 border-transparent bg-primary px-4 py-2 rounded-md text-white hover:bg-primaryDark transition-all capitalize'
				>
					Go to Home Page
				</button>
				{/* <button onClick={() => navigate('/login')} className='border-2 border-transparent bg-primary px-4 py-2 rounded-md text-white hover:bg-primaryDark transition-all'>
					Go to Login Page
				</button> */}
			</div>
		</div>
	);
};

export default ErrorScreen;
