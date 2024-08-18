import React, { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Grid } from '@mui/material';

import boarding from '../../images/home-pet-boarding.jpg';
import grooming from '../../images/home-pet-grooming.jpg';
import taxi from '../../images/home-pet-taxi.jpg';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function Mission() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <Container maxWidth="lg">
            {/* Mission, Vision, Values Section */}
            <Box>
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Mission" />
                    <Tab label="Vision" />
                    <Tab label="Values" />
                </Tabs>
                <TabPanel value={tabIndex} index={0}>
                    <Grid container spacing={2} alignItems="center" textAlign='justify'>
                        <Grid item xs={12} md={6} sx={{
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                            }
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'justify' }}>
                                Mission
                            </Typography>
                            <Typography variant="body1">
                                At PetBuddy, our mission is to revolutionize pet care by providing a comprehensive, user-friendly platform that connects pet parents with trustworthy caretakers. We are dedicated to enhancing the well-being of pets through a range of top-notch services, including boarding, sitting, walking, grooming, and more. Our goal is to ensure that every pet receives the love, attention, and care they deserve while giving pet parents peace of mind.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                            }
                        }}>
                            <img src={taxi} alt="Pet Taxi" style={{ width: '100%', borderRadius: '8px' }} />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                    <Grid container spacing={2} alignItems="center" textAlign='justify'>
                        <Grid item xs={12} md={6} sx={{
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                            }
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Vision
                            </Typography>
                            <Typography variant="body1">
                                Our vision is to become the leading platform in the pet care industry, known for our commitment to excellence, reliability, and innovation. We strive to build a community where pets are cherished, and their needs are met with the highest standards of care. By continuously improving our services and leveraging technology, we aim to create a world where every pet parent and caretaker can connect seamlessly and build lasting relationships.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                            }
                        }}>
                            <img src={boarding} alt="Pet Boarding" style={{ width: '100%', borderRadius: '8px' }} />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={tabIndex} index={2}>
                    <Grid container spacing={2} alignItems="center" textAlign='justify'>
                        <Grid item xs={12} md={7} sx={{
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                            }
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Values
                            </Typography>
                            <Typography variant="body1">
                                <ul>
                                    <li>Trust: We prioritize trust by thoroughly vetting our caretakers and ensuring transparency in all our interactions. Our platform is designed to foster a safe environment where pet parents can confidently find reliable care for their beloved pets.</li>
                                    <li>Compassion: We are driven by a genuine passion for animal welfare. Our services are designed with the well-being of pets at the forefront, and we are committed to providing care that reflects our deep compassion for all animals.</li>
                                    <li>Innovation: We embrace technology to enhance the pet care experience. From seamless booking processes to real-time updates, we are dedicated to using innovative solutions that improve the convenience and quality of pet care.</li>
                                    <li>Community: We believe in building a strong, supportive community of pet parents and caretakers. Our platform is a place where shared values and mutual respect drive positive relationships and exceptional care.</li>
                                    <li>Excellence: We are committed to delivering the highest quality of service in everything we do. Our dedication to excellence is reflected in our attention to detail, rigorous standards, and continuous improvement efforts.</li>
                                </ul>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                            }
                        }}>
                            <img src={grooming} alt="Pet Grooming" style={{ width: '100%', borderRadius: '8px' }} />
                        </Grid>
                    </Grid>
                </TabPanel>
            </Box>
        </Container>
    );
}
