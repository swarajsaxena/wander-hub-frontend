import './App.css';
import '@fontsource/inter';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import ViewTrip from './screens/ViewTrip';
import LogIn from './screens/Login';
import CreateTripForm from './screens/CreateTripForm';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './app/features/userSlice';
import User from './screens/User';
import ErrorScreen from './screens/ErrorScreen';
import { getUser } from './apiFunctions';

const App = () => {
	const dispatch = useDispatch();
	const userExist = useSelector(state => state.user.userExist);
	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			getUser(token)
				.then(user => {
					dispatch(loginAction(user));
				})
				.catch(error => {
					console.log(error.message);
				});
		}
	}, []);

	return (
		<BrowserRouter>
			<div className='app'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					{!userExist && <Route path='/login' element={<LogIn />} />}
					<Route path='/trip/:tripId' element={<ViewTrip />} />
					<Route path='/user/:userId' element={<User />} />
					<Route path='/create' element={<CreateTripForm />} />
					<Route path='/*' rep element={<ErrorScreen />} />
				</Routes>
				<div className='border-t border-primaryDark/20 flex flex-col gap-2 justify-center items-center p-8'>
					<div>Made with MERN Stack and a lots of 💕 by Swaraj Saxena</div>
					<div className='flex gap-2 justify-center items-center'>
						<a
							href='https://github.com/swarajsaxena'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FiGithub />
						</a>
						<a
							href='https://www.linkedin.com/in/swaraj-saxena-184b1b1a7/'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FiLinkedin />
						</a>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
