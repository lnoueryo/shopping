import { defineEventHandler, getRequestURL, getQuery, getHeaders } from 'h3';

export default defineEventHandler(event => {
  const url = getRequestURL(event);
  const { method } = event.req;
  const headers = getHeaders(event);
  const query = getQuery(event);
  const ipAddress =
    headers['x-forwarded-for'] || event.req.socket.remoteAddress;

  const logEntry = {
    timestamp: new Date().toISOString(),
    method,
    url,
    query,
    headers,
    ipAddress,
  };

  console.log('Access Log:', logEntry);
});
