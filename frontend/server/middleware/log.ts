import { defineEventHandler, getRequestURL, getHeaders } from 'h3';
const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(event => {
  if (runtimeConfig.public.MODE !== 'development') return;
  const url = getRequestURL(event);
  const { method } = event.req;
  const headers = getHeaders(event);
  const ipAddress =
    headers['x-forwarded-for'] || event.req.socket.remoteAddress;

  console.log(
    `Access Log: ${method} ${new Date().toISOString()} ${url.href} ${ipAddress}`
  );
});
