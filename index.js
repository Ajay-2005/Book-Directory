const express = require('express');
const bodyParser = require('body-parser');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const api = require('./src/api');

const app = express();
const PORT = 5000;
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());

app.use('/api/v1', api);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log(`Swagger doc is availabe at http://localhost:${PORT}`)
});
   