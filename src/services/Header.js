export default function authHeader () {
    const authToken = localStorage.getItem('token');
    let  headers = {}

    // Manage Header for API Call
    if (authToken !== undefined && authToken !== null) {
        headers = {
            'authorization': 'Token  ' + authToken
        }
    }

    return headers;
}