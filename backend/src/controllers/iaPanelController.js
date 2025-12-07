// iaPanelController.js
const axios = require('axios');

module.exports = {
  async getPanel(req, res) {
    try {
      // Puedes enviar datos reales del sistema en el body si lo deseas
      const response = await axios.post('http://localhost:5001/ia-panel', req.body || {});
      res.json(response.data);
    } catch (err) {
      res.status(500).json({ error: 'Error al consultar el panel IA', details: err.message });
    }
  }
};
