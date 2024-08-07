// function errorHandler(err, req, res, next) {
//     console.error('Error:', err);

//     // Define a response status code and message based on the error
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';

//     // Send the response
//     res.status(statusCode).json({
//         error: {
//             message,
//             details: err.details || null, // Optional: Additional details
//         },
//     });
// }

// module.exports = {errorHandler};
