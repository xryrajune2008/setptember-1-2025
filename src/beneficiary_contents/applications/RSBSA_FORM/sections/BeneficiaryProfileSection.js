import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  FormHelperText,
  Chip,
  Alert
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const BeneficiaryProfileSection = ({ formData, errors, updateField }) => {
  // Ensure defaults - Note: Name fields come from users table, not here
  const beneficiaryDetails = {
    contact_number: '',
    emergency_contact_number: '',
    birth_date: '',
    sex: '',
    place_of_birth: '',
    barangay: '',
    municipality: '',
    province: '',
    region: '',
    civil_status: '',
    name_of_spouse: '',
    highest_education: '',
    religion: '',
    pwd: false,
    has_government_id: 'no',
    gov_id_type: '',
    gov_id_number: '',
    is_association_member: 'no',
    association_name: '',
    mothers_maiden_name: '',
    is_household_head: false,
    household_head_name: '',
    ...formData // ✅ merge parent formData
  };

  // Options
  const civilStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'separated', label: 'Separated' },
    { value: 'divorced', label: 'Divorced' }
  ];

  const educationOptions = [
    { value: 'None', label: 'None' },
    { value: 'Pre-school', label: 'Pre-school' },
    { value: 'Elementary', label: 'Elementary' },
    { value: 'Junior High School', label: 'Junior High School' },
    { value: 'Senior High School', label: 'Senior High School' },
    { value: 'Vocational', label: 'Vocational' },
    { value: 'College', label: 'College' },
    { value: 'Post Graduate', label: 'Post Graduate' }
  ];

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];



  const barangayOptions = [
    'Bagocboc', 'Barra', 'Bonbon', 'Buruanga', 'Cabadiangan', 'Camaman-an',
    'Gotokan', 'Igpit', 'Limbaybay', 'Lower Olave', 'Lumbia', 'Malitbog',
    'Mapayag', 'Napaliran', 'Opol Poblacion', 'Patag', 'Pontod', 'San Vicente',
    'Tingalan', 'Taboc', 'Talakag', 'Upper Olave'
  ];

  const governmentIdOptions = [
    { value: 'philsys', label: 'PhilSys (National ID)' },
    { value: 'sss', label: 'SSS' },
    { value: 'gsis', label: 'GSIS' },
    { value: 'passport', label: 'Passport' },
    { value: 'drivers_license', label: "Driver's License" },
    { value: 'voters_id', label: "Voter's ID" },
    { value: 'postal_id', label: 'Postal ID' },
    { value: 'umid', label: 'UMID' }
  ];

  const handleFieldChange = (field, value) => {
    updateField(field, value); // ✅ parent scopes beneficiaryProfile
  };

  return (
    <Box>
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <PersonIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" component="h2" fontWeight="bold" color="primary">
            Personal Information
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please provide your personal details as they appear in your valid IDs
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                color="primary"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                Basic Information
                <Chip label="Required" color="error" size="small" sx={{ ml: 2 }} />
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {/* User Name Display (Read-only from users table) */}
                <Grid item xs={12}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>Name Information:</strong> Your name is already registered in your account. 
                      If you need to update your name, please contact the administrator.
                    </Typography>
                  </Alert>
                </Grid>

                {/* Contact Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact Number *"
                    value={beneficiaryDetails.contact_number}
                    onChange={(e) => handleFieldChange('contact_number', e.target.value)}
                                      error={!!errors['beneficiaryDetails.contact_number']}
                  helperText={errors['beneficiaryDetails.contact_number'] || 'Format: 09XXXXXXXXX'}
                    placeholder="09XXXXXXXXX"
                  />
                </Grid>

                {/* Emergency Contact */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Emergency Contact Number"
                    value={beneficiaryDetails.emergency_contact_number}
                    onChange={(e) => handleFieldChange('emergency_contact_number', e.target.value)}
                    error={!!errors['beneficiaryDetails.emergency_contact_number']}
                    helperText={errors['beneficiaryDetails.emergency_contact_number'] || 'Format: 09XXXXXXXXX'}
                    placeholder="09XXXXXXXXX"
                  />
                </Grid>

                {/* Birth Date */}
                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Birth Date *"
                      value={beneficiaryDetails.birth_date ? (() => {
                        const date = new Date(beneficiaryDetails.birth_date);
                        return !Number.isNaN(date.getTime()) ? date : null;
                      })() : null}
                      onChange={(date) => {
                        // Handle date change with proper validation
                        if (date && !Number.isNaN(date.getTime())) {
                          // Valid date - convert to YYYY-MM-DD format
                          const year = date.getFullYear();
                          const month = String(date.getMonth() + 1).padStart(2, '0');
                          const day = String(date.getDate()).padStart(2, '0');
                          const formattedDate = `${year}-${month}-${day}`;
                          handleFieldChange('birth_date', formattedDate);
                        } else if (date === null) {
                          // Date cleared
                          handleFieldChange('birth_date', '');
                        }
                        // Invalid date - do nothing (don't update the field)
                      }}
                      maxDate={new Date()} // 🚀 Prevent future dates
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!errors['beneficiaryDetails.birth_date']}
                          helperText={errors['beneficiaryDetails.birth_date'] || 'Format: YYYY-MM-DD'}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                {/* Sex */}
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth error={!!errors['beneficiaryDetails.sex']}>
                    <InputLabel>Sex *</InputLabel>
                    <Select
                      value={beneficiaryDetails.sex}
                      onChange={(e) => handleFieldChange('sex', e.target.value)}
                      label="Sex *"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                    {errors['beneficiaryDetails.sex'] && (
                      <FormHelperText>{errors['beneficiaryDetails.sex']}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/* Place of Birth */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Place of Birth"
                    value={beneficiaryDetails.place_of_birth}
                    onChange={(e) => handleFieldChange('place_of_birth', e.target.value)}
                    error={!!errors['beneficiaryDetails.place_of_birth']}
                    helperText={errors['beneficiaryDetails.place_of_birth'] || 'City, Province'}
                    placeholder="City, Province"
                  />
                </Grid>

                {/* Barangay */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors['beneficiaryDetails.barangay']}>
                    <InputLabel>Barangay *</InputLabel>
                    <Select
                      value={beneficiaryDetails.barangay}
                      onChange={(e) => handleFieldChange('barangay', e.target.value)}
                      label="Barangay *"
                    >
                      {barangayOptions.map((barangay) => (
                        <MenuItem key={barangay} value={barangay}>
                          {barangay}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors['beneficiaryDetails.barangay'] && (
                      <FormHelperText>{errors['beneficiaryDetails.barangay']}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/* Municipality */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Municipality *"
                    value="Opol"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Province */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Province *"
                    value="Misamis Oriental"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                {/* Civil Status */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors['beneficiaryDetails.civil_status']}>
                    <InputLabel>Civil Status *</InputLabel>
                    <Select
                      value={beneficiaryDetails.civil_status}
                      onChange={(e) => handleFieldChange('civil_status', e.target.value)}
                      label="Civil Status *"
                    >
                      {civilStatusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors['beneficiaryDetails.civil_status'] && (
                      <FormHelperText>{errors['beneficiaryDetails.civil_status']}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/* Spouse */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name of Spouse"
                    value={beneficiaryDetails.name_of_spouse}
                    onChange={(e) => handleFieldChange('name_of_spouse', e.target.value)}
                    placeholder="Enter spouse name"
                    disabled={beneficiaryDetails.civil_status === 'single'}
                    helperText={
                      beneficiaryDetails.civil_status === 'single'
                        ? 'Not applicable for Single'
                        : ''
                    }
                  />
                </Grid>

                {/* Education */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Highest Educational Attainment</InputLabel>
                    <Select
                      value={beneficiaryDetails.highest_education}
                      onChange={(e) => handleFieldChange('highest_education', e.target.value)}
                      label="Highest Educational Attainment"
                    >
                      {educationOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Religion */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Religion"
                    value={beneficiaryDetails.religion}
                    onChange={(e) => handleFieldChange('religion', e.target.value)}
                    placeholder="e.g., Catholic, Protestant, Islam"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Information */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Additional Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {/* PWD - Full width row */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!beneficiaryDetails.pwd}
                        onChange={(e) => handleFieldChange('pwd', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Person with Disability (PWD)"
                  />
                </Grid>

                {/* Government ID Fields */}
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Has Government ID *</InputLabel>
                    <Select
                      value={beneficiaryDetails.has_government_id}
                      onChange={(e) => handleFieldChange('has_government_id', e.target.value)}
                      label="Has Government ID *"
                    >
                      {yesNoOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth disabled={beneficiaryDetails.has_government_id === 'no'}>
                    <InputLabel>Government ID Type *</InputLabel>
                    <Select
                      value={beneficiaryDetails.gov_id_type}
                      onChange={(e) => handleFieldChange('gov_id_type', e.target.value)}
                      label="Government ID Type *"
                    >
                      {governmentIdOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Government ID Number *"
                    value={beneficiaryDetails.gov_id_number}
                    onChange={(e) => handleFieldChange('gov_id_number', e.target.value)}
                    placeholder="Enter ID number"
                    disabled={beneficiaryDetails.has_government_id === 'no'}
                  />
                </Grid>

                {/* Association */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Member of Association</InputLabel>
                    <Select
                      value={beneficiaryDetails.is_association_member}
                      onChange={(e) => handleFieldChange('is_association_member', e.target.value)}
                      label="Member of Association"
                    >
                      {yesNoOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Association Name"
                    value={beneficiaryDetails.association_name}
                    onChange={(e) => handleFieldChange('association_name', e.target.value)}
                    placeholder="Enter association name"
                    disabled={beneficiaryDetails.is_association_member === 'no'}
                  />
                </Grid>

                {/* Mother's Maiden Name & Household Head */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mother's Maiden Name"
                    value={beneficiaryDetails.mothers_maiden_name}
                    onChange={(e) => handleFieldChange('mothers_maiden_name', e.target.value)}
                    placeholder="Enter mother's maiden name"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', height: '56px' }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={!!beneficiaryDetails.is_household_head}
                          onChange={(e) => handleFieldChange('is_household_head', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Head of Household"
                    />
                  </Box>
                </Grid>

                {!beneficiaryDetails.is_household_head && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Household Head Name"
                      value={beneficiaryDetails.household_head_name}
                      onChange={(e) => handleFieldChange('household_head_name', e.target.value)}
                      placeholder="Enter household head name"
                    />
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BeneficiaryProfileSection;
