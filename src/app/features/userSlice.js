import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		name: '',
		email: '',
		username: '',
		userExist: false,
		id: '',
	},
	reducers: {
		loginAction: (state, action) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.username = action.payload.username;
			state.id = action.payload.id;
			state.userExist = true;
		},
		logoutAction: state => {
			state.name = '';
			state.email = '';
			state.username = '';
			state.userExist = false;
		},
	},
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
