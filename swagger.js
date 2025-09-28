const swaggerAutogen = require('swagger-autogen')();

// Use `cse341-project2-ai9y.onrender.com` como host em produção, ou localhost para desenvolvimento
const host = process.env.NODE_ENV === 'production' ? 'cse341-project2-ai9y.onrender.com' : 'localhost:3000';
const schemes = process.env.NODE_ENV === 'production' ? ['https'] : ['http'];

const doc = {
  info: {
    title: 'Library API',
    description: 'API for managing books in a library.',
    version: '1.0.0'
  },
  host: host,
  schemes: schemes,
  securityDefinitions: {
    google_oauth: {
      type: 'oauth2',
      authorizationUrl: `${schemes[0]}://${host}/auth/google`,
      flow: 'implicit',
      scopes: {
        'read_write': 'Acesso para ler e escrever dados'
      }
    }
  },
  security: [{
    'google_oauth': ['read_write']
  }]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js'); 
});