import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Avatar,
  LinearProgress,
  Fade,
  Zoom
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  Agriculture as AgricultureIcon,
  Landscape as LandscapeIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Category as CategoryIcon,
  Pets as PetsIcon,
  Egg as EggIcon,
  Grain as GrainIcon,
  LocalFlorist as LocalFloristIcon,
  Water as WaterIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  School as SchoolIcon,
  Accessibility as AccessibilityIcon,
  VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';

const ReviewSection = ({ formData, errors, onEdit }) => {
  // Safety check for formData
  if (!formData) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Form data is not available. Please refresh the page.
        </Typography>
      </Box>
    );
  }

  if (!formData.beneficiaryDetails) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Beneficiary details are not loaded yet. Please wait or refresh the page.
        </Typography>
      </Box>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatBoolean = (value) => {
    return value ? 'Yes' : 'No';
  };

  const formatEnum = (value) => {
    if (!value) return 'Not specified';
    return value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Get commodity summary data
  const getCommoditySummary = () => {
    const summary = {
      rice: { count: 0, totalArea: 0, parcels: [] },
      corn: { count: 0, totalArea: 0, parcels: [] },
      hvc: { count: 0, totalArea: 0, parcels: [] },
      livestock: { count: 0, totalArea: 0, totalHeads: 0, types: {}, parcels: [] },
      poultry: { count: 0, totalArea: 0, totalHeads: 0, types: {}, parcels: [] },
      agri_fisher: { count: 0, totalArea: 0, parcels: [] }
    };

    formData.farmParcels.forEach((parcel, index) => {
      if (parcel.commodities && parcel.commodities.length > 0) {
        parcel.commodities.forEach((commodity) => {
          const commodityType = commodity.commodity_type;
          if (commodityType && summary[commodityType]) {
            summary[commodityType].count++;
            summary[commodityType].totalArea += commodity.size_hectares || 0;
            summary[commodityType].parcels.push({ ...parcel, commodity, index });

            if (commodityType === 'livestock' && commodity.animal_type) {
              if (!summary.livestock.types[commodity.animal_type]) {
                summary.livestock.types[commodity.animal_type] = 0;
              }
              summary.livestock.types[commodity.animal_type] += commodity.number_of_heads || 0;
              summary.livestock.totalHeads += commodity.number_of_heads || 0;
            }

            if (commodityType === 'poultry' && commodity.animal_type) {
              if (!summary.poultry.types[commodity.animal_type]) {
                summary.poultry.types[commodity.animal_type] = 0;
              }
              summary.poultry.types[commodity.animal_type] += commodity.number_of_heads || 0;
              summary.poultry.totalHeads += commodity.number_of_heads || 0;
            }
          }
        });
      }
    });

    return summary;
  };

  const commoditySummary = getCommoditySummary();

  const getCommodityIcon = (commodity) => {
    switch (commodity) {
      case 'rice':
      case 'corn':
        return <GrainIcon fontSize="small" />;
      case 'hvc':
        return <LocalFloristIcon fontSize="small" />;
      case 'livestock':
        return <PetsIcon fontSize="small" />;
      case 'poultry':
        return <EggIcon fontSize="small" />;
      case 'agri_fisher':
        return <WaterIcon fontSize="small" />;
      default:
        return <CategoryIcon fontSize="small" />;
    }
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    const totalFields = 3; // Personal, Farm Profile, Farm Parcels
    let completedFields = 0;
    
    if (formData.beneficiaryDetails) completedFields++;
    if (formData.farmProfile) completedFields++;
    if (formData.farmParcels && formData.farmParcels.length > 0) completedFields++;
    
    return (completedFields / totalFields) * 100;
  };

  const completionPercentage = calculateCompletion();

  return (
    <Box sx={{ py: 3 }}>
      {/* Modern Header with Progress */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 3,
        p: 4,
        mb: 4,
        color: 'white',
        textAlign: 'center'
      }}>
        <Fade in timeout={800}>
          <Box>
            <Avatar sx={{ 
              width: 80, 
              height: 80, 
              mx: 'auto', 
              mb: 2,
              bgcolor: 'rgba(255,255,255,0.2)',
              border: '3px solid rgba(255,255,255,0.3)'
            }}>
              <AssessmentIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
              Review Your Application
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
              Final step before submitting your RSBSA registration
            </Typography>
            
            {/* Progress Bar */}
            <Box sx={{ maxWidth: 400, mx: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Completion</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {Math.round(completionPercentage)}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={completionPercentage} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'linear-gradient(90deg, #4caf50, #8bc34a)'
                  }
                }} 
              />
            </Box>
          </Box>
        </Fade>
      </Box>

      {/* Validation Status */}
      {hasErrors ? (
        <Zoom in timeout={600}>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4, 
              borderRadius: 3,
              '& .MuiAlert-icon': { fontSize: 32 }
            }}
          >
            <Typography variant="h6" gutterBottom>
              ⚠️ Please Fix the Following Issues
            </Typography>
            <List dense sx={{ mt: 2 }}>
              {Object.entries(errors).map(([field, error]) => (
                <ListItem key={field} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <WarningIcon color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={error}
                    secondary={`Field: ${field.replace(/\./g, ' → ')}`}
                  />
                </ListItem>
              ))}
            </List>
          </Alert>
        </Zoom>
      ) : (
        <Zoom in timeout={600}>
          <Alert 
            severity="success" 
            sx={{ 
              mb: 4, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #4caf50, #8bc34a)',
              color: 'white',
              '& .MuiAlert-icon': { fontSize: 32, color: 'white' }
            }}
          >
            <Typography variant="h6" gutterBottom>
              🎉 All Required Information Completed
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Your form is ready for submission. Review the details below and submit when ready.
            </Typography>
          </Alert>
        </Zoom>
      )}

      {/* Main Content with Stepper */}
      <Stepper orientation="vertical" sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Personal Information Step */}
        <Step active completed={!!formData.beneficiaryDetails}>
          <StepLabel 
            StepIconComponent={() => (
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                <PersonIcon fontSize="small" />
              </Avatar>
            )}
          >
            <Typography variant="h6" fontWeight="bold">
              Personal Information
            </Typography>
          </StepLabel>
          <StepContent>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    👤 Beneficiary Details
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(1)}
                    sx={{ 
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8, #6a4190)'
                      }
                    }}
                  >
                    Edit
                  </Button>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationIcon sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Location
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {formData.beneficiaryDetails?.barangay || 'Not provided'}, {formData.beneficiaryDetails?.municipality || 'Not provided'}, {formData.beneficiaryDetails?.province || 'Not provided'}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Contact Number
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {formData.beneficiaryDetails?.contact_number || 'Not provided'}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CakeIcon sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Birth Date
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {formatDate(formData.beneficiaryDetails?.birth_date)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <VerifiedIcon sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Civil Status
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {formatEnum(formData.beneficiaryDetails?.civil_status)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <SchoolIcon sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Education
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {formatEnum(formData.beneficiaryDetails?.highest_education)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AccessibilityIcon sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          PWD Status
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {formatBoolean(formData.beneficiaryDetails?.is_pwd)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </StepContent>
        </Step>

        {/* Farm Profile Step */}
        <Step active completed={!!formData.farmProfile}>
          <StepLabel 
            StepIconComponent={() => (
              <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                <AgricultureIcon fontSize="small" />
              </Avatar>
            )}
          >
            <Typography variant="h6" fontWeight="bold">
              Farm Profile & Livelihood
            </Typography>
          </StepLabel>
          <StepContent>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" color="success.main" fontWeight="bold">
                    🌾 Farm Activities & Livelihood
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(2)}
                    sx={{ 
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #4caf50, #8bc34a)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #43a047, #7cb342)'
                      }
                    }}
                  >
                    Edit
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  {/* Livelihood Category */}
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="success.dark">
                        Primary Livelihood: {formData.farmProfile?.livelihood_category_id || 'Not selected'}
                      </Typography>
                    </Paper>
                  </Grid>

                  {/* Activity Categories */}
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 2, bgcolor: 'background.default' }}>
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle2" gutterBottom color="primary" fontWeight="bold">
                          🚜 Farmer Activities
                        </Typography>
                        <List dense>
                          {[
                            { key: 'rice', label: 'Rice Production' },
                            { key: 'corn', label: 'Corn Production' },
                            { key: 'other_crops', label: 'Other Crops' },
                            { key: 'livestock', label: 'Livestock' },
                            { key: 'poultry', label: 'Poultry' }
                          ].map((activity) => (
                            <ListItem key={activity.key} sx={{ py: 0.5 }}>
                              <ListItemIcon>
                                <CheckCircleIcon 
                                  color={formData.farmerActivities?.[activity.key] ? 'success' : 'disabled'} 
                                  fontSize="small" 
                                />
                              </ListItemIcon>
                              <ListItemText 
                                primary={activity.label}
                                secondary={formData.farmerActivities?.[activity.key] ? 'Active' : 'Not Active'}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 2, bgcolor: 'background.default' }}>
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle2" gutterBottom color="primary" fontWeight="bold">
                          🎣 Fishing Activities
                        </Typography>
                        <List dense>
                          {[
                            { key: 'fish_capture', label: 'Fish Capture' },
                            { key: 'aquaculture', label: 'Aquaculture' },
                            { key: 'seaweed_farming', label: 'Seaweed Farming' },
                            { key: 'gleaning', label: 'Gleaning' },
                            { key: 'fish_processing', label: 'Fish Processing' }
                          ].map((activity) => (
                            <ListItem key={activity.key} sx={{ py: 0.5 }}>
                              <ListItemIcon>
                                <CheckCircleIcon 
                                  color={formData.fisherfolkActivities?.[activity.key] ? 'success' : 'disabled'} 
                                  fontSize="small" 
                                />
                              </ListItemIcon>
                              <ListItemText 
                                primary={activity.label}
                                secondary={formData.fisherfolkActivities?.[activity.key] ? 'Active' : 'Not Active'}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </StepContent>
        </Step>

        {/* Farm Parcels Step */}
        <Step active completed={formData.farmParcels && formData.farmParcels.length > 0}>
          <StepLabel 
            StepIconComponent={() => (
              <Avatar sx={{ bgcolor: 'warning.main', width: 32, height: 32 }}>
                <LandscapeIcon fontSize="small" />
              </Avatar>
            )}
          >
            <Typography variant="h6" fontWeight="bold">
              Farm Parcels & Commodities
            </Typography>
          </StepLabel>
          <StepContent>
            {formData.farmParcels.length === 0 ? (
              <Alert severity="warning" sx={{ borderRadius: 3 }}>
                <Typography variant="body1">
                  No farm parcels added. At least one parcel is required.
                </Typography>
              </Alert>
            ) : (
              <Card sx={{ 
                borderRadius: 3, 
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" color="warning.main" fontWeight="bold">
                      🏞️ Farm Parcels ({formData.farmParcels.length})
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => onEdit(3)}
                      sx={{ 
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #ff9800, #ffc107)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #f57c00, #ffb300)'
                        }
                      }}
                    >
                      Edit
                    </Button>
                  </Box>

                  {/* Summary Cards */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {Object.entries(commoditySummary).map(([commodity, data]) => {
                      if (data.count === 0) return null;
                      
                      return (
                        <Grid item xs={12} sm={6} md={4} key={commodity}>
                          <Card sx={{ 
                            borderRadius: 2, 
                            bgcolor: 'background.default',
                            border: '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                              transform: 'translateY(-2px)',
                              transition: 'all 0.3s ease'
                            }
                          }}>
                            <CardContent sx={{ p: 2, textAlign: 'center' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                                {getCommodityIcon(commodity)}
                              </Box>
                              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                {formatEnum(commodity)}
                              </Typography>
                              <Typography variant="h6" color="primary" fontWeight="bold">
                                {data.count}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Parcels
                              </Typography>
                              <Typography variant="body2" fontWeight="medium" sx={{ mt: 1 }}>
                                {data.totalArea.toFixed(2)} ha
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>

                  {/* Total Summary */}
                  <Paper sx={{ 
                    p: 3, 
                    bgcolor: 'primary.light', 
                    color: 'primary.contrastText',
                    borderRadius: 3,
                    textAlign: 'center'
                  }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      📊 Total Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={3}>
                        <Typography variant="h4" fontWeight="bold">
                          {formData.farmParcels.length}
                        </Typography>
                        <Typography variant="body2">Total Parcels</Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="h4" fontWeight="bold">
                          {formData.farmParcels.reduce((sum, parcel) => sum + (parcel.total_farm_area || 0), 0).toFixed(2)}
                        </Typography>
                        <Typography variant="body2">Total Area (ha)</Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="h4" fontWeight="bold">
                          {commoditySummary.livestock.totalHeads}
                        </Typography>
                        <Typography variant="body2">Livestock Heads</Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="h4" fontWeight="bold">
                          {commoditySummary.poultry.totalHeads}
                        </Typography>
                        <Typography variant="body2">Poultry Heads</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </CardContent>
              </Card>
            )}
          </StepContent>
        </Step>
      </Stepper>

      {/* Final Submission Card */}
      <Fade in timeout={1000}>
        <Card sx={{ 
          mt: 4, 
          borderRadius: 3, 
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          textAlign: 'center',
          p: 4
        }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            📋 Review Complete
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            All information has been reviewed. Proceed to the next step to submit your application.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="large"
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Save Draft
            </Button>
            <Button
              variant="contained"
              size="large"
              disabled
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'not-allowed'
              }}
            >
              Proceed to Submit
            </Button>
          </Box>
        </Card>
      </Fade>
    </Box>
  );
};

export default ReviewSection;