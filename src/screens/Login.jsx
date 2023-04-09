import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginAction, logoutAction } from '../app/features/userSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FiEyeOff, FiEye, FiAlertCircle } from 'react-icons/fi';
import { StyledBox } from './screens.styled';
import { login, signUp } from '../apiFunctions';

const LogIn = () => {
	const [activeTab, setActiveTab] = useState(0);
	return (
		<StyledBox>
			<ul className='flex justify-center flex-wrap mb-px'>
				<li className='mr-2 cursor-pointer' onClick={() => setActiveTab(0)}>
					<div
						className={`inline-block font-medium p-4 ${
							activeTab === 0
								? 'text-blue-600 border-b-2 border-blue-600'
								: ''
						} rounded-t-lg`}
					>
						Log In
					</div>
				</li>
				<li className='mr-2 cursor-pointer' onClick={() => setActiveTab(1)}>
					<div
						className={`inline-block font-medium p-4 ${
							activeTab === 1
								? 'text-blue-600 border-b-2 border-blue-600'
								: ''
						}   rounded-t-lg`}
						aria-current='page'
					>
						Sign Up
					</div>
				</li>
			</ul>
			{activeTab === 0 && <SignIn />}
			{activeTab === 1 && <SignUp setActiveTab={setActiveTab} />}
		</StyledBox>
	);
};

export default LogIn;

const SignIn = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const [passVis, setPassVis] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submit = e => {
		e.preventDefault();

		login(username, password)
			.then(function (response) {
				console.log(response);
				if (response.success) {
					dispatch(
						loginAction({
							name: response.user.name,
							email: response.user.email,
							username: response.user.username,
							id: response.user._id,
						})
					);
					Cookies.set('token', response.token);
					navigate('/');
				} else {
					setError(response.message);
				}
			})
			.catch(err => console.log(err));
	};

	return (
		<form className='w-full max-w-sm mt-8' onSubmit={submit}>
			<div className='md:flex md:items-center mb-6'>
				<div className='md:w-1/3'>
					<label
						className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
						htmlFor='inline-username'
					>
						Username
					</label>
				</div>
				<div className='md:w-2/3 flex gap-1 items-center'>
					<input
						className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary'
						id='inline-username'
						type='text'
						placeholder='janedoe'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<div className='opacity-0 pointer-events-none aspect-square bg-gray-100 cursor-pointer hover:bg-gray-200 p-2 rounded-md'>
						<FiEye />
					</div>
				</div>
			</div>
			<div className='md:flex md:items-center mb-6 '>
				<div className='md:w-1/3'>
					<label
						className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
						htmlFor='inline-password'
					>
						Password
					</label>
				</div>
				<div className='md:w-2/3 flex gap-1 items-center'>
					<input
						className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary'
						id='inline-password'
						type={passVis ? 'text' : 'password'}
						placeholder='******************'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<div
						onClick={() => setPassVis(!passVis)}
						className='aspect-square bg-gray-100 cursor-pointer hover:bg-gray-200 p-2 rounded-md'
					>
						{!passVis ? <FiEye /> : <FiEyeOff />}
					</div>
				</div>
			</div>
			{error.length > 0 && (
				<div className='md:flex md:items-center mb-6'>
					<div className='md:w-1/3'></div>
					<div className='md:w-2/3'>
						<div className='flex items-center gap-2 text-red-600 px-4 py-2 rounded-md bg-red-100 capitalize'>
							<FiAlertCircle />
							{error}
						</div>
					</div>
				</div>
			)}
			<div className='md:flex md:items-center'>
				<div className='md:w-1/3'></div>
				<div className='md:w-2/3'>
					<button
						className='shadow bg-primary hover:bg-primaryDark focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
						type='submit'
					>
						Login
					</button>
				</div>
			</div>
		</form>
	);
};

const SignUp = ({ setActiveTab }) => {
	const [username, setUsername] = useState('');
	const [password, setpassword] = useState('');
	const [email, setemail] = useState('');
	const [fullName, setfullName] = useState('');
	const [error, setError] = useState('');
	const [btnText, setBtnText] = useState('Sign Up');

	const handleSignUp = e => {
		e.preventDefault();
    setBtnText('Loading...')
		signUp(username, password, email, fullName)
			.then(function (response) {
				console.log(response);

				if (response.success) {
					setActiveTab(0);
				} else {
					setError(response.message);
				}
			})
			.catch(function (err) {
				setError(err.message);
				console.log(err.message);
			});

		setTimeout(() => setBtnText('Sign Up', 3000));
	};

	return (
		<form onSubmit={handleSignUp} className='w-full max-w-sm mt-8'>
			<div className='md:flex md:items-center mb-6'>
				<div className='md:w-1/3'>
					<label
						className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
						htmlFor='inline-full-name'
					>
						Full Name
					</label>
				</div>
				<div className='md:w-2/3'>
					<input
						className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary'
						id='inline-full-name'
						type='text'
						placeholder='Jane Doe'
						value={fullName}
						onChange={e => {
							setfullName(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className='md:flex md:items-center mb-6'>
				<div className='md:w-1/3'>
					<label
						className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
						htmlFor='inline-user-name'
					>
						Username
					</label>
				</div>
				<div className='md:w-2/3'>
					<input
						className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary'
						id='inline-user-name'
						type='text'
						placeholder='janedoe'
						value={username}
						onChange={e => {
							setUsername(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className='md:flex md:items-center mb-6'>
				<div className='md:w-1/3'>
					<label
						className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
						htmlFor='inline-email'
					>
						Email
					</label>
				</div>
				<div className='md:w-2/3'>
					<input
						className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary'
						id='inline-email'
						type='email'
						placeholder='janedoe@gmail.com'
						value={email}
						onChange={e => {
							setemail(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className='md:flex md:items-center mb-6'>
				<div className='md:w-1/3'>
					<label
						className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
						htmlFor='inline-password'
					>
						Password
					</label>
				</div>
				<div className='md:w-2/3'>
					<input
						className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary'
						id='inline-password'
						type='password'
						placeholder='******************'
						value={password}
						onChange={e => {
							setpassword(e.target.value);
						}}
					/>
				</div>
			</div>
			{error.length > 0 && (
				<div className='md:flex md:items-center mb-6 capitalize'>
					<div className='md:w-1/3'></div>
					<div className='md:w-2/3'>
						<div className='flex items-center gap-2 text-red-600 px-4 py-2 rounded-md bg-red-100'>
							<FiAlertCircle />
							{error}
						</div>
					</div>
				</div>
			)}
			<div className='md:flex md:items-center'>
				<div className='md:w-1/3'></div>
				<div className='md:w-2/3'>
					<button
						className='shadow bg-primary hover:bg-primaryDark focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
						type='submit'
					>
						{btnText}
					</button>
				</div>
			</div>
		</form>
	);
};
