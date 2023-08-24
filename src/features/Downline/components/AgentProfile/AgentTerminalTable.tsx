/**
 * **************************************************************************
 * **************************************************************************
 * Author: Ajaezo Kingsley ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: kingsley.ajaezo@fairmoney.io
 *
 * filename: AgentTerminalTable.tsx
 *
 * @description: This is the component that renders the Downline Terminals
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <AgentTerminalTable></AgentTerminalTable>
 * @param IAgentTerminalTableProps
 * ? Local & Shared Imports
 */

import { getDateTime } from '@/lib/helpers';

import {
  ITerminalDataResponse,
  ITerminalDataTypes,
} from '@/services/models/Terminals';
import { TransactionTableHeadDataProps } from '@/services/models/Transactions';
import { CardBox } from '@/shared/components/CardBox';
import FullTable, { TD, TH } from '@/shared/components/FullTable';
import { RenderTableBody } from '@/shared/components/FullTable';
import { H3, Paragraph } from '@/shared/components/typography';
import { Box, Button, TableRow, Popper } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { ElipsesIcon } from '@/assets/svg-icons/Elipses';

import { useRouter } from 'next/router';

interface IAgentTerminalTableProps {
  terminalHistory: ITerminalDataResponse;
  loading: boolean | undefined;
  handlePageChange?: (page: number) => void;
}

const AgentTerminalTable: React.FC<IAgentTerminalTableProps> = ({
  terminalHistory,
  loading,
  handlePageChange,
}) => {
  const pagination = useMemo(
    () => ({
      count: terminalHistory?.count,
      page_index: terminalHistory?.page_index,
      page_size: terminalHistory?.total_pages,
    }),
    [terminalHistory],
  );
  return (
    <CardBox className={['mt-6']}>
      <Box
        component='div'
        className='flex items-center justify-between bg-white py-6 px-4'
      >
        <Box component='div' className=''>
          <H3 className='text-lg font-medium'>Downline Terminal</H3>
          <Paragraph className='text-sm'>Terminal history </Paragraph>
        </Box>
      </Box>
      <Box className='mt-6' component='div'>
        <FullTable
          elements={terminalHistory?.data}
          loading={!!loading}
          RenderHeader={RenderHeader}
          RenderBody={RenderBody as any}
          pagination={pagination}
          onChangePage={handlePageChange}
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
            fontSize: '14px',
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

const RenderBody: React.FC<RenderTableBody<ITerminalDataTypes>> = <
  T extends ITerminalDataTypes,
>({
  row,
  index,
}: RenderTableBody<T>) => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [isTerminalConfigVisible, setIsTerminalConfigVisible] = useState(false);

  const handleElipsisClick = () => {
    setIsTerminalConfigVisible(!isTerminalConfigVisible);
  };
  return (
    <TableRow
      className='odd:bg-white even:bg-[#F9F9FB]'
      sx={{
        cursor: 'pointer',
      }}
    >
      <TD className=' table-cell'>{row?.username || '-'}</TD>
      <TD className='hidden sm:table-cell'>{row?.terminal_id || '-'}</TD>
      <TD className='hidden sm:table-cell'>
        {row?.terminal_serial_number || '-'}
      </TD>
      <TD className='hidden sm:table-cell'>
        {row?.date_assigned
          ? getDateTime(row?.date_assigned as unknown as Date)
          : '-'}
      </TD>
      <TD className='hidden sm:table-cell'>
        {row?.date_unassigned
          ? getDateTime(row?.date_unassigned as unknown as Date)
          : '-'}
      </TD>
      {/* <TD className='hidden sm:table-cell'>
        <StatusBadge fill={'0'} label={'Active'} />
      </TD> */}
      <TD textAlign='center' borderLeft='1px solid #e3ecf4'>
        <Box component='div' className=' w-[35px] h-[35px] relative'>
          <Box component='button' onClick={handleElipsisClick}>
            <ElipsesIcon />
          </Box>
          {isTerminalConfigVisible && (
            <Box
              component='button'
              className='shadow py-1 font-medium font-primary capitalize text-xs text-[#64748B] w-[150px] absolute right-3/4 top-3/4 '
              onClick={() => router.push(`/terminal/${row?.terminal_id}`)}
            >
              Terminal Configuration
            </Box>
          )}
        </Box>
      </TD>
    </TableRow>
  );
};

const TableHeadData: TransactionTableHeadDataProps[] = [
  {
    id: 'terminal-0010-account/username',
    label: 'Username',
    mobileHidden: false,
  },
  {
    id: 'terminal-0010-account/terminalId',
    label: 'Terminal ID',
    mobileHidden: true,
  },
  {
    id: 'terminal-0010-account/action',
    label: 'Serial No',
    mobileHidden: true,
  },
  {
    id: 'terminal-0010-account/date-assined',
    label: 'Date Assigned',
    mobileHidden: true,
  },
  {
    id: 'terminal-0010-account/date-unassigned',
    label: 'Date UnAssigned',
    mobileHidden: true,
  },
];

export default AgentTerminalTable;
