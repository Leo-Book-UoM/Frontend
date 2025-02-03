import jwtDecode from 'jwt-decode';

export const isTokenExpired = (token) => {
    if (!token) return true;

try{
    const decode = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decode.exp < currentTime;
}catch(error){
    console.error('Error decoding token :', error);
    return true;
}
};

export const refreshAccessToken = async () => {
    try {
        const response = await fetch('/api/refresh', {
            method: "POST",
            credentials: "include",
        });
        if(response.ok){
            const data = await response.json();
            return data.accessToken;
        } else {
            throw new Error('Failed to refresh token');
        }
    }catch(error){
        console.error('Error refreshing token:', error); 
        throw error;       
    }
};