const express = require('express');
const morgan = require('./middlewares/morgan');
require('./config/db_mongo');
const providersRoutes = require('./routes/providers.routes');
const productsRoutes = require('./routes/products.routes');
const manage404 = require('./middlewares/error404');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/providers', providersRoutes);
app.use('/api/products', productsRoutes);

app.use(manage404);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});