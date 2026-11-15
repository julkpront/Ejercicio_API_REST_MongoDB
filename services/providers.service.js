const Provider = require('../models/provider.model');

const getAllProviders = async () => {
  const providers = await Provider.find();
  return providers;
};

const createProvider = async (data) => {
  const provider = await Provider.create(data);
  return provider;
};

const updateProvider = async (data) => {
  const { company_name, CIF, address, url_web } = data;

  const provider = await Provider.findOneAndUpdate(
    { company_name: company_name },
    { CIF, address, url_web },
    { new: true, runValidators: true }
  );

  return provider;
};

  const getProviderByName = async (company_name) => {
    const provider = await Provider.findOne({ company_name: company_name });
    return provider;
  };

  const deleteProvider = async (company_name) => {
  const provider = await Provider.findOneAndDelete({ company_name: company_name });
  return provider;
};

module.exports = {
  getAllProviders,
  createProvider,
  updateProvider,
  getProviderByName,
  deleteProvider 
};