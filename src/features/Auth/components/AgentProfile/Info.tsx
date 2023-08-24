import { Paragraph } from '@/shared/components/typography';
import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface InfoProps {
  icon: ReactNode;
  label: string;
  value: string;
}
const Info = ({ icon, label, value }: InfoProps) => {
  return (
    <Box component='div' className='flex items-start'>
      <Box component='div' className='py-1'>
        {icon}
      </Box>
      <Box component='div' className='ml-2'>
        <Paragraph className='text-sm text-[#565F82]'>{label}</Paragraph>
        <Paragraph>{value}</Paragraph>
      </Box>
    </Box>
  );
};

export default Info;
