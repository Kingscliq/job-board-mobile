/**
 * **************************************************************************
 * **************************************************************************
 * Author: Isaiah Abiodun ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: isaiah.abiodun@fairmoney.io
 *
 * Contributor: Ajaezo Kingsley
 *
 * filename: TansactionHeader.tsx
 *
 * @description: This is the Transaction Header Components that holds the info of the heading section of TSM Transactions Page
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <TransactionHeader></TransactionHeader>
 * @param
 * ? Local & Shared Imports
 */

import { Box, InputAdornment, TextField } from '@mui/material';

import { DropDownTypes } from '@/services/models/Transactions';
import SelectDropdown from '@/shared/components/CustomSelect';
import { Search } from '@mui/icons-material';
import {
  DownlineData,
  DownlinePayloadTypes,
  DownlineQueryTypes,
} from '@/services/models/Downline';

interface IDownlineProps {
  updateFilters: (payload: DownlinePayloadTypes) => void;
  clearFilters: () => void | undefined;
  filtersList: DownlineQueryTypes | any;
  downlineData: DownlineData[];
  activityStatusList?: DropDownTypes[];
  loadingActivityStatusList?: boolean;
  downlineAccountTypeList?: DropDownTypes[];
  loadingAccountTypeList?: boolean;
  donwlineSearchBy?: DropDownTypes[];
  loadingDonwlineSearchBy?: boolean;
  downlineAccountType?: DropDownTypes[];
  loadingdownlineAccountTypeList?: boolean;
  isFetchingDownline?: boolean;
}
const DownlineHeader: React.FC<IDownlineProps> = ({
  updateFilters,
  filtersList,
  activityStatusList,
  downlineAccountTypeList,
  downlineAccountType,
  loadingActivityStatusList,
  loadingAccountTypeList,
  donwlineSearchBy,
  loadingDonwlineSearchBy,
}) => {
  return (
    <>
      <Box
        component='div'
        className='mt-10 grid gap-3 items-center bg-white py-6 px-4'
      >
        <Box component='div' className='my-6 grid grid-cols-2 gap-4'>
          <Box component='div' className='col-span-1'>
            <TextField
              placeholder='Search Name/Phone Number/Terminal ID'
              title='Search Name/Phone Number/Terminal ID'
              className='w-full'
              value={filtersList?.SearchString}
              onChange={(e) => {
                updateFilters({
                  field: 'SearchString',
                  value: e.target.value,
                });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box component='div' className='col-span-1 grid grid-cols-4 gap-4'>
            <SelectDropdown
              id={'Search By'}
              options={donwlineSearchBy as any}
              variant={'primary'}
              placeholder='Search By'
              value={filtersList?.SearchBy}
              loading={loadingDonwlineSearchBy}
              isSearchable={false}
              onChange={({ value }: { value: string }) => {
                updateFilters({ field: 'SearchBy', value });
              }}
            />
            <SelectDropdown
              id={'Agent Type'}
              options={downlineAccountTypeList as any}
              variant={'outline'}
              placeholder='Downline Type'
              value={filtersList?.downlineType}
              loading={loadingAccountTypeList}
              isSearchable={false}
              onChange={({ value }: { value: string }) => {
                updateFilters({ field: 'downlineType', value });
              }}
            />
            <SelectDropdown
              id={'Account Type'}
              options={downlineAccountType as any}
              variant={'outline'}
              placeholder='Account Type'
              value={filtersList?.AccountType}
              loading={loadingAccountTypeList}
              onChange={({ value }: { value: string }) => {
                updateFilters({ field: 'AccountType', value });
              }}
            />
            <SelectDropdown
              id={'Status'}
              options={activityStatusList as any}
              variant={'outline'}
              placeholder='Status'
              value={filtersList?.Status}
              onChange={({ value }: { value: string }) => {
                updateFilters({ field: 'Status', value });
              }}
              loading={loadingActivityStatusList}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DownlineHeader;
