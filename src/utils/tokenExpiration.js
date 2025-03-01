// Function to check if the token is expired
export const isTokenExpired = (token) => {
    if (!token) return true;  // If no token, consider it expired
  
    const base64Url = token.split('.')[1];  // Get the payload part of the JWT
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');  // Handle URL-safe base64 encoding
    const decodedToken = JSON.parse(window.atob(base64));  // Decode the token's payload
  
    const expTime = decodedToken.exp * 1000;  // Expiration time in milliseconds
    return expTime < Date.now();  // Check if token has expired
  };
  