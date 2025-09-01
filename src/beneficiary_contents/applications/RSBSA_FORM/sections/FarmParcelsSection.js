import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  FormHelperText,
  Chip,
  Button,
  IconButton,
  FormControlLabel,
  Switch,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {
  Landscape as LandscapeIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationIcon,
  AddCircle as AddCircleIcon
} from '@mui/icons-material';

const FarmParcelsSection = ({ farmParcels, errors, addFarmParcel, updateFarmParcel, removeFarmParcel }) => {
  // Options based on database enum values
  const tenureTypeOptions = [
    { value: 'registered_owner', label: 'Registered Owner' },
    { value: 'tenant', label: 'Tenant' },
    { value: 'lessee', label: 'Lessee' }
  ];

  const farmTypeOptions = [
    { value: 'irrigated', label: 'Irrigated' },
    { value: 'rainfed upland', label: 'Rainfed Upland' },
    { value: 'rainfed lowland', label: 'Rainfed Lowland' }
  ];



  const commodityTypeOptions = [
    { value: 'rice', label: 'Rice' },
    { value: 'corn', label: 'Corn' },
    { value: 'hvc', label: 'HVC (High Value Crops)' },
    { value: 'livestock', label: 'Livestock' },
    { value: 'poultry', label: 'Poultry' },
    { value: 'agri_fisher', label: 'Agri-Fisher' }
  ];

  // Specific HVC crop types for detailed tracking
  const hvcCropOptions = [
    { value: 'cacao', label: 'Cacao' },
    { value: 'tobacco', label: 'Tobacco' },
    { value: 'coffee', label: 'Coffee' },
    { value: 'coconut', label: 'Coconut' },
    { value: 'banana', label: 'Banana' },
    { value: 'mango', label: 'Mango' },
    { value: 'pineapple', label: 'Pineapple' },
    { value: 'papaya', label: 'Papaya' },
    { value: 'durian', label: 'Durian' },
    { value: 'rambutan', label: 'Rambutan' },
    { value: 'lanzones', label: 'Lanzones' },
    { value: 'jackfruit', label: 'Jackfruit' },
    { value: 'avocado', label: 'Avocado' },
    { value: 'guava', label: 'Guava' },
    { value: 'calamansi', label: 'Calamansi' },
    { value: 'lemon', label: 'Lemon' },
    { value: 'orange', label: 'Orange' },
    { value: 'sugarcane', label: 'Sugarcane' },
    { value: 'abaca', label: 'Abaca' },
    { value: 'rubber', label: 'Rubber' },
    { value: 'bamboo', label: 'Bamboo' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'pepper', label: 'Pepper' },
    { value: 'ginger', label: 'Ginger' },
    { value: 'turmeric', label: 'Turmeric' },
    { value: 'other_hvc', label: 'Other HVC' }
  ];

  const livestockTypeOptions = [
    'Cattle', 'Carabao', 'Goat', 'Sheep', 'Swine', 'Horse', 'Other'
  ];

  const poultryTypeOptions = [
    'Chicken', 'Duck', 'Goose', 'Turkey', 'Quail', 'Other'
  ];

  const barangayOptions = [
    'Bagocboc', 'Barra', 'Bonbon', 'Buruanga', 'Cabadiangan', 'Camaman-an',
    'Gotokan', 'Igpit', 'Limbaybay', 'Lower Olave', 'Lumbia', 'Malitbog',
    'Mapayag', 'Napaliran', 'Opol Poblacion', 'Patag', 'Pontod', 'San Vicente',
    'Tingalan', 'Taboc', 'Talakag', 'Upper Olave'
  ];

  const handleParcelChange = (index, field, value) => {
    updateFarmParcel(index, field, value);
  };

  const handleCommodityChange = (parcelIndex, commodityIndex, field, value) => {
    const parcel = farmParcels[parcelIndex];
    const updatedCommodities = [...(parcel.commodities || [])];
    updatedCommodities[commodityIndex] = {
      ...updatedCommodities[commodityIndex],
      [field]: value
    };
    updateFarmParcel(parcelIndex, 'commodities', updatedCommodities);
  };

  const addCommodity = (parcelIndex) => {
    const parcel = farmParcels[parcelIndex];
    const newCommodity = {
      commodity_type: '',
      hvc_crop_type: '', // New field for specific HVC crop type
      animal_type: '',
      size_hectares: '',
      number_of_heads: 0,
      farm_type: '',
      is_organic_practitioner: false,
      remarks: ''
    };
    const updatedCommodities = [...(parcel.commodities || []), newCommodity];
    updateFarmParcel(parcelIndex, 'commodities', updatedCommodities);
  };

  const removeCommodity = (parcelIndex, commodityIndex) => {
    const parcel = farmParcels[parcelIndex];
    const updatedCommodities = [...(parcel.commodities || [])];
    updatedCommodities.splice(commodityIndex, 1);
    updateFarmParcel(parcelIndex, 'commodities', updatedCommodities);
  };

  const handleAddParcel = () => {
    addFarmParcel();
  };

  const handleRemoveParcel = (index) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to remove this farm parcel?')) {
      removeFarmParcel(index);
    }
  };

  const calculateTotalCommodityArea = (commodities) => {
    return (commodities || []).reduce((total, commodity) => {
      return total + (parseFloat(commodity.size_hectares) || 0);
    }, 0);
  };

  return (
    <Box>
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <LandscapeIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h2" fontWeight="bold" color="primary">
            Farm Parcels
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Provide details about your farm land ownership and cultivation areas
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddParcel}
          sx={{ borderRadius: 2 }}
        >
          Add Parcel
        </Button>
      </Box>

      {/* Error message for missing parcels */}
      {errors.farmParcels && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {errors.farmParcels}
        </Alert>
      )}

      {/* Farm Parcels List */}
      {farmParcels.length === 0 ? (
        <Card variant="outlined" sx={{ borderRadius: 2, textAlign: 'center', py: 6 }}>
          <CardContent>
            <LocationIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Farm Parcels Added
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              You need to add at least one farm parcel to continue with your RSBSA registration.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddParcel}
              size="large"
            >
              Add Your First Farm Parcel
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
                     {farmParcels.map((parcel, index) => {
             const totalCommodityArea = calculateTotalCommodityArea(parcel.commodities);

            return (
              <Grid item xs={12} key={parcel.id || index}>
                <Accordion 
                  defaultExpanded={index === farmParcels.length - 1}
                  sx={{ 
                    borderRadius: 2, 
                    '&:before': { display: 'none' },
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      borderRadius: '8px 8px 0 0',
                      '&.Mui-expanded': {
                        borderRadius: '8px 8px 0 0'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mr: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        Farm Parcel #{index + 1}
                        {parcel.parcel_number && ` - ${parcel.parcel_number}`}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                          label={`${parcel.total_farm_area || 0} hectares`}
                          size="small"
                          sx={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'inherit'
                          }}
                        />
                        <Chip 
                          label={`${(parcel.commodities || []).length} commodities`}
                          size="small"
                          sx={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'inherit'
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveParcel(index);
                          }}
                          sx={{ color: 'inherit' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      {/* Basic Parcel Information */}
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom color="primary">
                          Basic Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Parcel Number/Name"
                          value={parcel.parcel_number || ''}
                          onChange={(e) => handleParcelChange(index, 'parcel_number', e.target.value)}
                          error={!!errors[`farmParcels.${index}.parcel_number`]}
                          helperText={errors[`farmParcels.${index}.parcel_number`] || 'Optional identifier for this parcel'}
                          placeholder="e.g., Lot 1, Parcel A, North Field"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth error={!!errors[`farmParcels.${index}.barangay`]}>
                          <InputLabel>Barangay *</InputLabel>
                          <Select
                            value={parcel.barangay || ''}
                            onChange={(e) => handleParcelChange(index, 'barangay', e.target.value)}
                            label="Barangay *"
                          >
                            {barangayOptions.map((barangay) => (
                              <MenuItem key={barangay} value={barangay}>
                                {barangay}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors[`farmParcels.${index}.barangay`] && (
                            <FormHelperText>{errors[`farmParcels.${index}.barangay`]}</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                                                                   <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Total Farm Area (hectares) *"
                          type="number"
                          step="0.01"
                          min="0"
                          value={parcel.total_farm_area || ''}
                          onChange={(e) => handleParcelChange(index, 'total_farm_area', parseFloat(e.target.value) || 0)}
                          error={!!errors[`farmParcels.${index}.total_farm_area`]}
                          helperText={errors[`farmParcels.${index}.total_farm_area`] || 'Enter the total area of this farm parcel'}
                          placeholder="0.00"
                        />
                      </Grid>

                      {/* Farm Area Validation Alert */}
                      {parcel.total_farm_area > 0 && (
                        <Grid item xs={12}>
                          {totalCommodityArea > parcel.total_farm_area ? (
                            <Alert severity="error" sx={{ borderRadius: 2 }}>
                              <Typography variant="body2">
                                <strong>⚠️ Area Mismatch:</strong> Total commodity area ({totalCommodityArea.toFixed(2)} ha) 
                                exceeds farm area ({parcel.total_farm_area} ha). 
                                Please adjust commodity areas or increase farm area.
                              </Typography>
                            </Alert>
                          ) : totalCommodityArea === parcel.total_farm_area ? (
                            <Alert severity="success" sx={{ borderRadius: 2 }}>
                              <Typography variant="body2">
                                <strong>✅ Perfect Match:</strong> Commodity areas ({totalCommodityArea.toFixed(2)} ha) 
                                exactly match farm area ({parcel.total_farm_area} ha).
                              </Typography>
                            </Alert>
                          ) : totalCommodityArea > 0 ? (
                            <Alert severity="info" sx={{ borderRadius: 2 }}>
                              <Typography variant="body2">
                                <strong>ℹ️ Area Summary:</strong> Farm area: {parcel.total_farm_area} ha | 
                                Commodity areas: {totalCommodityArea.toFixed(2)} ha | 
                                Remaining: {(parcel.total_farm_area - totalCommodityArea).toFixed(2)} ha
                              </Typography>
                            </Alert>
                          ) : (
                            <Alert severity="warning" sx={{ borderRadius: 2 }}>
                              <Typography variant="body2">
                                <strong>📝 Next Step:</strong> You have {parcel.total_farm_area} ha of farm area. 
                                Please add commodities below to specify how this area is used.
                              </Typography>
                            </Alert>
                          )}
                        </Grid>
                      )}

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth error={!!errors[`farmParcels.${index}.tenure_type`]}>
                          <InputLabel>Tenure Type *</InputLabel>
                          <Select
                            value={parcel.tenure_type || ''}
                            onChange={(e) => handleParcelChange(index, 'tenure_type', e.target.value)}
                            label="Tenure Type *"
                          >
                            {tenureTypeOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors[`farmParcels.${index}.tenure_type`] && (
                            <FormHelperText>{errors[`farmParcels.${index}.tenure_type`]}</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Ownership Document Number"
                          value={parcel.ownership_document_number || ''}
                          onChange={(e) => handleParcelChange(index, 'ownership_document_number', e.target.value)}
                          placeholder="Title No., Tax Dec No., etc."
                          helperText="Enter document number if available"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Farm Type</InputLabel>
                          <Select
                            value={parcel.farm_type || ''}
                            onChange={(e) => handleParcelChange(index, 'farm_type', e.target.value)}
                            label="Farm Type"
                            disabled={(() => {
                              // Disable if any commodity is agri-fisheries
                              return parcel.commodities && 
                                parcel.commodities.some(commodity => commodity.commodity_type === 'agri_fisher');
                            })()}
                          >
                            {farmTypeOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {(() => {
                            const hasAgriFisheries = parcel.commodities && 
                              parcel.commodities.some(commodity => commodity.commodity_type === 'agri_fisher');
                            if (hasAgriFisheries) {
                              return (
                                <FormHelperText>
                                  Farm type disabled for agri-fisheries (sea/fishing activities)
                                </FormHelperText>
                              );
                            }
                            return null;
                          })()}
                        </FormControl>
                      </Grid>

                      {/* CROP/COMMODITY Information */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                          <Typography variant="h6" gutterBottom color="primary">
                            CROP/COMMODITY Information
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<AddCircleIcon />}
                            onClick={() => addCommodity(index)}
                          >
                            Add Commodity
                          </Button>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                      </Grid>

                                             {/* Area Validation Alert */}
                       {totalCommodityArea === 0 && (
                         <Grid item xs={12}>
                           <Alert severity="info" sx={{ mb: 2 }}>
                             <Typography variant="body2">
                               <strong>No commodities added yet.</strong> Add commodities to automatically calculate the total farm area.
                             </Typography>
                           </Alert>
                         </Grid>
                       )}

                      {/* Commodities Table */}
                      <Grid item xs={12}>
                        {(!parcel.commodities || parcel.commodities.length === 0) ? (
                          <Card variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              No commodities added yet
                            </Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<AddCircleIcon />}
                              onClick={() => addCommodity(index)}
                            >
                              Add First Commodity
                            </Button>
                          </Card>
                        ) : (
                          <TableContainer component={Paper} variant="outlined">
                            <Table size="small">
                                                             <TableHead>
                                 <TableRow sx={{ backgroundColor: 'background.default' }}>
                                   <TableCell><strong>Commodity Type</strong></TableCell>
                                   <TableCell><strong>Specific Type</strong></TableCell>
                                   <TableCell><strong>Size (ha)</strong></TableCell>
                                   <TableCell><strong>No. of Heads</strong></TableCell>
                                   <TableCell><strong>Farm Type</strong></TableCell>
                                   <TableCell><strong>Organic</strong></TableCell>
                                   <TableCell><strong>Actions</strong></TableCell>
                                 </TableRow>
                               </TableHead>
                              <TableBody>
                                {parcel.commodities.map((commodity, commodityIndex) => (
                                  <TableRow key={commodityIndex} hover>
                                                                         <TableCell>
                                       <FormControl fullWidth size="small">
                                         <Select
                                           value={commodity.commodity_type || ''}
                                           onChange={(e) => handleCommodityChange(index, commodityIndex, 'commodity_type', e.target.value)}
                                           displayEmpty
                                         >
                                           <MenuItem value="" disabled>Select Type</MenuItem>
                                           {commodityTypeOptions.map((option) => (
                                             <MenuItem key={option.value} value={option.value}>
                                               {option.label}
                                             </MenuItem>
                                           ))}
                                         </Select>
                                       </FormControl>
                                       {commodity.commodity_type === 'hvc' && (
                                         <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                           Select specific HVC crop type below
                                         </Typography>
                                       )}
                                     </TableCell>
                                                                         <TableCell>
                                       {/* HVC Crop Type Selection */}
                                       {commodity.commodity_type === 'hvc' ? (
                                         <FormControl fullWidth size="small">
                                           <Select
                                             value={commodity.hvc_crop_type || ''}
                                             onChange={(e) => handleCommodityChange(index, commodityIndex, 'hvc_crop_type', e.target.value)}
                                             displayEmpty
                                           >
                                             <MenuItem value="" disabled>Select HVC Crop</MenuItem>
                                             {hvcCropOptions.map((option) => (
                                               <MenuItem key={option.value} value={option.value}>
                                                 {option.label}
                                               </MenuItem>
                                             ))}
                                           </Select>
                                         </FormControl>
                                       ) : (commodity.commodity_type === 'livestock' || commodity.commodity_type === 'poultry') ? (
                                         <FormControl fullWidth size="small">
                                           <Select
                                             value={commodity.animal_type || ''}
                                             onChange={(e) => handleCommodityChange(index, commodityIndex, 'animal_type', e.target.value)}
                                             displayEmpty
                                           >
                                             <MenuItem value="" disabled>Select Animal</MenuItem>
                                             {(commodity.commodity_type === 'livestock' ? livestockTypeOptions : poultryTypeOptions).map((type) => (
                                               <MenuItem key={type} value={type}>
                                                 {type}
                                               </MenuItem>
                                             ))}
                                           </Select>
                                         </FormControl>
                                       ) : (
                                         <Typography variant="body2" color="text.secondary">
                                           -
                                         </Typography>
                                       )}
                                     </TableCell>
                                    <TableCell>
                                      <TextField
                                        size="small"
                                        type="number"
                                        value={commodity.size_hectares || ''}
                                        onChange={(e) => handleCommodityChange(index, commodityIndex, 'size_hectares', parseFloat(e.target.value) || 0)}
                                        inputProps={{ min: 0, step: 0.01 }}
                                        sx={{ width: 80 }}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      {(commodity.commodity_type === 'livestock' || commodity.commodity_type === 'poultry') ? (
                                        <TextField
                                          size="small"
                                          type="number"
                                          value={commodity.number_of_heads || ''}
                                          onChange={(e) => handleCommodityChange(index, commodityIndex, 'number_of_heads', parseInt(e.target.value) || 0)}
                                          inputProps={{ min: 0 }}
                                          sx={{ width: 80 }}
                                        />
                                      ) : (
                                        <Typography variant="body2" color="text.secondary">
                                          -
                                        </Typography>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      {commodity.commodity_type === 'agri_fisher' ? (
                                        <Typography variant="body2" color="text.secondary">
                                          N/A (Sea/Fishing)
                                        </Typography>
                                      ) : (
                                        <FormControl size="small" sx={{ minWidth: 120 }}>
                                          <Select
                                            value={commodity.farm_type || ''}
                                            onChange={(e) => handleCommodityChange(index, commodityIndex, 'farm_type', e.target.value)}
                                            displayEmpty
                                          >
                                            <MenuItem value="" disabled>Select Type</MenuItem>
                                            {farmTypeOptions.map((option) => (
                                              <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                              </MenuItem>
                                            ))}
                                          </Select>
                                        </FormControl>
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      <FormControlLabel
                                        control={
                                          <Switch
                                            checked={commodity.is_organic_practitioner || false}
                                            onChange={(e) => handleCommodityChange(index, commodityIndex, 'is_organic_practitioner', e.target.checked)}
                                            size="small"
                                          />
                                        }
                                        label=""
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => removeCommodity(index, commodityIndex)}
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}
                      </Grid>

                                             {/* Area Summary */}
                       {parcel.commodities && parcel.commodities.length > 0 && (
                         <Grid item xs={12}>
                           <Card variant="outlined" sx={{ p: 2, backgroundColor: 'background.default' }}>
                                                           <Typography variant="body2" color="text.secondary" gutterBottom>
                                <strong>Total Farm Area:</strong> {totalCommodityArea.toFixed(2)} hectares
                                {totalCommodityArea > 0 && (
                                  <span> (100% utilized)</span>
                                )}
                              </Typography>
                             
                             {/* Commodity Breakdown */}
                             <Box sx={{ mt: 1 }}>
                               {(() => {
                                 const breakdown = {};
                                 parcel.commodities.forEach(commodity => {
                                   if (commodity.commodity_type === 'hvc' && commodity.hvc_crop_type) {
                                     const key = commodity.hvc_crop_type;
                                     breakdown[key] = (breakdown[key] || 0) + (parseFloat(commodity.size_hectares) || 0);
                                   } else if (commodity.commodity_type) {
                                     const key = commodity.commodity_type;
                                     breakdown[key] = (breakdown[key] || 0) + (parseFloat(commodity.size_hectares) || 0);
                                   }
                                 });
                                 
                                                                   const breakdownItems = Object.entries(breakdown)
                                    .filter(([, area]) => area > 0)
                                    .map(([type, area]) => `${type}: ${area.toFixed(2)} ha`);
                                 
                                 if (breakdownItems.length > 0) {
                                   return (
                                     <Typography variant="caption" color="text.secondary">
                                       <strong>Breakdown:</strong> {breakdownItems.join(', ')}
                                     </Typography>
                                   );
                                 }
                                 return null;
                               })()}
                             </Box>
                           </Card>
                         </Grid>
                       )}

                      {/* Special Classifications */}
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                          Special Classifications
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={parcel.is_ancestral_domain || false}
                              onChange={(e) => handleParcelChange(index, 'is_ancestral_domain', e.target.checked)}
                            />
                          }
                          label="Within Ancestral Domain"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={parcel.is_agrarian_reform_beneficiary || false}
                              onChange={(e) => handleParcelChange(index, 'is_agrarian_reform_beneficiary', e.target.checked)}
                            />
                          }
                          label="Agrarian Reform Beneficiary"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={parcel.is_organic_practitioner || false}
                              onChange={(e) => handleParcelChange(index, 'is_organic_practitioner', e.target.checked)}
                            />
                          }
                          label="Organic Practitioner"
                        />
                      </Grid>

                      {/* Remarks */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          label="Remarks"
                          value={parcel.remarks || ''}
                          onChange={(e) => handleParcelChange(index, 'remarks', e.target.value)}
                          placeholder="Additional notes about this farm parcel..."
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default FarmParcelsSection;