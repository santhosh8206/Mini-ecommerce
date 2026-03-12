export const getApiUrl = (endpoint) => {
    // Aggressively remove all whitespace and trailing slashes from base URL
    let baseUrl = (process.env.REACT_APP_API_URL || '').replace(/\s/g, '').replace(/\/$/, '');

    // If no base URL is provided, default to /api/v1 for relative requests (e.g. on Vercel)
    if (!baseUrl) {
        baseUrl = '/api/v1';
    }

    // Ensure endpoint has a leading slash
    let path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    return baseUrl + path;
};
