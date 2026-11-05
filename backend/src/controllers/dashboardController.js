const dashboardService = require('../services/dashboardService');

module.exports = {
  async summary(req, res) {
    try {
      const summary = await dashboardService.getSummary();
      return res.json(summary);
    } catch (error) {
      console.error('Error al obtener resumen del dashboard:', error);
      return res.status(500).json({ error: 'Error al obtener el resumen del dashboard.' });
    }
  }
};
