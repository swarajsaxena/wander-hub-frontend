import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavbarComponent } from './create.styled';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../app/features/userSlice';
import Cookies from 'js-cookie';

const Navbar = () => {
	const location = useLocation();
	const userExist = useSelector(state => state.user.userExist);
	const name = useSelector(state => state.user.name);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const logout = () => {
		dispatch(logoutAction());
		navigate('/');
		Cookies.remove('token');
	};

	return (
		<NavbarComponent>
			<img className='h-12' src='/logo_transparent.svg' />
			{name && <div className='font-medium'>{name}</div>}
			<div className='flex gap-4 mx-2'>
				<Link
					to='/'
					className={`${
						location.pathname === '/login'
							? 'text-primaryDark'
							: 'text-primary'
					} hover:text-primary`}
				>
					All Trips
				</Link>
				{userExist ? (
					<>
						<Link
							to='/create'
							className={`${
								location.pathname === '/'
									? 'text-primaryDark'
									: 'text-primary'
							} hover:text-primary`}
						>
							Create A Trip
						</Link>
						<span
							onClick={logout}
							className='text-primary hover:text-primary cursor-pointer 	'
						>
							Log Out
						</span>
					</>
				) : (
					<Link
						to='/login'
						className={`${
							location.pathname === '/'
								? 'text-primaryDark'
								: 'text-primary'
						} hover:text-primary`}
					>
						Login
					</Link>
				)}
			</div>
		</NavbarComponent>
	);
};

export default Navbar;
