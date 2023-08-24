/**
 * **************************************************************************
 * **************************************************************************
 * Author:  Kingsley Ajaezo ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: kingsley.ajaezo@fairmoney.io
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
import { CardBox } from '../../../../shared/components/CardBox';

import { H3, Paragraph } from '@/shared/components/typography';

import SelectDropdown from '@/shared/components/CustomSelect';
import { Search } from '@mui/icons-material';
import DownlineCard from './DownlineCard';
import {
  DownlineCardTypes,
  DownlineData,
  DownlinePayloadTypes,
  DownlineQueryTypes,
  accountTypeList,
  activityStatus,
  downlineType,
  sponsorDownlineSearchByList,
} from '@/services/models/Downline';
import NoData from '../NoData';
import { DropDownTypes } from '@/services/models/Transactions';
import { CircleShimmer } from '@/assets/svg-icons/CircleShimmer';

interface IAgentManagementProps {
  updateFilters: (payload: DownlinePayloadTypes) => void;
  clearFilters: () => void | undefined;
  filtersList: DownlineQueryTypes | any;
  downlineData: DownlineCardTypes[];
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

const AgentManagement: React.FC<IAgentManagementProps> = ({
  updateFilters,
  clearFilters,
  filtersList,
  downlineData,
  activityStatusList,
  downlineAccountTypeList,
  downlineAccountType,
  loadingActivityStatusList,
  loadingAccountTypeList,
  donwlineSearchBy,
  loadingDonwlineSearchBy,
  isFetchingDownline,
}) => {
  return (
    <CardBox>
      <Box component='section' className='flex items-center justify-between'>
        <Box component='div'>
          <H3 className='font-medium'>Downlines</H3>
          <Paragraph className=''>Manage your downlines</Paragraph>
        </Box>
      </Box>
      <Box component='div' className='my-6 grid grid-cols-3 gap-4'>
        <Box component='div' className='col-span-2'>
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
        <Box component='div' className='col-span-1'>
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
        </Box>
      </Box>
      <Box component='div' className='my-6 grid grid-cols-3 gap-4'>
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
      <Box component='div' className=''>
        {downlineData && downlineData.length === 0 && (
          <NoData text='No Downlines Found...' />
        )}
        {isFetchingDownline && (
          <Box
            component='div'
            className=' flex items-center justify-center p-32'
          >
            <CircleShimmer className='h-[30px] w-[30px] text-fair-money' />
          </Box>
        )}
        {(downlineData as any)?.data?.map((item: DownlineCardTypes) => {
          return (
            <DownlineCard
              key={item.username}
              data={item}
              active={filtersList.activeAgentId === item.agentId}
              onClick={() =>
                updateFilters({ field: 'ActiveAgentId', value: item.agentId })
              }
            />
          );
        })}
      </Box>
    </CardBox>
  );
};

export default AgentManagement;
