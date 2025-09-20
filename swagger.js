const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library API',
    description: 'API for managing books in a library.',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js']; // Pointing to the main routes file

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    // Optional: If you want to automatically start the server after generation
    // require('./index.js'); 
});