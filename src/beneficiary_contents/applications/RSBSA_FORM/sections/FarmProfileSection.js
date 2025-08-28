/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  FormControlLabel,
  Switch,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Tab,
  Tabs,
  Collapse,
  IconButton,
  Alert
} from '@mui/material';
import {
  Agriculture as AgricultureIcon,
  Phishing as FishIcon,
  Build as WrenchIcon,
  School as GraduationCapIcon,
  ExpandMore as ChevronDownIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const FarmProfileSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    farmerDetails: {
      is_rice_production: false,
      is_corn_production: false,
      is_other_crops: false,
      is_livestock_raising: false,
      is_poultry_raising: false
    },
    fisherfolkDetails: {
      is_fish_capture: false,
      is_aquaculture: false,
      is_fish_processing: false
    },
    farmworkerDetails: {
      is_land_preparation: false,
      is_cultivation: false,
      is_harvesting: false
    },
    agriYouthDetails: {
      is_agri_youth: false
    }
  });

  const [expandedSections, setExpandedSections] = useState({
    crops: true,
    livestock: true
  });

  // Debug log
  useEffect(() => {
    console.log('Form Data Updated:', formData);
  }, [formData]);

  const updateField = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Collapsible wrapper
  const CollapsibleSection = ({ title, icon: Icon, isExpanded, onToggle, children }) => (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        mb: 4,
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.08)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.12)'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          cursor: 'pointer',
          background: isExpanded
            ? 'linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
        }}
        onClick={onToggle}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              p: 1.5,
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
            }}
          >
            <Icon sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Typography variant="h5" fontWeight="700" color="primary">
            {title}
          </Typography>
        </Box>
        <IconButton
          sx={{
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            backgroundColor: 'rgba(25, 118, 210, 0.08)'
          }}
        >
          <ChevronDownIcon sx={{ color: 'primary.main' }} />
        </IconButton>
      </Box>
      <Collapse in={isExpanded}>
        <Divider />
        <CardContent sx={{ p: 4 }}>
          {children}
        </CardContent>
      </Collapse>
    </Card>
  );

  // SwitchField
  const SwitchField = ({ label, description, checked, onChange }) => (
    <Card
      variant="outlined"
      sx={{
        p: 3,
        background: checked
          ? 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
        border: checked ? '2px solid #4caf50' : '1px solid rgba(0,0,0,0.12)',
        borderRadius: 2
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={onChange}
            color="primary"
          />
        }
        label={
          <Box sx={{ ml: 1 }}>
            <Typography variant="body1" fontWeight="700">
              {label}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>
        }
        sx={{ m: 0, width: '100%' }}
      />
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 3 }}>
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 4,
            p: 5,
            mb: 4,
            color: 'white'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box
              sx={{
                p: 2,
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: 3
              }}
            >
              <AgricultureIcon sx={{ fontSize: 48 }} />
            </Box>
            <Box>
              <Typography variant="h3" fontWeight="800">
                Farm Profile & Livelihood
              </Typography>
              <Typography variant="h6">
                Build your comprehensive agricultural activity profile
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Info Alert */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="subtitle2" fontWeight="600">
            Multi-Category Profile
          </Typography>
          <Typography variant="body2">
            Select multiple categories that apply to your activities.
          </Typography>
        </Alert>

        {/* Tabs */}
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
              <Tab icon={<AgricultureIcon />} label="Farmer" iconPosition="start" />
              <Tab icon={<FishIcon />} label="Fisherfolk" iconPosition="start" />
              <Tab icon={<WrenchIcon />} label="Farmworker" iconPosition="start" />
              <Tab icon={<GraduationCapIcon />} label="Agri Youth" iconPosition="start" />
            </Tabs>
          </Box>

          <Box sx={{ p: 4 }}>
            {/* Farmer */}
            {activeTab === 0 && (
              <Box>
                <CollapsibleSection
                  title="Crop Production"
                  icon={AgricultureIcon}
                  isExpanded={expandedSections.crops}
                  onToggle={() => toggleSection('crops')}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <SwitchField
                        label="Rice Production"
                        description="Cultivating rice varieties"
                        checked={formData.farmerDetails.is_rice_production}
                        onChange={() =>
                          updateField(
                            'farmerDetails',
                            'is_rice_production',
                            !formData.farmerDetails.is_rice_production
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <SwitchField
                        label="Corn Production"
                        description="Growing corn/maize crops"
                        checked={formData.farmerDetails.is_corn_production}
                        onChange={() =>
                          updateField(
                            'farmerDetails',
                            'is_corn_production',
                            !formData.farmerDetails.is_corn_production
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <SwitchField
                        label="Other Crops"
                        description="Vegetables, fruits, root crops"
                        checked={formData.farmerDetails.is_other_crops}
                        onChange={() =>
                          updateField(
                            'farmerDetails',
                            'is_other_crops',
                            !formData.farmerDetails.is_other_crops
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </CollapsibleSection>

                <CollapsibleSection
                  title="Livestock & Poultry"
                  icon={AgricultureIcon}
                  isExpanded={expandedSections.livestock}
                  onToggle={() => toggleSection('livestock')}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <SwitchField
                        label="Livestock Raising"
                        description="Cattle, goats, swine"
                        checked={formData.farmerDetails.is_livestock_raising}
                        onChange={() =>
                          updateField(
                            'farmerDetails',
                            'is_livestock_raising',
                            !formData.farmerDetails.is_livestock_raising
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SwitchField
                        label="Poultry Raising"
                        description="Chickens, ducks"
                        checked={formData.farmerDetails.is_poultry_raising}
                        onChange={() =>
                          updateField(
                            'farmerDetails',
                            'is_poultry_raising',
                            !formData.farmerDetails.is_poultry_raising
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </CollapsibleSection>
              </Box>
            )}

            {/* Fisherfolk */}
            {activeTab === 1 && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Fishing Activities
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <SwitchField
                        label="Fish Capture"
                        description="Ocean, river, lake"
                        checked={formData.fisherfolkDetails.is_fish_capture}
                        onChange={() =>
                          updateField(
                            'fisherfolkDetails',
                            'is_fish_capture',
                            !formData.fisherfolkDetails.is_fish_capture
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <SwitchField
                        label="Aquaculture"
                        description="Fish farming"
                        checked={formData.fisherfolkDetails.is_aquaculture}
                        onChange={() =>
                          updateField(
                            'fisherfolkDetails',
                            'is_aquaculture',
                            !formData.fisherfolkDetails.is_aquaculture
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <SwitchField
                        label="Fish Processing"
                        description="Drying, smoking"
                        checked={formData.fisherfolkDetails.is_fish_processing}
                        onChange={() =>
                          updateField(
                            'fisherfolkDetails',
                            'is_fish_processing',
                            !formData.fisherfolkDetails.is_fish_processing
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}

            {/* Farmworker */}
            {activeTab === 2 && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Farm Work Specialization
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <SwitchField
                        label="Land Preparation"
                        description="Plowing, tilling"
                        checked={formData.farmworkerDetails.is_land_preparation}
                        onChange={() =>
                          updateField(
                            'farmworkerDetails',
                            'is_land_preparation',
                            !formData.farmworkerDetails.is_land_preparation
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <SwitchField
                        label="Cultivation"
                        description="Planting, weeding"
                        checked={formData.farmworkerDetails.is_cultivation}
                        onChange={() =>
                          updateField(
                            'farmworkerDetails',
                            'is_cultivation',
                            !formData.farmworkerDetails.is_cultivation
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <SwitchField
                        label="Harvesting"
                        description="Crop gathering"
                        checked={formData.farmworkerDetails.is_harvesting}
                        onChange={() =>
                          updateField(
                            'farmworkerDetails',
                            'is_harvesting',
                            !formData.farmworkerDetails.is_harvesting
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}

            {/* Agri Youth */}
            {activeTab === 3 && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Youth Agricultural Engagement
                  </Typography>
                  <SwitchField
                    label="I am an Agri-Youth"
                    description="Youth (18-30) involved in agriculture"
                    checked={formData.agriYouthDetails.is_agri_youth}
                    onChange={() =>
                      updateField(
                        'agriYouthDetails',
                        'is_agri_youth',
                        !formData.agriYouthDetails.is_agri_youth
                      )
                    }
                  />

                  {formData.agriYouthDetails.is_agri_youth && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      <CheckCircleIcon fontSize="small" /> Welcome, Agri-Youth! 🌱
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default FarmProfileSection;
