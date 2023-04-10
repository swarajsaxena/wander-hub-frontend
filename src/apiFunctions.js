import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const getAllTrips = () =>
	new Promise((resolve, reject) => {
		axios
			.request({ method: 'GET', url: `${BASE_API_URL}/allTrips` })
			.then(response => {
				const data = response.data;
				resolve(data);
			})
			.catch(error => {
				console.error(error);
				reject(error);
			});
	});

export const getUser = token => {
	return new Promise((resolve, reject) => {
		const config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: `${BASE_API_URL}/getUser`,
			headers: {
				auth_token: token,
			},
		};

		axios(config)
			.then(response => {
				if (response.data.success) {
					resolve({
						name: response.data.user.name,
						email: response.data.user.email,
						username: response.data.user.username,
						id: response.data.user._id,
					});
				}
			})
			.catch(error => {
				reject(error);
			});
	});
};

export const createNewTrip = trip => {
	return new Promise((resolve, reject) => {
		const data = { ...trip, duration: trip.days.length };
		const config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: `${BASE_API_URL}/newTrip`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: data,
		};

		axios(config)
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
	});
};

export const login = (username, password) => {
	return new Promise((resolve, reject) => {
		const options = {
			method: 'POST',
			url: `${BASE_API_URL}/signin`,
			data: { username, password },
		};

		axios
			.request(options)
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
	});
};

export const signUp = (username, password, email, fullName) => {
	return new Promise((resolve, reject) => {
		var data = {
			username: username,
			email: email,
			password: password,
			name: fullName,
		};

		var config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: `${BASE_API_URL}/signup`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: data,
		};

		axios(config)
			.then(function (response) {
				resolve(response.data);
			})
			.catch(function (err) {
				reject(err.message);
			});
	});
};

export const getOneTrip = tripId => {
	return new Promise((resolve, reject) => {
		const options = {
			method: 'GET',
			url: `${BASE_API_URL}/getOne`,
			headers: { id: tripId },
		};

		axios
			.request(options)
			.then(response => {
				const { success, trip: resultTrip } = response.data;

				if (success && resultTrip !== null) {
					resolve(resultTrip);
				} else {
					const error = new Error('Error retrieving trip data');
					reject(error);
				}
			})
			.catch(error => {
				console.error(error);
				reject(error);
			});
	});
};

export const getUserData = userId => {
	return new Promise((resolve, reject) => {
		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: `${BASE_API_URL}/user/${userId}`,
			headers: {
				'Content-Type': 'application/json',
			},
		};

		axios
			.request(config)
			.then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
	});
};

export const postComment = (user, tripId, comment) => {
	return new Promise((resolve, reject) => {
		const data = {
			userId: user.id,
			username: user.username,
			tripId: tripId,
			comment: comment,
		};

		const config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://localhost:4000/api/comment/post',
			headers: {
				'Content-Type': 'application/json',
			},
			data: data,
		};

		axios(config)
			.then(response => {
				resolve(response.data.comments);
			})
			.catch(error => {
				reject(error);
			});
	});
};
