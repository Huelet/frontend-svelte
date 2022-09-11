/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	return /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z]{12,18}$/.test(param);
}
