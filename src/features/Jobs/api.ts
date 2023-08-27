import { useQuery } from '@tanstack/react-query';
import { axios } from '../../lib/axios';
import { useMemo, useState } from 'react';

type queryTypes = {
  query: string;
  page: number;
  num_pages: number;
};
export const useFetchPopularJobs = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [num_pages, setNumPage] = useState<number>(10);

  const fetchPopularJobs = async (params: queryTypes) =>
    axios
      .get('/search', { params })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

  const queryParams = useMemo(
    () => ({ query, page, num_pages }),
    [query, page, num_pages]
  );

  const { data: popularJobs, isFetching: isLoadingPopularJobs } = useQuery(
    ['popular-jobs'],
    () => fetchPopularJobs(queryParams)
  );

  return {
    popularJobs,
    isLoadingPopularJobs,
  };
};
