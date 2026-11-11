require('dotenv').config();
const app = require('./app');
const { port, nodeEnv } = require('./config/environment');

const PORT = port;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${nodeEnv} mode on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api/v1`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
