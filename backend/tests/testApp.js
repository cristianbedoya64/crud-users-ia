const express = require('express');

function createTestApp() {
  const app = express();
  app.get('/', (req, res) => res.send('UARP-AI Backend Running'));
  return app;
}

module.exports = { createTestApp };
