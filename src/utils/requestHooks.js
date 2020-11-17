import axios from 'axios'
import data2 from '../config'

export default async ({
	url,
	method,
	body = {},
	onSuccess = undefined,
	onError = undefined,
	noToken = undefined
}) => {
	//console.log(body)
	let token = await localStorage.getItem('token')
	token=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjljNDA3YmRhMTYyOTJhM2MzN2IxMjYiLCJpYXQiOjE2MDU2Mjg2NTN9.KMbB4FY1bta_-NNmJB0yQJL4B0COlCcZCZqO3HZk2iM`
	if (token === null && noToken) {
		noToken()
		return
	}
	try {
		const { data } = await axios({
			method,
			url: `${data2.url}/api${url}`,
			data: { ...body },
			headers: { Authorization: token }
		})
		if (onSuccess) {
			onSuccess(data)
		}
		// return data;
	} catch (err) {
		if (err.response) {
			const errors = err.response.data.message
			console.log(errors)
			if (onError) {
				onError(errors)
			}
		}
	}
}
