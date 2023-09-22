const requireAuth = (req, res, next) => {
    // Check if the user is authenticated (e.g., by checking if a session or token exists)
    if (req.cookies.accessToken) {
        // User is authenticated, proceed to the next middleware
        next();
    } else {
        // User is not authenticated, redirect them to the login page
        res.redirect('/');
    }
};

function parseJwt(token) {
    if (!token) return null;

    try {
        // Split the token into its parts (header, payload, and signature)
        const [header, payload, signature] = token.split('.');
        // Decode and parse the payload as JSON
        return JSON.parse(Buffer.from(payload, 'base64').toString());
    } catch (error) {
        // Handle any errors that may occur during decoding or parsing
        console.error('Error decoding token:', error);
        errorMessage = 'Unable to return records';
    }
}

module.exports = { requireAuth, parseJwt };
