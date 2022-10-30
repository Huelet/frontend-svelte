/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	return /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{4,8}$/.test(param);
}
