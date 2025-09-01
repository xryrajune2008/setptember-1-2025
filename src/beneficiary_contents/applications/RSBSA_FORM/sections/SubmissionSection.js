import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress
} from '@mui/material';
import {
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
  Schedule as ScheduleIcon,
  ContactSupport as ContactSupportIcon
} from '@mui/icons-material';

const SubmissionSection = ({ formData, isSubmitting, onSubmit, canSubmit, errors = {}, backendErrors = {} }) => {
  // Combined safety check for formData
  if (!formData?.beneficiaryDetails) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {!formData ? 'Form data is not available. Please refresh the page.' : 'Beneficiary details are not loaded yet. Please wait or refresh the page.'}
        </Typography>
      </Box>
    );
  }

  // Helper function to get commodity summary
  const getCommoditySummary = () => {
    const summary = {
      rice: 0,
      corn: 0,
      hvc: 0,
      livestock: 0,
      poultry: 0,
      agri_fisher: 0
    };
    
    formData.farmParcels?.forEach(parcel => {
      parcel.commodities?.forEach(commodity => {
        if (commodity.commodity_type && summary[commodity.commodity_type] !== undefined) {
          summary[commodity.commodity_type]++;
        }
      });
    });
    
    return summary;
  };

  // Helper function to get total farm area
  const getTotalFarmArea = () => {
    return formData.farmParcels?.reduce((sum, parcel) => 
      sum + (parcel.total_farm_area || 0), 0
    ) || 0;
  };

  const submissionSteps = [
    {
      icon: <SecurityIcon color="primary" />,
      title: 'Data Validation',
      description: 'Your information will be validated for completeness and accuracy'
    },
    {
      icon: <SendIcon color="primary" />,
      title: 'Form Submission',
      description: 'Your RSBSA application will be submitted to the system'
    },
    {
      icon: <ScheduleIcon color="primary" />,
      title: 'Processing',
      description: 'Your application will be queued for review and verification'
    },
    {
      icon: <CheckCircleIcon color="primary" />,
      title: 'Confirmation',
      description: 'You will receive a reference number for tracking'
    }
  ];

  const nextSteps = [
    'Your application will be reviewed by DA personnel',
    'You may be contacted for additional information or documents',
    'Site validation may be conducted for farm parcels',
    'You will be notified of your application status',
    'Upon approval, you will receive your RSBSA number'
  ];

  const commoditySummary = getCommoditySummary();
  const totalFarmArea = getTotalFarmArea();

  // Debug function to check form completeness
  const getFormCompleteness = () => {
    const checks = {
      'Beneficiary Details': {
        'Contact Number': !!formData.beneficiaryDetails?.contact_number,
        'Barangay': !!formData.beneficiaryDetails?.barangay,
        'Birth Date': !!formData.beneficiaryDetails?.birth_date,
        'Sex': !!formData.beneficiaryDetails?.sex,
        'Municipality': !!formData.beneficiaryDetails?.municipality,
        'Province': !!formData.beneficiaryDetails?.province,
        'Region': !!formData.beneficiaryDetails?.region,
      },
      'Farm Profile': {
        'Livelihood Category': !!formData.farmProfile?.livelihood_category_id,
      },
      'Farm Parcels': {
        'At least one parcel': formData.farmParcels?.length > 0,
        'Parcel details': formData.farmParcels?.every(parcel => 
          parcel.barangay && parcel.tenure_type && parcel.total_farm_area > 0
        ),
        'Commodities': formData.farmParcels?.every(parcel => 
          parcel.commodities?.length > 0
        ),
      }
    };
    return checks;
  };

  const formCompleteness = getFormCompleteness();

  return (
    <Box>
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <SendIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" component="h2" fontWeight="bold" color="primary">
            Submit Application
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review the submission process and submit your RSBSA registration
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Submission Process Card */}
        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Submission Process
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {/* Process Steps */}
              <Box sx={{ mb: 4 }}>
                {submissionSteps.map((step, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                    <Box sx={{ mr: 2, mt: 0.5 }}>
                      {step.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Submission Status */}
              {isSubmitting && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" gutterBottom>
                    Submitting your application...
                  </Typography>
                  <LinearProgress sx={{ borderRadius: 2 }} />
                </Box>
              )}

              {/* Submit Button */}
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  onClick={onSubmit}
                  disabled={!canSubmit || isSubmitting}
                  sx={{ 
                    minWidth: 200,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit RSBSA Application'}
                </Button>
              </Box>

              {/* Validation Errors Display */}
              {!canSubmit && !isSubmitting && (
                <Box sx={{ mt: 2 }}>
                  <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Form Validation Failed
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Please fix the following errors before submitting:
                    </Typography>
                    
                    {/* Display validation errors */}
                    {Object.keys(errors).length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                          Validation Errors:
                        </Typography>
                        <List dense>
                          {Object.entries(errors).map(([field, error]) => (
                            <ListItem key={field} sx={{ py: 0.5 }}>
                              <ListItemIcon>
                                <Typography variant="body2" color="error" fontWeight="bold">
                                  •
                                </Typography>
                              </ListItemIcon>
                              <ListItemText 
                                primary={
                                  <Typography variant="body2" color="error">
                                    <strong>{field.replace(/\./g, ' → ')}:</strong> {Array.isArray(error) ? error.join(', ') : error}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    {/* Display backend errors */}
                    {Object.keys(backendErrors).length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                          System Errors:
                        </Typography>
                        <List dense>
                          {Object.entries(backendErrors).map(([field, error]) => (
                            <ListItem key={field} sx={{ py: 0.5 }}>
                              <ListItemIcon>
                                <Typography variant="body2" color="error" fontWeight="bold">
                                  •
                                </Typography>
                              </ListItemIcon>
                              <ListItemText 
                                primary={
                                  <Typography variant="body2" color="error">
                                    <strong>{field}:</strong> {Array.isArray(error) ? error.join(', ') : error}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    {/* Form Completeness Debug */}
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'blue.50', borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                        Form Completeness Check:
                      </Typography>
                      
                      {/* Specific check for livelihood category */}
                      {!formData.farmProfile?.livelihood_category_id && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                          <Typography variant="body2">
                            <strong>⚠️ Livelihood Category Required:</strong> Please go to Step 2 (Farm Profile) and select your primary livelihood category.
                          </Typography>
                        </Alert>
                      )}
                      
                      {Object.entries(formCompleteness).map(([section, checks]) => (
                        <Box key={section} sx={{ mb: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {section}:
                          </Typography>
                          {Object.entries(checks).map(([check, status]) => (
                            <Typography key={check} variant="body2" sx={{ ml: 2, color: status ? 'success.main' : 'error.main' }}>
                              {status ? '✅' : '❌'} {check}
                            </Typography>
                          ))}
                        </Box>
                      ))}
                    </Box>

                    {/* Quick fix suggestions */}
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                        Quick Fix Suggestions:
                      </Typography>
                      <Typography variant="body2" component="div">
                        • Go back to previous steps to complete missing required fields
                        <br />
                        • Ensure all contact information is provided
                        <br />
                        • Add at least one farm parcel with commodities
                        <br />
                        • Select a livelihood category in the Farm Profile section
                        <br />
                        • Verify all dates are valid and not in the future
                      </Typography>
                    </Box>
                  </Alert>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Application Summary Card */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderRadius: 2, backgroundColor: 'background.default' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Application Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Beneficiary:</strong> {formData.beneficiaryDetails?.contact_number || 'Not provided'}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Location:</strong> {formData.beneficiaryDetails?.barangay || 'Not provided'}, {formData.beneficiaryDetails?.municipality || 'Not provided'}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Farm Parcels:</strong> {formData.farmParcels?.length || 0} parcel(s)
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Total Area:</strong> {totalFarmArea.toFixed(2)} hectares
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Crop/Commodity Summary:</strong>
                </Typography>
                <Box sx={{ ml: 2, mt: 0.5 }}>
                  {Object.entries(commoditySummary).map(([commodity, count]) => 
                    count > 0 && (
                      <Typography key={commodity} variant="body2" color="text.secondary">
                        • {commodity.charAt(0).toUpperCase() + commodity.slice(1).replace('_', ' ')}: {count} commodity(ies)
                      </Typography>
                    )
                  )}
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Livelihood Category:</strong> {formData.farmProfile?.livelihood_category_id ? `ID: ${formData.farmProfile.livelihood_category_id}` : 'Not selected'}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Current Status:</strong> Pending Submission
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* After Submission Information */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon sx={{ mr: 1 }} />
                What Happens After Submission?
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                    Next Steps in the Process:
                  </Typography>
                  <List>
                    {nextSteps.map((step, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon>
                          <Typography variant="body2" color="primary" fontWeight="bold">
                            {index + 1}.
                          </Typography>
                        </ListItemIcon>
                        <ListItemText 
                          primary={step}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                    Need Help?
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ContactSupportIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      Contact your local DA office for assistance
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Processing time: 5-10 working days
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Important Notes */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Important Reminders
            </Typography>
            <Typography variant="body2" paragraph>
              • Keep your reference number safe for tracking your application status
            </Typography>
            <Typography variant="body2" paragraph>
              • Ensure your contact information is correct as you may be contacted for verification
            </Typography>
            <Typography variant="body2" paragraph>
              • Have your supporting documents ready in case they are requested
            </Typography>
            <Typography variant="body2">
              • Your information is protected under the Data Privacy Act of 2012
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubmissionSection;