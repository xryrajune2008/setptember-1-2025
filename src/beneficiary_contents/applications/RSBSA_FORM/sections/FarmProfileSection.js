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
  Alert,
  Tabs,
  Tab,
  Chip
} from '@mui/material';
import {
  Agriculture as AgricultureIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  WaterDrop as WaterDropIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const FarmProfileSection = ({ formData, errors, updateField }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  // Initialize livelihood categories locally
  const livelihoodCategories = [
    { id: 1, category_name: 'Farmer', icon: <AgricultureIcon /> },
    { id: 2, category_name: 'Farmworker', icon: <WorkIcon /> },
    { id: 3, category_name: 'Fisherfolk', icon: <WaterDropIcon /> },
    { id: 4, category_name: 'Agri-Youth', icon: <SchoolIcon /> }
  ];

  // Initialize form data structure if not exists
  useEffect(() => {
    if (!formData.farmProfile) {
      updateField('farmProfile', 'livelihood_category_id', null);
    }
    if (!formData.farmerActivities) {
      updateField('farmerActivities', {});
    }
    if (!formData.farmworkerActivities) {
      updateField('farmworkerActivities', {});
    }
    if (!formData.fisherfolkActivities) {
      updateField('fisherfolkActivities', {});
    }
    if (!formData.agriYouthActivities) {
      updateField('agriYouthActivities', {});
    }
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const categoryId = livelihoodCategories[newValue].id;
    updateField('farmProfile', 'livelihood_category_id', categoryId);

    // 🔥 Console log tab switch
    console.log(
      `Switched to tab: ${livelihoodCategories[newValue].category_name} (index: ${newValue}, id: ${categoryId})`
    );
  };

  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = livelihoodCategories.find((cat) => cat.id === categoryId);
    return category ? category.category_name : '';
  };

  // SwitchField component
  const SwitchField = ({ label, description, checked, onChange }) => {
    const handleChange = (e) => {
      onChange(e);
      // 🔥 Console log toggle change
      console.log(`Toggled "${label}" → ${!checked}`);
    };

    return (
      <Card
        variant="outlined"
        sx={{
          p: 3,
          background: checked
            ? 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)'
            : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
          border: checked ? '2px solid #4caf50' : '1px solid rgba(0,0,0,0.12)',
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onClick={handleChange}
      >
        <FormControlLabel
          control={
            <Switch checked={checked} onChange={handleChange} color="primary" />
          }
          label={
            <Box sx={{ ml: 1 }}>
              <Typography variant="body1" fontWeight="600">
                {label}
              </Typography>
              {description && (
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              )}
            </Box>
          }
          sx={{ m: 0, width: '100%', pointerEvents: 'none' }}
        />
      </Card>
    );
  };

  // Farmer Activities (Tab Index: 0)
  const renderFarmerActivities = () => (
    <Box>
      <Typography
        variant="h6"
        fontWeight="600"
        sx={{ mb: 3, color: 'primary.main' }}
      >
        What crops do you grow?
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SwitchField
            label="Rice"
            description="Cultivating rice varieties"
            checked={formData.farmerActivities?.rice || false}
            onChange={() =>
              updateField(
                'farmerActivities',
                'rice',
                !formData.farmerActivities?.rice
              )
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SwitchField
            label="Corn"
            description="Growing corn/maize crops"
            checked={formData.farmerActivities?.corn || false}
            onChange={() =>
              updateField(
                'farmerActivities',
                'corn',
                !formData.farmerActivities?.corn
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SwitchField
            label="Vegetables"
            description="Leafy greens, root crops, etc."
            checked={formData.farmerActivities?.vegetables || false}
            onChange={() =>
              updateField(
                'farmerActivities',
                'vegetables',
                !formData.farmerActivities?.vegetables
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SwitchField
            label="Fruits"
            description="Fruit trees and bushes"
            checked={formData.farmerActivities?.fruits || false}
            onChange={() =>
              updateField(
                'farmerActivities',
                'fruits',
                !formData.farmerActivities?.fruits
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SwitchField
            label="Coconut"
            description="Coconut palm cultivation"
            checked={formData.farmerActivities?.coconut || false}
            onChange={() =>
              updateField(
                'farmerActivities',
                'coconut',
                !formData.farmerActivities?.coconut
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SwitchField
            label="Other Crops"
            description="Specialty or other crops"
            checked={formData.farmerActivities?.other_crops || false}
            onChange={() =>
              updateField(
                'farmerActivities',
                'other_crops',
                !formData.farmerActivities?.other_crops
              )
            }
          />
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        fontWeight="600"
        sx={{ mb: 3, mt: 4, color: 'primary.main' }}
      >
        Do you raise livestock or poultry?
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SwitchField
            label="Livestock"
            description="Cattle, goats, swine, carabao"
            checked={formData.farmerActivities?.livestock || false}
            onChange={() =>
              updateField(
                'farmerActivities',
                'livestock',
                !formData.farmerActivities?.livestock
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SwitchField
            label="Poultry"
            description="Chickens, ducks, geese"
            checked={formData.farmerActivities?.poultry || false}
            onChange={() =>
              updateField(
                'farmerActivities',
                'poultry',
                !formData.farmerActivities?.poultry
              )
            }
          />
        </Grid>
      </Grid>
    </Box>
  );

  // Farmworker Activities (Tab Index: 1)
  const renderFarmworkerActivities = () => (
    <Box>
      <Typography
        variant="h6"
        fontWeight="600"
        sx={{ mb: 3, color: 'primary.main' }}
      >
        What farm work do you specialize in?
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SwitchField
            label="Land Preparation"
            description="Plowing, tilling, soil preparation"
            checked={formData.farmworkerActivities?.land_preparation || false}
            onChange={() =>
              updateField(
                'farmworkerActivities',
                'land_preparation',
                !formData.farmworkerActivities?.land_preparation
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SwitchField
            label="Planting"
            description="Seed/seedling planting"
            checked={formData.farmworkerActivities?.planting || false}
            onChange={() =>
              updateField(
                'farmworkerActivities',
                'planting',
                !formData.farmworkerActivities?.planting
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SwitchField
            label="Cultivation & Care"
            description="Weeding, fertilizing, crop maintenance"
            checked={formData.farmworkerActivities?.cultivation || false}
            onChange={() =>
              updateField(
                'farmworkerActivities',
                'cultivation',
                !formData.farmworkerActivities?.cultivation
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SwitchField
            label="Harvesting"
            description="Crop gathering and post-harvest"
            checked={formData.farmworkerActivities?.harvesting || false}
            onChange={() =>
              updateField(
                'farmworkerActivities',
                'harvesting',
                !formData.farmworkerActivities?.harvesting
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SwitchField
            label="Irrigation"
            description="Water management systems"
            checked={formData.farmworkerActivities?.irrigation || false}
            onChange={() =>
              updateField(
                'farmworkerActivities',
                'irrigation',
                !formData.farmworkerActivities?.irrigation
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SwitchField
            label="Equipment Operation"
            description="Operating farm machinery"
            checked={formData.farmworkerActivities?.equipment_operation || false}
            onChange={() =>
              updateField(
                'farmworkerActivities',
                'equipment_operation',
                !formData.farmworkerActivities?.equipment_operation
              )
            }
          />
        </Grid>
      </Grid>
    </Box>
  );

  // Fisherfolk Activities (Tab Index: 2)
  const renderFisherfolkActivities = () => (
    <Box>
      <Typography
        variant="h6"
        fontWeight="600"
        sx={{ mb: 3, color: 'primary.main' }}
      >
        What fishing activities are you involved in?
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SwitchField
            label="Fish Capture"
            description="Ocean, river, lake fishing"
            checked={formData.fisherfolkActivities?.fish_capture || false}
            onChange={() =>
              updateField(
                'fisherfolkActivities',
                'fish_capture',
                !formData.fisherfolkActivities?.fish_capture
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SwitchField
            label="Aquaculture"
            description="Fish farming, pond culture"
            checked={formData.fisherfolkActivities?.aquaculture || false}
            onChange={() =>
              updateField(
                'fisherfolkActivities',
                'aquaculture',
                !formData.fisherfolkActivities?.aquaculture
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SwitchField
            label="Seaweed Farming"
            description="Marine algae cultivation"
            checked={formData.fisherfolkActivities?.seaweed_farming || false}
            onChange={() =>
              updateField(
                'fisherfolkActivities',
                'seaweed_farming',
                !formData.fisherfolkActivities?.seaweed_farming
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SwitchField
            label="Gleaning"
            description="Collecting shellfish, seaweed"
            checked={formData.fisherfolkActivities?.gleaning || false}
            onChange={() =>
              updateField(
                'fisherfolkActivities',
                'gleaning',
                !formData.fisherfolkActivities?.gleaning
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SwitchField
            label="Fish Processing"
            description="Drying, smoking, packaging"
            checked={formData.fisherfolkActivities?.fish_processing || false}
            onChange={() =>
              updateField(
                'fisherfolkActivities',
                'fish_processing',
                !formData.fisherfolkActivities?.fish_processing
              )
            }
          />
        </Grid>
      </Grid>
    </Box>
  );

  // Agri-Youth Activities (Tab Index: 3)
  const renderAgriYouthActivities = () => (
    <Box>
      <Typography
        variant="h6"
        fontWeight="600"
        sx={{ mb: 3, color: 'primary.main' }}
      >
        Are you an Agri-Youth?
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SwitchField
            label="I am an Agri-Youth (18-30 years old)"
            description="Youth involved in agriculture"
            checked={formData.agriYouthActivities?.is_agri_youth || false}
            onChange={() =>
              updateField(
                'agriYouthActivities',
                'is_agri_youth',
                !formData.agriYouthActivities?.is_agri_youth
              )
            }
          />
        </Grid>

        {formData.agriYouthActivities?.is_agri_youth && (
          <>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{ mb: 2, color: 'primary.main' }}
              >
                Additional Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <SwitchField
                label="Part of Farming Household"
                description="Member of a farming family"
                checked={
                  formData.agriYouthActivities?.is_part_of_farming_household ||
                  false
                }
                onChange={() =>
                  updateField(
                    'agriYouthActivities',
                    'is_part_of_farming_household',
                    !formData.agriYouthActivities
                      ?.is_part_of_farming_household
                  )
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SwitchField
                label="Formal Agricultural Course"
                description="Enrolled in formal agricultural education"
                checked={
                  formData.agriYouthActivities?.is_formal_agri_course || false
                }
                onChange={() =>
                  updateField(
                    'agriYouthActivities',
                    'is_formal_agri_course',
                    !formData.agriYouthActivities?.is_formal_agri_course
                  )
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SwitchField
                label="Non-formal Agricultural Training"
                description="Workshops, seminars, training programs"
                checked={
                  formData.agriYouthActivities?.is_nonformal_agri_course ||
                  false
                }
                onChange={() =>
                  updateField(
                    'agriYouthActivities',
                    'is_nonformal_agri_course',
                    !formData.agriYouthActivities
                      ?.is_nonformal_agri_course
                  )
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SwitchField
                label="Agricultural Program Participant"
                description="Government or NGO agricultural programs"
                checked={
                  formData.agriYouthActivities
                    ?.is_agri_program_participant || false
                }
                onChange={() =>
                  updateField(
                    'agriYouthActivities',
                    'is_agri_program_participant',
                    !formData.agriYouthActivities
                      ?.is_agri_program_participant
                  )
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Alert severity="success" sx={{ mt: 2 }}>
                <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                Welcome, Agri-Youth! 🌱 You're the future of agriculture.
              </Alert>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );

  // Helper function to render content based on selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return renderFarmerActivities();
      case 1:
        return renderFarmworkerActivities();
      case 2:
        return renderFisherfolkActivities();
      case 3:
        return renderAgriYouthActivities();
      default:
        return null;
    }
  };

  return (
    <Box>
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <AgricultureIcon
          sx={{ fontSize: 32, color: 'primary.main', mr: 2 }}
        />
        <Box>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            color="primary"
          >
            Farm Profile & Livelihood
          </Typography>
         <Typography variant="body1" color="text.secondary">
            Select your primary livelihood category and tell us about your activities.
          </Typography>
        </Box>
      </Box>

      {/* Livelihood Tabs */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{ mb: 4 }}
      >
        {livelihoodCategories.map((category, index) => (
          <Tab
            key={category.id}
            icon={category.icon}
            label={category.category_name}
            wrapped
          />
        ))}
      </Tabs>

      {/* Tab Content */}
      <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <CardContent>{renderTabContent()}</CardContent>
      </Card>
    </Box>
  );
};

export default FarmProfileSection;
