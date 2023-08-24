/**
 * **************************************************************************
 * **************************************************************************
 * Author: Ajaezo Kingsley ::::: PayForce By FairMoney :::::: © Copyright 2023
 *
 * email: kingsley.ajaezo@fairmoney.io
 *
 * filename: AgentProfile.tsx
 *
 * @description: This is the component that renders Agents Details
 *
 * ***************************************************************************
 * ***************************************************************************
 *
 * @returns
 * @function <AgentProfile></AgentProfile>
 * @param IAgentProfileProps
 *
 * ? Local & Shared Imports
 */

import { BankIcon } from '@/assets/svg-icons/Bank';
import { WalletIcon } from '@/assets/svg-icons/WalletIcon';
import { CardBox } from '@/shared/components/CardBox';
import CopyClipboard from '@/shared/components/CopyClipboard';
import CustomImage from '@/shared/components/CustomImage';
import { H3, Paragraph } from '@/shared/components/typography';
import { Box, Chip } from '@mui/material';
import Info from './Info';
import { MailIcon } from '@/assets/svg-icons/MailIcon';
import { PhoneIcon } from '@/assets/svg-icons/PhoneIcon';
import { GpsIcon } from '@/assets/svg-icons/GpsIcon';
import { BriefcaseIcon } from '@/assets/svg-icons/Briefcase';
import { KYCLevelIcon } from '@/assets/svg-icons/KYCLevel';
import { TransactionLimitIcon } from '@/assets/svg-icons/TransactionLimitIcon';
import { ProfileIcon } from '@/assets/svg-icons/ProfileIcon';
import {
  AgentAccountNumberTypes,
  DownlineData,
  accountTypeEnum,
  downlineAccountTypeEnum,
  downlineColorVariants,
  downlineStatus,
} from '@/services/models/Downline';
import { CircleShimmer } from '@/assets/svg-icons/CircleShimmer';
import StatusBadge from '@/shared/components/StatusBadge';
import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDonwlineDetail } from '../../api';
import AgentTerminalTable from './AgentTerminalTable';

