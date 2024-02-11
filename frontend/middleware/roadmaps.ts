import { defineNuxtRouteMiddleware, useError } from 'nuxt/app';
import fs from 'fs';
import path from 'path';
export default defineNuxtRouteMiddleware(to => {
  const error = useError();
  if (process.server) {
    const filePath = path.resolve(
      'public/images/roadmaps',
      `${to.params.id}.webp`
    );

    if (!fs.existsSync(filePath)) {
      error.value = { statusCode: 404, message: 'Page not found' };
      return abortNavigation();
    }
  }
});
