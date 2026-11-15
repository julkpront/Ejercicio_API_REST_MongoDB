const express = require('express');
const morgan = require('./middlewares/morgan');
require('./config/db_mongo');
const providersRoutes = require('./routes/providers.routes');
const productsRoutes = require('./routes/products.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/providers', providersRoutes);
app.use('/api/products', productsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});