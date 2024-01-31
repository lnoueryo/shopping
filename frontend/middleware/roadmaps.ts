import { defineNuxtRouteMiddleware } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to, from) => {
  const error = useError();
  if (process.server) {
    const fs = require('fs');
    const path = require('path');

    const params = to.params;
    const filePath = path.resolve('public/images/roadmaps', `${params.id}.svg`);

    if (!fs.existsSync(filePath)) {
      error.value = { statusCode: 404, message: 'Page not found' };
    }
  }
});
