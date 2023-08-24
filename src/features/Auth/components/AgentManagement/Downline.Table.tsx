/**
 * **************************************************************************
 * **************************************************************************
 * Author: Ajaezo Kingsley ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: kingsley.ajaezo@fairmoney.io
 *
 * filename: TransactionsTable.tsx
 *
 * @description: This is the component that renders the transactions
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <TransactionsTable></TransactionsTable>
 * @param ITransactionTableProps
 * ? Local & Shared Imports
 */

import { getDate } from '@/lib/helpers';
import {
  DownlineDataType,
  DownlinePayloadTypes,
  DownlineQueryTypes,
  IDownLineListType,
  downlineStatus,
} from '@/services/models/Downline';
import {
  DropDownTypes,
  TransactionTableHeadDataProps,
} from '@/services/models/Transactions';
import { CardBox } from '@/shared/components/CardBox';
import FullTable, { TD, TH } from '@/shared/components/FullTable';
import { RenderTableBody } from '@/shared/components/FullTable';
import StatusBadge from '@/shared/components/StatusBadge';
import { Paragraph } from '@/shared/components/typography';
import { Avatar, Box, Chip, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

interface IAgentManagementProps {
  updateFilters: (payload: DownlinePayloadTypes) => void;
  clearFilters: () => void | undefined;
  filtersList: DownlineQueryTypes | any;
  downlineData: IDownLineListType;
  activityStatusList?: DropDownTypes[];
  loadingActivityStatusList?: boolean;
  downlineAccountTypeList?: DropDownTypes[];
  loadingAccountTypeList?: boolean;
  donwlineSearchBy?: DropDownTypes[];
  loadingDonwlineSearchBy?: boolean;
  downlineAccountType?: DropDownTypes[];
  loadingdownlineAccountTypeList?: boolean;
  isFetchingDownline?: boolean;
  onPageChange: (page: number) => void;
}

const DownlineTable: React.FC<IAgentManagementProps> = ({
  downlineData,
  isFetchingDownline,
  onPageChange,
}) => {
  const pagination = useMemo(
    () => ({
      count: downlineData?.count,
      page_index: downlineData?.page_index,
      page_size: downlineData?.page_size,
    }),
    [downlineData],
  );

  return (
    <CardBox>
      <Box component='div'>
        <FullTable
          elements={downlineData?.data as unknown as DownlineDataType[]}
          loading={!!isFetchingDownline}
          RenderHeader={RenderHeader}
          RenderBody={RenderBody as any}
          pagination={pagination}
          onChangePage={onPageChange}
        />
      </Box>
    </CardBox>
  );
};

const RenderHeader = () => (
  <TableRow className='odd:bg-white even:bg-[#F9F9FB]'>
    {TableHeadData.map(({ id, label, mobileHidden }) => {
      return (
        <TH
          key={id}
          sx={{
            color: '#64748B',
            fontSize: '12px',
            borderBottomWidth: '1px',
          }}
          mobileHidden={mobileHidden}
        >
          {label}
        </TH>
      );
    })}
  </TableRow>
);

const RenderBody: React.FC<RenderTableBody<DownlineDataType>> = <
  T extends DownlineDataType,
>({
  row,
  index,
}: RenderTableBody<T>) => {
  const router = useRouter();
  return (
    <TableRow
      className='odd:bg-white even:bg-[#F9F9FB]'
      sx={{
        cursor: 'pointer',
      }}
      onClick={() => router.push(`/downline/${row?.agentId}`)}
    >
      <TD className='hidden sm:table-cell'>
        <Box component='figure' className='flex items-center'>
          <Avatar src={row?.passport} />
          <Paragraph className='ml-3'> {row?.fullName || '-'}</Paragraph>
        </Box>
      </TD>
      <TD className='hidden sm:table-cell'>{row?.username || '-'}</TD>

      <TD className='hidden sm:table-cell'>{row?.businessName || '-'}</TD>
      <TD className='hidden sm:table-cell'>{row?.phoneNumber || '-'}</TD>
      <TD className='hidden sm:table-cell'>
        <Chip variant='outlined' label={row?.downLineType} />
      </TD>
      <TD className='hidden sm:table-cell'>{row?.accountType || '-'}</TD>
      <TD className='hidden sm:table-cell'>
        {row?.createdAt ? `${getDate(row?.createdAt)}` : '-'}
      </TD>
      <TD>
        <StatusBadge fill={downlineStatus[row?.status!]} label={row?.status!} />
      </TD>
    </TableRow>
  );
};

const TableHeadData: TransactionTableHeadDataProps[] = [
  {
    id: 'downline-0011-trans/fullname',
    label: 'Fullname',
    mobileHidden: false,
  },
  {
    id: 'downline-0199182-username',
    label: 'Username',
    mobileHidden: false,
  },
  {
    id: 'downline-0199182-business-name',
    label: 'Business Name',
    mobileHidden: false,
  },
  {
    id: 'downline-01291-phone',
    label: 'Phone',
    mobileHidden: true,
  },
  {
    id: 'downline-0199182-account-type',
    label: 'Downline Type',
    mobileHidden: false,
  },
  {
    id: 'down-0199182-account-type',
    label: 'Account Type',
    mobileHidden: true,
  },
  {
    id: 'down-0199182-date-created-type',
    label: 'Date Created',
    mobileHidden: true,
  },
  {
    id: 'donwline-0199182-status',
    label: 'status',
    mobileHidden: false,
  },
];

export default DownlineTable;
