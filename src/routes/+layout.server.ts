import { SECRET_KEY } from '$env/static/private';

export const load = ({ url }) => {
	const { pathname } = url;
	return {
		pathname, SECRET_KEY
	};
};