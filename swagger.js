const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Library API',
    description: 'API for managing books in a library.',
    version: '1.0.0'
  },
  host: process.env.SWAGGER_HOST || 'cse341-project2-ai9y.onrender.com',
  basePath: '/',
  schemes: ['https'],
  securityDefinitions: {
    google_oauth: {
      type: 'oauth2',
      authorizationUrl: `https://${process.env.SWAGGER_HOST || 'cse341-project2-ai9y.onrender.com'}/auth/google`,
      flow: 'implicit',
      scopes: {
        read_write: 'Acesso para ler e escrever dados'
      }
    }
  },
  security: [{
    google_oauth: ['read_write']
  }]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  //require('./index.js');
});