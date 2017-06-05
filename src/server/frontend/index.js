// @flow
import compression from 'compression';
import express from 'express';
import render from './render';
import type { $Request, $Response } from 'express';

const isDevelopment = process.env.NODE_ENV === 'development';

const app = express();

app.use(compression());
if (isDevelopment) {
  const ip = require('ip');
  const config = require('../config').default;
  const serverIp = config.remoteHotReload
    ? ip.address() // Dynamic IP address enables hot reload on remote devices.
    : 'localhost';

  const constants = require('../../../webpack/constants').default;
  const targetUrl = `http://${serverIp}:${constants.HOT_RELOAD_PORT}/build/`;

  const proxy = require('http-proxy').createProxyServer({
    target: targetUrl,
    ws: false,
  });

  app.use('/assets', (req: $Request, res: $Response) => {
    proxy.web(req, res, { target: targetUrl });
  });
} else {
  app.use('/assets', express.static('build', { maxAge: '200d' }));
}

app.get('*', render);

export default app;
