export const getApiUrl = (endpoint) => {
    // Get base URL and ensure it doesn't have a trailing slash
    let baseUrl = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');

    // Ensure endpoint has a leading slash
    let path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    return baseUrl + path;
};
