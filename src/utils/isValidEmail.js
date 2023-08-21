export const isValidEmail = (value) => {
	const EMAIL_REGEXP = /^\S+@\S+\.\S+$/;
	return value.trim().length ? EMAIL_REGEXP.test(value) : true;
}