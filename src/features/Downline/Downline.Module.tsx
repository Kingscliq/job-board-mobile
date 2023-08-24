/**
 * **************************************************************************
 * **************************************************************************
 * Author: Kingsley Ajaezo ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: kingsley.ajaezo@fairmoney.io
 *
 * Contributor: Ajaezo Kingsley
 *
 * filename: DownlineModule.tsx
 *
 * @description: This is the container for Downline Module
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <DownlineModule></DownlineModule>
 * @param
 * ? Local & Shared Imports
 */

import { Box } from '@mui/material';
import { useDonwlineQueries, useDownlineFilters } from './api';
import { useEffect, useMemo, useState } from 'react';
import AgentManagementMobile from './mobile/AgentManagementMobile';
import DownlineTable from './components/AgentManagement/Downline.Table';
import DownlineHeader from './components/AgentManagement/Downline.TableHeader';
import { H3, Paragraph } from '@/shared/components/typography';

const DownlineModule = () => {
  const [FILTERS, FILTERS_FUNCTION, DOWNLINES] = useDownlineFilters();

  const {
    loadingAccountList,
    loadingActivityStatusList,
    loadingdownlineAccountTypeList,
    loadingSearchByList,
    accountTypeList,
    downlineAccountType,
    donwlineSearchBy,
    activityStatusList,
  } = useDonwlineQueries();

  const downlineData = useMemo(() => DOWNLINES?.data, [DOWNLINES]);

  const _accountTypeList = useMemo(
    () =>
      Array.isArray(accountTypeList)
        ? accountTypeList?.map((list) => ({
            id: list.key,
            label: list.value,
            value: list.value,
          }))
        : [],
    [accountTypeList],
  );

  const _downlineAccountType = useMemo(
    () =>
      Array.isArray(downlineAccountType)
        ? downlineAccountType?.map((list) => ({
            id: list.key,
            label: list.value,
            value: list.value,
          }))
        : [],
    [downlineAccountType],
  );

  const _donwlineSearchBy = useMemo(
    () =>
      Array.isArray(donwlineSearchBy)
        ? donwlineSearchBy?.map((list) => ({
            id: list.key,
            label: list.value,
            value: list.key,
          }))
        : [],
    [donwlineSearchBy],
  );

  const _activityStatusList = useMemo(
    () =>
      Array.isArray(activityStatusList)
        ? activityStatusList?.map((list) => ({
            id: list.key,
            label: list.value,
            value: list.key,
          }))
        : [],
    [activityStatusList],
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const filterStatusList = _activityStatusList.find(
        (item: any) => item.value == hash.substring(1),
      );
      if (filterStatusList && hash) {
        FILTERS_FUNCTION.setDownlineFilter!({
          field: 'Status',
          value: filterStatusList.value,
        });
      }
    }
  }, [FILTERS_FUNCTION.setDownlineFilter, _activityStatusList]);

  return (
    <Box>
      <Box component='section' className='grid'>
        <Box component='div' className='hidden lg:block'>
          <Box
            component='section'
            className='flex items-center justify-between'
          >
            <Box component='div'>
              <H3 className='font-medium'>Downlines</H3>
              <Paragraph className=''>Manage your downlines</Paragraph>
            </Box>
          </Box>
          <DownlineHeader
            updateFilters={FILTERS_FUNCTION.setDownlineFilter!}
            clearFilters={FILTERS_FUNCTION.resetDownlineState!}
            filtersList={FILTERS}
            downlineData={downlineData}
            loadingAccountTypeList={loadingAccountList}
            downlineAccountType={_accountTypeList}
            activityStatusList={_activityStatusList}
            loadingActivityStatusList={loadingActivityStatusList}
            downlineAccountTypeList={_downlineAccountType}
            loadingdownlineAccountTypeList={loadingdownlineAccountTypeList}
            loadingDonwlineSearchBy={loadingSearchByList}
            donwlineSearchBy={_donwlineSearchBy}
            isFetchingDownline={DOWNLINES.isFetching}
          />
          <DownlineTable
            updateFilters={FILTERS_FUNCTION.setDownlineFilter!}
            clearFilters={FILTERS_FUNCTION.resetDownlineState!}
            filtersList={FILTERS}
            downlineData={downlineData}
            isFetchingDownline={DOWNLINES.isFetching}
            onPageChange={FILTERS_FUNCTION.handlePageChange!}
          />
        </Box>
      </Box>
      <Box component='div' className='lg:hidden block'>
        <AgentManagementMobile
          updateFilters={FILTERS_FUNCTION.setDownlineFilter!}
          clearFilters={FILTERS_FUNCTION.resetDownlineState!}
          filtersList={FILTERS}
          downlineData={downlineData}
          loadingDownlineData={DOWNLINES?.isFetching}
          loadingAccountTypeList={loadingAccountList}
          downlineAccountType={_accountTypeList}
          activityStatusList={_activityStatusList}
          loadingActivityStatusList={loadingActivityStatusList}
          downlineAccountTypeList={_downlineAccountType}
          loadingdownlineAccountTypeList={loadingdownlineAccountTypeList}
          loadingDonwlineSearchBy={loadingSearchByList}
          donwlineSearchBy={_donwlineSearchBy}
        />
      </Box>
    </Box>
  );
};

export default DownlineModule;
