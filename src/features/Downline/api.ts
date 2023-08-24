/**
 * **************************************************************************
 * **************************************************************************
 * Author: Ajaezo Kingsley ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: kingsley.ajaezo@fairmoney.io
 *
 * filename: api.ts
 *
 * @description: This is a component that contains all the api needed for the
 * Transactions Page
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function
 *
 * ? Local & Shared Imports
 */

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import client, { pickErrorMessage, pickResult } from '@/lib/client';
import { searchTypes } from '@/services/models/Transactions';
import { useToast } from '@/lib/hooks/useToast';

import {
  DownlinePayloadTypes,
  DownlineQueryTypes,
  DownlineTerminalQueryTypes,
} from '@/services/models/Downline';
import { useAppState } from '@/lib/auth.context';

const initialState: DownlineQueryTypes = {
  SearchString: '',
  SearchBy: '',
  PageNumber: 1,
  PageSize: 10,
  FilterBy: '',
  downlineType: '' as unknown as number,
  AccountType: '' as unknown as number,
  Status: '' as unknown as number,
  ActiveAgentId: '' as unknown as number,
  downlineAccountType: '' as unknown as number,
};

type Action =
  | {
      type: 'SET_FILTER';
      payload: { field: keyof DownlineQueryTypes; value: string | number };
    }
  | { type: 'CHANGE_PAGE'; payload: { page: number } }
  | { type: 'RESET_STATE' }
  | {
      type: 'SEARCH_DOWNLINES';
      payload: { SearchBy: number; SearchString: string };
    };

function DownlineReducer(
  state: DownlineQueryTypes,
  action: Action,
): DownlineQueryTypes {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        PageNumber: action.payload.page,
      };
    case 'SEARCH_DOWNLINES':
      return {
        ...state,
        SearchString: action.payload.SearchString,
        SearchBy: action.payload.SearchBy,
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

export const useDownlineFilters = () => {
  const { state } = useAppState();
  const [
    {
      SearchString,
      SearchBy,
      PageNumber,
      PageSize,
      FilterBy,
      ActiveAgentId,
      downlineType,
      AccountType,
      Status,
      downlineAccountType,
    },
    dispatch,
  ] = React.useReducer(DownlineReducer, initialState);

  const setDownlineFilter = React.useCallback(
    (payload: DownlinePayloadTypes) => {
      dispatch({ type: 'SET_FILTER', payload });
    },
    [dispatch],
  );

  const resetDownlineState = React.useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
  }, [dispatch]);

  const handlePageChange = React.useCallback((page: number) => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: {
        page,
      },
    });
  }, []);

  const searchFilter = React.useCallback((search: searchTypes) => {
    dispatch({
      type: 'SEARCH_DOWNLINES',
      payload: search,
    });
  }, []);

  const { setAlert } = useToast();
  const downlineList = async (params: DownlineQueryTypes) => {
    const queryParams = {
      FilterBy: '',
      SearchString: params.SearchString,
      SearchBy: params.SearchBy,
      PageNumber: params.PageNumber,
      PageSize: params.PageSize,
      downlineType: params.downlineType,
      AccountType: params.AccountType,
      Status: params.Status,
      AgentId: state?.user?.agent_id,
      downlineAccountType: params?.downlineAccountType,
    };
    try {
      const res = await client.get('c/FieldStaffs/getDownlines', {
        params: queryParams,
      });
      return pickResult(res);
    } catch (error) {
      return pickErrorMessage(error as any);
    }
  };

  const query = React.useMemo(
    () => ({
      ActiveAgentId,
      FilterBy,
      SearchString,
      SearchBy,
      PageNumber,
      PageSize,
      downlineType,
      AccountType,
      Status,
      downlineAccountType,
    }),
    [
      ActiveAgentId,
      FilterBy,
      SearchString,
      SearchBy,
      PageNumber,
      PageSize,
      downlineType,
      AccountType,
      Status,
      downlineAccountType,
    ],
  );

  const { data, isFetching } = useQuery({
    queryKey: ['all-downlines', query],
    queryFn: () => downlineList(query),
    onError(err) {
      setAlert({
        message: typeof err === 'string' ? err : 'Something went wrong!!!',
        severity: 'error',
        autoHideDuration: 5000,
      });
    },
  });

  return [
    {
      FilterBy,
      ActiveAgentId,
      SearchString,
      SearchBy,
      PageNumber,
      PageSize,
      downlineType,
      AccountType,
      Status,
      downlineAccountType,
    },
    {
      handlePageChange,
      setDownlineFilter,
      resetDownlineState,
      searchFilter,
    },
    { data, isFetching },
  ];
};

