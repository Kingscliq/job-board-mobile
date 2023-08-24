import React from 'react';
import PayforceLogoDark from '@/assets/svg-icons/PayforceLogoDark';
import { Paragraph } from '@/shared/components/typography';
import { Box } from '@mui/material';

interface NoDataProps {
  text?: string;
}

const NoData = ({ text }: NoDataProps) => {
  return (
    <Box
      component='div'
      className='flex items-center justify-center flex-col lg:p-6 p-4 h-60'
    >
      <Box component='figure' className='mb-6 lg:mb-12'>
        <Box component='div' className='opacity-20'>
          <PayforceLogoDark />
        </Box>
      </Box>
      <Box component='figure' className=''>
        <Paragraph className='text-gray-400 text-sm lg:text-base'>
          {text || 'No Data to render'}
        </Paragraph>
      </Box>
    </Box>
  );
};

export default NoData;
