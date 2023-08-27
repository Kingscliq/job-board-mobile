import { useQuery } from '@tanstack/react-query';
import { axios } from '../../lib/axios';

export const useFetchPopularJobs = () => {
  const fetchPopularJobs = async () =>
    axios
      .get('')
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

  const { data: popularJobs, isFetching: isLoadingPopularJobs } = useQuery(
    ['popular-jobs'],
    fetchPopularJobs
  );

  return {
    popularJobs,
    isLoadingPopularJobs,
  };
};
