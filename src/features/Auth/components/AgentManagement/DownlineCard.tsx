import { DownlineCardTypes, downlineStatus } from '@/services/models/Downline';
import CustomImage from '@/shared/components/CustomImage';
import StatusBadge from '@/shared/components/StatusBadge';
import { Paragraph } from '@/shared/components/typography';
import { Avatar, Box, Chip } from '@mui/material';
import React from 'react';

interface DownlineCardProps {
  active: boolean;
  data: DownlineCardTypes;
  onClick: () => void;
}

const DownlineCard = ({ active, data, onClick }: DownlineCardProps) => {
  return (
    <Box
      component='section'
      className={`hover:bg-[#F3F3F6] transition-all duration-500 ease-in-out cursor-pointer ${
        active && 'bg-[#F3F3F6]'
      }`}
      onClick={onClick}
    >
      <Box
        component='section'
        className='flex items-center justify-between p-4'
      >
        <Box component='section' className='flex items-center '>
          <Box component='figure' className='self-start'>
            <Avatar src={data?.passport} sx={{ width: 80, height: 80 }} />
          </Box>
          <Box component='div' className='ml-3'>
            <Paragraph className='font-normal'>{data?.fullName}</Paragraph>
            <Paragraph className='font-normal mb-4 text-gray-400'>
              @{data?.username}
            </Paragraph>
            <Chip variant='outlined' label={data?.downLineType} />
          </Box>
        </Box>
        <Box component='section'>
          <StatusBadge
            fill={downlineStatus[data?.status] as any}
            label={data?.status as any}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default DownlineCard;
