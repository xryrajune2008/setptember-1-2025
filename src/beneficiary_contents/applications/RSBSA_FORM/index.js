/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  LinearProgress,
  Alert,
  Fade,
  Paper,
  Chip,
  Tooltip
} from '@mui/material';
import {
  Person as PersonIcon,
  Agriculture as AgricultureIcon,
  Landscape as LandscapeIcon,
  Assessment as AssessmentIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Import the custom hook
import { useRSBSAForm } from './useRSBSAForm';
import useBeneficiaryData from '../../../hooks-auth/hooks-auth-beneficiary/useBeneficiaryData';

// Import form sections
import BeneficiaryProfileSection from './sections/BeneficiaryProfileSection';
import FarmProfileSection from './sections/FarmProfileSection';
import FarmParcelsSection from './sections/FarmParcelsSection';
import ReviewSection from './sections/ReviewSection';
import SubmissionSection from './sections/SubmissionSection';

// Styled components for modern design
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)'
  }
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  '& .MuiStepLabel-root': {
    '& .MuiStepLabel-iconContainer': {
      '& .MuiSvgIcon-root': {
        fontSize: '1.8rem',
        color: theme.palette.primary.main,
        '&.Mui-active': {
          color: theme.palette.primary.main,
        },
        '&.Mui-completed': {
          color: theme.palette.success.main,
        }
      }
    }
  }
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(2),
  zIndex: 1000,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${theme.palette.divider}`
}));

const ActionButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`
}));

