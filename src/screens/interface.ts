export interface TripI {
	createdBy: CreatedBy;
	_id: string;
	title: string;
	cityToVisit: string;
	description: string;
	duration: number;
	days: Day[];
	bannerImage: string;
	comments: any[];
	likes: any[];
	createdOn: string;
	__v: number;
}

export interface CreatedBy {
	userId: string;
	username: string;
	email: string;
}

export interface Day {
	place: string;
	attractions: string[];
	photos: string[];
	description: string;
	_id: string;
}
