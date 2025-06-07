import type {RequestHandler} from 'express';
import express from 'express';
import {Readable} from "node:stream";

export const apiRouter = express.Router();

apiRouter.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

  const proxyImageHandler: RequestHandler = async (req, res) => {
    const { url } = req.query;
    try {
      const response = await fetch(url as string);
      const contentType = response.headers.get('content-type');
      res.setHeader('Content-Type', contentType || 'image/jpeg');

      if (!response.body) {
        res.status(401).send('Not Found'); return;
      }

      const readable = Readable.fromWeb(response.body);
      readable.pipe(res);
    } catch (err) {
      console.error(err);
      res.status(500).send('Proxy error');
    }
  };

apiRouter.get('/proxy-image', proxyImageHandler);