const RSBSAForm = () => {
  // Get beneficiary data using the hook
  const { beneficiaryId, getBeneficiaryId, hasBeneficiaryData } = useBeneficiaryData();
  
  // Get user ID from localStorage (authenticated user)
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const userId = storedUser.id || storedUser.user_id;
  
  // Get beneficiary ID with fallback to user ID (for display only)
  const effectiveBeneficiaryId = beneficiaryId || getBeneficiaryId() || userId;
  
  console.log('🔍 Authenticated user:', storedUser);
  console.log('🔍 User ID:', userId);
  console.log('🔍 Beneficiary ID from hook:', beneficiaryId);
  console.log('🔍 Effective Beneficiary ID:', effectiveBeneficiaryId);
  
  // Check if user is authenticated
  if (!userId) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          You must be logged in to access the RSBSA form. Please log in and try again.
        </Typography>
      </Box>
    );
  }
  
  // Debug information (can be removed in production)
  const debugInfo = {
    userId,
    beneficiaryId,
    effectiveBeneficiaryId,
    hasBeneficiaryData: hasBeneficiaryData(),
    localStorage: {
      user: localStorage.getItem('user'),
      beneficiaryId: localStorage.getItem('beneficiaryId'),
      beneficiaryDetails: localStorage.getItem('beneficiaryDetails')
    }
  };
  
  console.log('🔍 RSBSA Form Debug Info:', debugInfo);
  
  const {
    formData,
    errors,
    backendErrors,
    isSubmitting,
    isSavingDraft,
    currentStep,
    totalSteps,
    submissionResult,
    updateField,
    addFarmParcel,
    updateFarmParcel,
    removeFarmParcel,
    nextStep,
    prevStep,
    goToStep,
    submitForm,
    saveDraft,
    resetForm,
    loadExistingEnrollment,
    formProgress,
    canSubmit,
    hasBackendErrors
  } = useRSBSAForm();
  
  // Load existing enrollment data when component mounts (uses userId as backend expects)
  useEffect(() => {
    if (userId) {
      console.log('🔄 Loading existing enrollment data for user:', userId);
      loadExistingEnrollment(userId);
    }
  }, [userId, loadExistingEnrollment]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ Single handleSubmit
  const handleSubmit = async () => {
    try {
      console.log('🚀 Submitting form with user ID:', userId);
      const result = await submitForm(userId);
      if (result.success) {
        setShowSuccess(true);
        setShowError(false);
      } else {
        setShowError(true);
        setErrorMessage(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('❌ Submission error:', error);
      setShowError(true);
      setErrorMessage('An unexpected error occurred');
    }
  };

  // ✅ Single handleSaveDraft
  const handleSaveDraft = async () => {
    try {
      console.log('💾 Saving draft with user ID:', userId);
      const result = await saveDraft(userId);
      if (result.success) {
        console.log('✅ Draft saved successfully');
      } else {
        console.error('❌ Failed to save draft:', result.error);
      }
    } catch (error) {
      console.error('❌ Draft save error:', error);
    }
  };

  // Handle form reset
  const handleReset = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to reset the form? All data will be lost.')) {
      resetForm();
      setShowSuccess(false);
      setShowError(false);
    }
  };

  // Step configuration
  const steps = [
    {
      label: 'Personal Information',
      icon: <PersonIcon />,
      description: 'Basic beneficiary details'
    },
    {
      label: 'Farm Profile',
      icon: <AgricultureIcon />,
      description: 'Farm and livelihood information'
    },
    {
      label: 'Farm Parcels',
      icon: <LandscapeIcon />,
      description: 'Land ownership details'
    },
    {
      label: 'Review',
      icon: <AssessmentIcon />,
      description: 'Review all information'
    },
    {
      label: 'Submit',
      icon: <SendIcon />,
      description: 'Submit your application'
    }
  ];

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BeneficiaryProfileSection
            formData={formData.beneficiaryDetails}
            errors={errors}
            onEdit={goToStep}
            updateField={(field, value) => updateField('beneficiaryDetails', field, value)}
          />
        );
      case 2:
        return (
          <FarmProfileSection
            formData={formData}
            errors={errors}
            updateField={updateField}
          />
        );
      case 3:
        return (
          <FarmParcelsSection
            farmParcels={formData.farmParcels}
            errors={errors}
            addFarmParcel={addFarmParcel}
            updateFarmParcel={updateFarmParcel}
            removeFarmParcel={removeFarmParcel}
          />
        );
      case 4:
        return (
          <ReviewSection
            formData={formData}
            errors={errors}
            onEdit={goToStep}
          />
        );
      case 5:
        return (
          <SubmissionSection
            formData={formData}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>RSBSA Enrollment</title>
      </Helmet>
      <Container maxWidth="lg">
        {/* Header */}
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            RSBSA Enrollment
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
            Registry System for Basic Sectors in Agriculture
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            Complete this form to register as a beneficiary and access agricultural programs, 
            services, and benefits provided by the Department of Agriculture.
          </Typography>
        </Paper>

        {/* Debug Information (can be removed in production) */}
        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          <Typography variant="body2" gutterBottom>
            <strong>Debug Info:</strong> User ID: {userId} | Beneficiary ID: {beneficiaryId || 'Not set'} | Effective ID: {effectiveBeneficiaryId}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            If Beneficiary ID shows "Not set", the login process may not have completed properly.
          </Typography>
        </Alert>

        {/* Progress Indicator */}
        <ProgressContainer>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              Form Progress
            </Typography>
            <Chip 
              label={`${formProgress}% Complete`}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={formProgress} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4
              }
            }} 
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Step {currentStep} of {totalSteps}: {steps[currentStep - 1]?.description}
          </Typography>
        </ProgressContainer>

        {/* Main Form Card */}
        <StyledCard>
          <CardContent sx={{ p: 4 }}>
            {/* Stepper */}
            <StyledStepper activeStep={currentStep - 1} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel 
                    icon={step.icon}
                    onClick={() => goToStep(index + 1)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Typography variant="body2" fontWeight="medium">
                      {step.label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </StyledStepper>

            {/* Form Content */}
            <Box sx={{ mt: 4 }}>
              {renderStepContent()}
            </Box>

            {/* Action Buttons */}
            <ActionButtonContainer>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Tooltip title="Save current progress">
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveDraft}
                    disabled={isSubmitting}
                  >
                    Save Draft
                  </Button>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={prevStep}
                  disabled={currentStep === 1 || isSubmitting}
                >
                  Back
                </Button>
                {currentStep < totalSteps ? (
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={nextStep}
                    disabled={isSubmitting}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    onClick={handleSubmit}
                    disabled={isSubmitting || !canSubmit}
                  >
                    Submit Application
                  </Button>
                )}
              </Box>
            </ActionButtonContainer>
          </CardContent>
        </StyledCard>
      </Container>
    </>
  );
};

export default RSBSAForm;
