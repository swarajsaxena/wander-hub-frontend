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
import { useDispatch } from 'react-redux';
import { loginAction } from './app/features/userSlice';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			var config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://localhost:4000/api/getUser',
				headers: {
					auth_token: token,
				},
			};

			axios(config)
				.then(function (response) {
					if (response.data.success) {
						dispatch(
							loginAction({
								name: response.data.user.name,
								email: response.data.user.email,
								username: response.data.user.username,
								id: response.data.user._id,
							})
						);
					}
				})
				.catch(function (error) {
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
					<Route path='/login' element={<LogIn />} />
					<Route path='/trip/:tripId' element={<ViewTrip />} />
					<Route path='/create' element={<CreateTripForm />} />
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
