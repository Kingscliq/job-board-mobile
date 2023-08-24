/**
 * **************************************************************************
 * **************************************************************************
 * Author: Ajaezo Kinsgley ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: kingsley.ajaezo@fairmoney.io
 *
 * filename: AgentTerminalTable.tsx
 *
 * @description: This is the component that renders Downline Terminal Table
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <AgentTerminalTable></AgentTerminalTable>
 * @param
 * ? Local & Shared Imports
 */

import { Box } from '@mui/material';

import { H3, Paragraph } from '@/shared/components/typography';
import { getDate } from '@/lib/helpers';
import { useCallback, useState } from 'react';
import {
  DropDownTypes,
  PayloadTypes,
  TransactionQueryTypes,
} from '@/services/models/Transactions';
import DateFilter from '@/shared/components/DateFilter';
import { DateRange } from 'react-day-picker';
import { CardBox } from '@/shared/components/CardBox';

interface ITransactionHeaderProps {
  statusList?: DropDownTypes[];
  loadingStatusList?: boolean;
  transTypeList?: DropDownTypes[];
  loadingTransTypeList?: boolean;
  searchByList?: DropDownTypes[];
  loadingSearchByList?: boolean;
  updateFilters: (payload: PayloadTypes) => void;
  clearFilters: () => void | undefined;
  filtersList: TransactionQueryTypes | any;
  transactionData: any;
}

const AgentTerminalTable: React.FC<ITransactionHeaderProps> = ({
  updateFilters,
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModalUpdate = () => setShowModal((s) => !s);

  const filterAction = useCallback(async () => {
    updateFilters({
      field: 'StartDate',
      value: `${getDate(dateRange?.from)}`,
    });

    updateFilters({
      field: 'EndDate',
      value: `${getDate(dateRange?.to)}`,
    });

    handleModalUpdate();
    setDateRange(undefined);
  }, [dateRange, updateFilters]);

  return (
    <>
      {showModal ? (
        <DateFilter
          actionButton={filterAction}
          actionText='Apply'
          captionLayout='dropdown-buttons'
          dateRange={dateRange}
          fromYear={2021}
          handleClose={handleModalUpdate}
          mode='range'
          numberOfMonths={2}
          pagedNavigation
          toYear={2024}
          setDateRange={setDateRange}
        />
      ) : null}
      <CardBox className={['mt-6']}>
        <Box
          component='div'
          className='flex items-center justify-between bg-white py-6 px-4'
        >
          <Box component='div' className=''>
            <H3 className='text-lg'>Downline Terminal</H3>
            <Paragraph className='text-sm'>Terminal history </Paragraph>
          </Box>
        </Box>
      </CardBox>
    </>
  );
};

export default AgentTerminalTable;