const AgentProfile = () => {
  const router = useRouter();
  const { id } = router?.query;

  const {
    downlineDetail,
    terminalHistory,
    loadingTerminalHistory,
    loadingDownlineDetail: loading,
  } = useDonwlineDetail(id as string);

  const downlineData = useMemo(
    () => downlineDetail as unknown as DownlineData,
    [downlineDetail],
  );

  const _account_numbers = React.useMemo(
    () =>
      downlineData?.agent_virtual_accounts?.filter(
        (item: AgentAccountNumberTypes) => item.provider_api === 'INSTAFIN',
      ),
    [downlineData?.agent_virtual_accounts],
  );

  return (
    <CardBox>
      {loading ? (
        <Box component='div' className='flex items-center justify-center p-32'>
          <CircleShimmer className='h-[30px] w-[30px] text-fair-money' />
        </Box>
      ) : (
        <Box component='div' className='hidden lg:block'>
          <Box
            component='div'
            className='cursor-pointer mb-8 '
            onClick={() => router.back()}
          >
            &larr; Back
          </Box>
          <Box
            component='div'
            className='flex items-center justify-between py-6'
          >
            <Box component='div' className='flex items-center'>
              {loading ? (
                <Box
                  component='div'
                  className='animate-pulse bg-slate-100 h-24 w-24'
                ></Box>
              ) : (
                <Box
                  component='figure'
                  className='h-24 w-24 overflow-hidden rounded-lg'
                >
                  <CustomImage
                    alt='Profile-image'
                    src={downlineData?.passport || 'https://picsum.photos/200'}
                    height={100}
                    width={100}
                    imgClassName='w-full h-full'
                  />
                </Box>
              )}
              <Box component='div' className=''>
                <Box component='div' className='ml-3'>
                  <Paragraph className='font-normal'>
                    {downlineData?.full_name}
                  </Paragraph>
                  <Box component='div' className='mb-2'>
                    <CopyClipboard text={downlineData?.username} />
                  </Box>
                  <Chip
                    variant='outlined'
                    label={
                      downlineAccountTypeEnum[downlineData?.agent_account_type]
                    }
                    className='mb-2'
                  />
                  <StatusBadge
                    fill={downlineColorVariants[downlineData?.status]}
                    label={downlineStatus[downlineData?.status]}
                    className='mb-2'
                  />
                  <Box component='div' className='ml-4 mb-4'>
                    <Paragraph className={'mb-2 font-bold'}>
                      Terminal IDs
                    </Paragraph>
                    <Box component='div' className='grid grid-cols-2 gap-4'>
                      {downlineData?.terminals?.length > 0
                        ? downlineData?.terminals.map(
                            (terminal: any, idx: number) => {
                              return (
                                <Box component='div' className='' key={idx}>
                                  <CopyClipboard text={terminal?.terminal_id} />
                                </Box>
                              );
                            },
                          )
                        : '-'}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box component='div' className=''>
              <Paragraph className='font-medium mb-4'>Account Number</Paragraph>
              <Box component='div' className='flex'>
                <Box component='div' className=''>
                  <BankIcon strokeColor='#434F75' />
                </Box>
                <Box component='div' className='ml-4 mb-4'>
                  <Paragraph className={'mb-2'}>
                    Fairmoney Acc [Bank Transfer]
                  </Paragraph>
                  {_account_numbers.length > 0
                    ? _account_numbers.map(
                        (acc: AgentAccountNumberTypes, idx: number) => {
                          return (
                            <Box component='div' className='' key={idx}>
                              <CopyClipboard text={acc?.account_no} />
                            </Box>
                          );
                        },
                      )
                    : '-'}
                </Box>
              </Box>
              <Box component='div' className='flex'>
                <Box component='div' className=''>
                  <WalletIcon />
                </Box>
                <Box component='div' className='ml-4'>
                  <Paragraph className={'mb-2'}>
                    Payforce Acc [wallet to wallet]
                  </Paragraph>
                  <Box component='div' className=''>
                    <CopyClipboard
                      text={downlineData?.payforce_account_number || '-'}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box component='section' className='mt-6 border border-[#DBDAE4] p-6'>
            <Box component='section' className='mb-12'>
              <Paragraph className='mb-6 font-medium'>
                Contact details
              </Paragraph>
              <Box component='section' className='grid grid-cols-2 mb-6 gap-3'>
                <Info
                  icon={<MailIcon />}
                  label={'Email Address'}
                  value={downlineData?.email_address || '-'}
                />
                <Info
                  icon={<PhoneIcon />}
                  label={'Phone number'}
                  value={downlineData?.phone_number || '-'}
                />
                <Info
                  icon={<GpsIcon />}
                  label={'Residential address'}
                  value={downlineData?.residential_address || '-'}
                />
                <Info
                  icon={<MailIcon />}
                  label={' State,LGA'}
                  value={`${downlineData?.state || '-'}, ${
                    downlineData?.l_g_a || '-'
                  }`}
                />
              </Box>
            </Box>
            <Box component='section' className='mb-6'>
              <Paragraph className='mb-6 font-medium'>
                Business details
              </Paragraph>
              <Box component='section' className='grid grid-cols-2 gap-3 font'>
                <Info
                  icon={<BriefcaseIcon strokeColor='#434F75' />}
                  label={'Business name'}
                  value={downlineData?.business_name || '-'}
                />
                <Info
                  icon={<TransactionLimitIcon strokeColor='#434F75' />}
                  label={'Transaction limit'}
                  value={`N${downlineData?.transaction_limit || '-'}`}
                />
                <Info
                  icon={<KYCLevelIcon strokeColor='#434F75' />}
                  label={'KYC Level'}
                  value={downlineData?.k_y_c_level || '-'}
                />
                <Info
                  icon={<ProfileIcon strokeColor='#434F75' />}
                  label={'Account type'}
                  value={accountTypeEnum[downlineData.account_type]}
                />
              </Box>
            </Box>
          </Box>
          <AgentTerminalTable
            terminalHistory={terminalHistory?.paginated_terminal_activities}
            loading={loadingTerminalHistory}
          />
        </Box>
      )}
    </CardBox>
  );
};

export default AgentProfile;