export const useDonwlineQueries = () => {
  const { setAlert } = useToast();
  const { state } = useAppState();
  const fetchAccountType = () =>
    client.get('c/FieldStaffs/accountType').then(pickResult, pickErrorMessage);
  const fetchdownlineAccountType = () =>
    client
      .get('c/FieldStaffs/getSponsorSearchTypes', {
        params: {
          agentId: state?.user?.agent_id,
        },
      })
      .then(pickResult, pickErrorMessage);
  const fetchActivityStatus = () =>
    client
      .get('c/FieldStaffs/activityStatus')
      .then(pickResult, pickErrorMessage);
  const fetchDownlineSearchByList = () =>
    client
      .get('c/FieldStaffs/getSponsorDownLineSearchBy')
      .then(pickResult, pickErrorMessage);

  const { data: accountTypeList, isFetching: loadingAccountList } = useQuery({
    queryKey: ['account-type'],
    queryFn: fetchAccountType,
    onError: (err) =>
      setAlert({
        message: typeof err === 'string' ? err : 'Something went wrong!!!',
        severity: 'error',
        autoHideDuration: 5000,
      }),
  });

  const {
    data: downlineAccountType,
    isFetching: loadingdownlineAccountTypeList,
  } = useQuery({
    queryKey: ['downline-account-type'],
    queryFn: fetchdownlineAccountType,
    onError: (err) =>
      setAlert({
        message: typeof err === 'string' ? err : 'Something went wrong!!!',
        severity: 'error',
        autoHideDuration: 5000,
      }),
  });

  const { data: activityStatusList, isFetching: loadingActivityStatusList } =
    useQuery({
      queryKey: ['activity-status'],
      queryFn: fetchActivityStatus,
      onError: (err) =>
        setAlert({
          message: typeof err === 'string' ? err : 'Something went wrong!!!',
          severity: 'error',
          autoHideDuration: 5000,
        }),
    });
  const { data: donwlineSearchBy, isFetching: loadingSearchByList } = useQuery({
    queryKey: ['searchList'],
    queryFn: fetchDownlineSearchByList,
    onError: (err) =>
      setAlert({
        message: typeof err === 'string' ? err : 'Something went wrong!!!',
        severity: 'error',
        autoHideDuration: 5000,
      }),
  });

  return {
    accountTypeList,
    loadingAccountList,
    downlineAccountType,
    loadingdownlineAccountTypeList,
    activityStatusList,
    loadingActivityStatusList,
    donwlineSearchBy,
    loadingSearchByList,
  };
};

const initialTerminalFilterState: DownlineTerminalQueryTypes = {
  TerminalPageNumber: 1,
  TerminalPageSize: 10,
};

type TerminalAction =
  | {
      type: 'SET_FILTER';
      payload: {
        field: keyof DownlineTerminalQueryTypes;
        value: string | number;
      };
    }
  | { type: 'CHANGE_PAGE'; payload: { page: number } }
  | { type: 'RESET_STATE' };

function DownlineTerminalReducer(
  state: DownlineTerminalQueryTypes,
  action: TerminalAction,
): DownlineTerminalQueryTypes {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        TerminalPageNumber: action.payload.page,
      };
    case 'RESET_STATE':
      return initialTerminalFilterState;
    default:
      return state;
  }
}

export const useDonwlineDetail = (id: string | undefined) => {
  const { setAlert } = useToast();

  const [{ TerminalPageNumber, TerminalPageSize }, dispatchTerminal] =
    React.useReducer(DownlineTerminalReducer, initialTerminalFilterState);

  const terminalQuery = React.useMemo(() => {
    return {
      TerminalPageNumber,
      TerminalPageSize,
    };
  }, [TerminalPageNumber, TerminalPageSize]);

  const fetchDownlineTerminalHistory = async (queryParams: any) => {
    const params = {
      PageNumber: queryParams.TerminalPageNumber,
      pageSize: queryParams.TerminalPageSize,
      downlineAgentId: id,
    };
    try {
      const res = await client.get(
        'p/sponsordashboard/GetDownlineTerminalActivities',
        {
          params,
        },
      );
      return pickResult(res);
    } catch (error) {
      return pickErrorMessage(error as any);
    }
  };

  const fetchDownlineDetail = (id: string | undefined) =>
    client
      .get(`i/sponsordashboard/GetAgentDetails?agentId=${id}`)
      .then(pickResult, pickErrorMessage);

  const { data: downlineDetail, isFetching: loadingDownlineDetail } = useQuery({
    queryKey: ['donwline-detail', id],
    queryFn: () => fetchDownlineDetail(id),
    enabled: !!id,
    onError: (err) =>
      setAlert({
        message: typeof err === 'string' ? err : 'Something went wrong!!!',
        severity: 'error',
        autoHideDuration: 5000,
      }),
  });

  const { data: terminalHistory, isFetching: loadingTerminalHistory } =
    useQuery({
      queryKey: ['terminal-history', terminalQuery],
      queryFn: () => fetchDownlineTerminalHistory(terminalQuery),
      enabled: !!id,
      onError(err) {
        setAlert({
          message: typeof err === 'string' ? err : 'Something went wrong!!!',
          severity: 'error',
          autoHideDuration: 5000,
        });
      },
    });

  return {
    downlineDetail,
    loadingDownlineDetail,
    terminalHistory,
    loadingTerminalHistory,
  };
};
