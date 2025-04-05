import { Box, Skeleton, Paper } from '@mui/material';

interface SkeletonLoaderProps {
  type: 'card' | 'list' | 'form' | 'detail';
  count?: number;
}

/**
 * SkeletonLoader component displays animated loading placeholders
 * that match the structure of various content types
 */
const SkeletonLoader = ({ type, count = 1 }: SkeletonLoaderProps) => {
  const renderCardSkeleton = () => (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        width: '100%',
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={140} sx={{ borderRadius: 1 }} />
      <Skeleton variant="text" height={32} width="70%" sx={{ mt: 2 }} />
      <Skeleton variant="text" height={20} width="90%" />
      <Skeleton variant="text" height={20} width="60%" />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Skeleton variant="rounded" width="30%" height={36} />
        <Skeleton variant="circular" width={40} height={40} />
      </Box>
    </Paper>
  );

  const renderListSkeleton = () => (
    <Box sx={{ width: '100%' }}>
      <Skeleton variant="text" height={30} width="40%" sx={{ mb: 1 }} />
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton variant="text" height={20} width="90%" />
      <Skeleton variant="text" height={20} width="95%" />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <Skeleton variant="rounded" width={60} height={24} sx={{ mr: 1 }} />
        <Skeleton variant="rounded" width={60} height={24} />
      </Box>
    </Box>
  );

  const renderFormSkeleton = () => (
    <Box sx={{ width: '100%' }}>
      <Skeleton variant="text" height={32} width="60%" sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={56} width="100%" sx={{ mb: 3, borderRadius: 1 }} />
      <Skeleton variant="rectangular" height={56} width="100%" sx={{ mb: 3, borderRadius: 1 }} />
      <Skeleton variant="rectangular" height={56} width="100%" sx={{ mb: 3, borderRadius: 1 }} />
      <Skeleton variant="rectangular" height={120} width="100%" sx={{ mb: 3, borderRadius: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Skeleton variant="rounded" width={120} height={40} />
      </Box>
    </Box>
  );

  const renderDetailSkeleton = () => (
    <Box sx={{ width: '100%' }}>
      <Skeleton variant="rectangular" height={250} width="100%" sx={{ borderRadius: 2, mb: 3 }} />
      <Skeleton variant="text" height={40} width="80%" sx={{ mb: 1 }} />
      <Skeleton variant="text" height={24} width="40%" sx={{ mb: 3 }} />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Skeleton variant="circular" width={50} height={50} sx={{ mr: 2 }} />
        <Box>
          <Skeleton variant="text" height={24} width={120} />
          <Skeleton variant="text" height={16} width={80} />
        </Box>
      </Box>
      
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton variant="text" height={20} width="90%" />
      <Skeleton variant="text" height={20} width="95%" />
      <Skeleton variant="text" height={20} width="85%" />
      
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Skeleton variant="rounded" width={100} height={36} />
        <Skeleton variant="rounded" width={100} height={36} />
      </Box>
    </Box>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return renderCardSkeleton();
      case 'list':
        return renderListSkeleton();
      case 'form':
        return renderFormSkeleton();
      case 'detail':
        return renderDetailSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <Box sx={{ width: '100%', animation: 'pulse 1.5s infinite ease-in-out' }}>
      {Array.from(new Array(count)).map((_, index) => (
        <Box key={`skeleton-${type}-${index}`} sx={{ mb: 2 }}>
          {renderSkeleton()}
        </Box>
      ))}
    </Box>
  );
};

export default SkeletonLoader; 