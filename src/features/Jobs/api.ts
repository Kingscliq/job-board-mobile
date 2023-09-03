import { useQuery } from '@tanstack/react-query';
import { axios } from '../../lib/axios';
import { useMemo, useState } from 'react';
import { Jobs } from '../../types/jobs';

type queryTypes = {
  query: string;
  page: number;
  num_pages: number;
  location: string;
  sort_by: string;
};
export const useFetchPopularJobs = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [num_pages, setNumPage] = useState<number>(10);
  const [location, setLocation] = useState<string>('');
  const [sort_by, setSortBy] = useState<string>('');

  const fetchPopularJobs = async (params: queryTypes) =>
    await axios
      .get('/jobs', { params })
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));

  const queryParams = useMemo(
    () => ({ query, page, num_pages, location, sort_by }),
    [query, page, num_pages, location, sort_by]
  );

  const { data: popularJobs, isFetching: isLoadingPopularJobs } = useQuery(
    ['popular-jobs', queryParams],
    () => fetchPopularJobs(queryParams)
  );

  const filteredData = useMemo(
    () => popularJobs?.results?.filter((item: Jobs) => item.logo !== null),
    [popularJobs]
  );

  return {
    filteredData,
    popularJobs,
    isLoadingPopularJobs,
    setQuery,
    setPage,
    setNumPage,
    setLocation,
  };
};
