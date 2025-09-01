/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  Grid,
  Chip,
  Stack,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Agriculture as AgricultureIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Verified as VerifiedIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const StatsCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1),
  textAlign: 'center',
  border: `1px solid ${theme.palette.divider}`
}));

const StatusAvatar = styled(Avatar)(({ theme, status }) => ({
  width: 48,
  height: 48,
  backgroundColor: 
    status === 'verified' ? theme.palette.success.main :
    status === 'pending' ? theme.palette.warning.main :
    status === 'incomplete' ? theme.palette.error.main :
    theme.palette.grey[400]
}));

function BeneficiarySummary() {
  // This would typically come from your state management or API
  const beneficiaryData = {
    rsbsa_number: 'RSBSA-2024-001234',
    verification_status: 'verified', // verified, pending, incomplete
    profile_completion: 85,
    total_applications: 3,
    approved_applications: 2,
    pending_applications: 1,
            total_farm_area: '2.5 hectares',
    primary_crop: 'Rice',
    location: 'Opol, Misamis Oriental',
    member_since: '2024-01-15',
    last_activity: '2024-03-10',
    upcoming_deadlines: [
      { title: 'Seed Subsidy Application', date: '2024-03-20' },
      { title: 'Training Program Enrollment', date: '2024-03-25' }
    ]
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <VerifiedIcon />;
      case 'pending':
        return <ScheduleIcon />;
      case 'incomplete':
        return <WarningIcon />;
      default:
        return <PersonIcon />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'verified':
        return { label: 'Verified', color: 'success' };
      case 'pending':
        return { label: 'Under Review', color: 'warning' };
      case 'incomplete':
        return { label: 'Incomplete', color: 'error' };
      default:
        return { label: 'Unknown', color: 'default' };
    }
  };

  const statusInfo = getStatusLabel(beneficiaryData.verification_status);

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader 
        avatar={
          <StatusAvatar status={beneficiaryData.verification_status}>
            {getStatusIcon(beneficiaryData.verification_status)}
          </StatusAvatar>
        }
        title="Beneficiary Summary" 
        subheader="Your agricultural profile overview"
        action={
          <Tooltip title="Refresh Data">
            <IconButton size="small">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      
      <CardContent>
        {/* Status Section */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              RSBSA Status:
            </Typography>
            <Chip 
              label={statusInfo.label}
              color={statusInfo.color}
              size="small"
              variant="outlined"
            />
          </Stack>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Registration: {beneficiaryData.rsbsa_number}
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2">Profile Completion</Typography>
              <Typography variant="body2">{beneficiaryData.profile_completion}%</Typography>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={beneficiaryData.profile_completion}
              sx={{ 
                height: 6, 
                borderRadius: 3,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3
                }
              }}
            />
          </Box>
        </Box>

        {/* Quick Stats */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Quick Stats
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StatsCard>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {beneficiaryData.total_applications}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Applications
                </Typography>
              </StatsCard>
            </Grid>
            <Grid item xs={6}>
              <StatsCard>
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  {beneficiaryData.approved_applications}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Approved
                </Typography>
              </StatsCard>
            </Grid>
          </Grid>
        </Box>

        {/* Farm Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Farm Details
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Farm Area:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {beneficiaryData.total_farm_area}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Primary Crop:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {beneficiaryData.primary_crop}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Location:
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {beneficiaryData.location}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Upcoming Deadlines */}
        {beneficiaryData.upcoming_deadlines.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom color="warning.main">
              Upcoming Deadlines
            </Typography>
            <Stack spacing={1}>
              {beneficiaryData.upcoming_deadlines.map((deadline, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    p: 1.5, 
                    bgcolor: 'warning.light', 
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'warning.main'
                  }}
                >
                  <Typography variant="body2" fontWeight="bold" gutterBottom>
                    {deadline.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Due: {new Date(deadline.date).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Last Activity */}
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary">
            Last Activity: {new Date(beneficiaryData.last_activity).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default BeneficiarySummary;