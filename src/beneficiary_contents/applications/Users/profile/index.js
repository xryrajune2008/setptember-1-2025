import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { Grid, Container } from '@mui/material';

// Import existing components
import ProfileCover from './ProfileCover';
import Addresses from './Addresses';

// Import beneficiary-specific components
import PersonalDetails from './PersonalDetails';
import RSBSAStatus from './RSBSAStatus';
import ApplicationHistory from './ApplicationHistory';
import QuickActions from './QuickActions';

function ManagementUserProfile() {
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const profileData = JSON.parse(localStorage.getItem(`personal_details_${storedUser.id}`)) || {};

  // Verification
  const isVerified = profileData.is_profile_verified || false;
  const rsbsaNumber =
    profileData.system_generated_rsbsa_number || profileData.manual_rsbsa_number;

  // Build full name with middle initial + extension
  const fullName = [
    profileData.fname || storedUser.fname,
    profileData.mname ? profileData.mname.charAt(0) + '.' : '',
    profileData.lname || storedUser.lname,
    profileData.extension_name || ''
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  const user = {
    // Remove the bold duplicate name
    name: '',
    email: storedUser.email || 'No email available',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/4.jpg',
    description: (
      <div style={{ fontSize: '16px', lineHeight: '1.6', color: '#333333' }}>
        <div style={{ fontSize: '18px', marginBottom: '8px', color: '#1a1a1a' }}>
          <strong>Full Name:</strong> {fullName}
        </div>
        <div style={{ fontSize: '16px', marginBottom: '8px', color: '#1a1a1a' }}>
          <strong>Email:</strong> {storedUser.email}
        </div>
        <div style={{ fontSize: '16px', color: '#1a1a1a' }}>
          <strong>Status:</strong>{' '}
          {isVerified ? (
            <>
              Verified {rsbsaNumber && `(RSBSA No: ${rsbsaNumber})`}
            </>
          ) : (
            'Pending RSBSA Verification'
          )}
        </div>
      </div>
    ),
    jobtitle: isVerified ? 'Verified RSBSA Beneficiary' : 'Pending Verification',
    location:
      profileData.municipality && profileData.province
        ? `${profileData.municipality}, ${profileData.province}`
        : storedUser.location || 'Opol, Misamis Oriental',
    followers: isVerified ? 'Verified' : 'Unverified'
  };

  return (
    <>
      <Helmet>
        <title>User Profile - Beneficiary Details Management</title>
        <meta
          name="description"
          content="Manage your personal details and beneficiary profile information"
        />
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          {/* Profile Cover Section */}
          <Grid item xs={12}>
            <ProfileCover user={user} />
          </Grid>

          {/* Personal Details Section */}
          <Grid item xs={12}>
            <PersonalDetails />
          </Grid>

          {/* RSBSA Status and Quick Actions */}
          <Grid item xs={12} md={8}>
            <RSBSAStatus />
          </Grid>
          <Grid item xs={12} md={4}>
            <QuickActions />
          </Grid>

          {/* Application History and Address Information */}
          <Grid item xs={12} md={7}>
            <ApplicationHistory />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;