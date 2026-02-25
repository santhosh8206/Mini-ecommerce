export const getApiUrl = (endpoint) => {
    // Aggressively remove all whitespace and trailing slashes from base URL
    let baseUrl = (process.env.REACT_APP_API_URL || '').replace(/\s/g, '').replace(/\/$/, '');

    // Ensure endpoint has a leading slash
    let path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    return baseUrl + path;
};
