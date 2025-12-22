// iaPanelController.js
const axios = require('axios');

// Base URL del servicio IA; en Docker debe apuntar al nombre del servicio.
const IA_PANEL_URL = process.env.IA_PANEL_URL || 'http://ia-panel:5001/ia-panel';

module.exports = {
  async getPanel(req, res) {
    try {
      const payload = req.body || {};
      const response = await axios.post(IA_PANEL_URL, payload, { timeout: 5000 });
      res.json(response.data);
    } catch (err) {
      const message = err?.message || 'Error';
      res.status(500).json({ error: 'Error al consultar el panel IA', details: message });
    }
  }
};
