export const isValidPhoneNumber = (value) => {
	const PHONE_REGEXP = /^0[6|7]\d{8}$/
	return PHONE_REGEXP.test(value);
}