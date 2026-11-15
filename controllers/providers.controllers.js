const providerService = require('../services/providers.service');
const productService = require('../services/products.service');

const getProviders = async (req, res) => {
  try {
    const providers = await providerService.getAllProviders();
    res.status(200).json(providers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const createProvider = async (req, res) => {
  try {
    const { company_name, CIF, address, url_web } = req.body;

    if (!company_name || !CIF || !address) {
      return res.status(400).json({ message: 'Faltan datos: company_name, CIF y address son obligatorios' });
    }

    const provider = await providerService.createProvider({ company_name, CIF, address, url_web });
    res.status(201).json({ message: 'proveedor creado', provider });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Ya existe un proveedor con ese nombre o CIF' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const updateProvider = async (req, res) => {
  try {
    const { company_name, CIF, address, url_web } = req.body;

    if (!company_name) {
      return res.status(400).json({ message: 'Falta el company_name del proveedor a editar' });
    }

    const provider = await providerService.updateProvider({ company_name, CIF, address, url_web });

    if (!provider) {
      return res.status(404).json({ message: `No existe ningún proveedor con el nombre '${company_name}'` });
    }

    res.status(200).json({ message: `proveedor actualizado: ${company_name}`, provider });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Ya existe otro proveedor con ese CIF' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

  const deleteProvider = async (req, res) => {
  try {
    const { company_name } = req.body;

    if (!company_name) {
      return res.status(400).json({ message: 'Falta el company_name del proveedor a borrar' });
    }

    const providerFound = await providerService.getProviderByName(company_name);

    if (!providerFound) {
      return res.status(404).json({ message: `No existe ningún proveedor con el nombre '${company_name}'` });
    }

    const totalProducts = await productService.countProductsByProvider(providerFound._id);

    if (totalProducts > 0) {
      return res.status(409).json({
        message: `No se puede borrar el proveedor '${company_name}': tiene ${totalProducts} producto(s) asociado(s)`
      });
    }

    await providerService.deleteProvider(company_name);
    res.status(200).json({ message: `Se ha borrado el proveedor: ${company_name}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


module.exports = {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider
};