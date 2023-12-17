import { useError } from 'nuxt/app';
import { skillLevelsData } from '~/assets/js/skill-levels';
import { genreData } from '~/assets/js/genres';

export default defineNuxtRouteMiddleware((context) => {
  const { query } = context;
  const error = useError();

  if (query.keyword && query.genre) {
    error.value = { statusCode: 404, message: 'Page not found' };
  }

  if (query.genre) {
    if (genreData.every(genre => genre.id != query.genre)) {
      error.value = { statusCode: 404, message: 'Page not found' };
    }
  }

  if (query.rate) {
    const rate = Number(query.rate);
    if (rate < 0 || 4 < rate) {
      error.value = { statusCode: 404, message: 'Page not found' };
    }
  }

  if (query.levels) {
    const selectedSkillLevels =
      !query.levels
        ? []
        : Array.isArray(query.levels)
          ? query.levels
          : [query.levels]
    if (selectedSkillLevels.some(selectedSkillLevel => !skillLevelsData.map(skillLevel => skillLevel.title).includes(selectedSkillLevel))) {
      error.value = { statusCode: 404, message: 'Page not found' };
    }
  }

});
