export const useSearchBooks = () => {
  const router = useRouter();
  const route = useRoute();

  const searchByGenre = async (genre: string) => {
    const query = { ...route.query };
    query['genre'] = genre;
    delete query['keyword'];
    return await resetPageAndSearch(query);
  };

  const searchByKeyword = async (keyword: string) => {
    const query = { ...route.query, keyword: keyword };
    delete query['genre'];
    return await resetPageAndSearch(query);
  };

  const filterBooks = async (rate, skillLevels) => {
    const query = buildFilterQuery(rate, skillLevels);
    return await resetPageAndSearch(query);
  };

  const searchOnAccordion = (rate, skillLevels, genre) => {
    const query = buildFilterQuery(rate, skillLevels);
    if (genre) {
      query['genre'] = genre;
      delete query['keyword'];
    } else {
      delete query['genre'];
    }
    return resetPageAndSearch(query);
  };

  const goToNextPage = async page => {
    const query = { ...route.query };
    query['page'] = page;
    await router.push({ path: '/books', query: query });
    return query;
  };

  const buildFilterQuery = (rate, skillLevels) => {
    const query = { ...route.query };
    if (rate) query['rate'] = rate;
    else delete query['rate'];
    if (skillLevels) query['levels'] = skillLevels;
    return query;
  };

  const resetPageAndSearch = async query => {
    query['page'] = 1;
    await router.push({ path: '/books', query: query });
    return query;
  };

  return {
    searchByGenre,
    searchByKeyword,
    filterBooks,
    searchOnAccordion,
    goToNextPage,
  };
};
