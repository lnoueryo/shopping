import { defineNuxtRouteMiddleware, useError } from 'nuxt/app';

export default defineNuxtRouteMiddleware(to => {
  if (process.server) {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.resolve(
      'public/images/roadmaps',
      `${to.params.id}.svg`
    );

    if (!fs.existsSync(filePath)) {
      const error = useError();
      error.value = { statusCode: 404, message: 'Page not found' };
    }
  }
});
