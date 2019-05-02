const app = require('./app/index');
const api = require('./api/index');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const PORT2 = process.env.PORT+1 || 5001;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  app(PORT, isDev);
  api(PORT2, isDev);
}
