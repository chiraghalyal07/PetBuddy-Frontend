
import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';
import axios from '../../config/axios';
import { useParams } from 'react-router-dom';

export default function PetsByParent() {
    const { petParentId } = useParams();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get(`/api/admin/pets`, {
                    headers: {
                        Authorization: ` ${localStorage.getItem('token')}`,
                    },
                });
                console.log('API response:', response.data); // Log API response for debugging
                setPets(response.data);
            } catch (error) {
                console.error('Error fetching pets:', error);
                setError('Failed to fetch pets');
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container>
           
            {pets.length > 0 ? (
                pets.map(pet => (
                    <Card key={pet._id} sx={{ marginBottom: 2 }}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={pet.petPhoto || 'default-image-url'}
                            alt="Pet Photo"
                            sx={{ width: 'auto', marginBottom: 2 }}
                        />
                        <CardContent>
                            <Typography variant="h5" gutterBottom>{pet.petName}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Age:</strong> {new Date(pet.age).toLocaleDateString()}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Gender:</strong> {pet.gender}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Category:</strong> {pet.categories}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Breed:</strong> {pet.breed}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Weight:</strong> {pet.weight}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Vaccinated:</strong> {pet.vaccinated ? 'Yes' : 'No'}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Medication:</strong></Typography>
                            {pet.medication.length > 0 ? (
                                pet.medication.map(med => (
                                    <Typography key={med._id} variant="body2" gutterBottom>
                                        - {med.medicationName}: {med.description} (Dose: {med.dose}, Due Date: {new Date(med.dueDate).toLocaleDateString()})
                                    </Typography>
                                ))
                            ) : (
                                <Typography variant="body2" gutterBottom>No medication found</Typography>
                            )}
                            <Typography variant="body1" gutterBottom><strong>Reminders:</strong></Typography>
                            {pet.reminders.length > 0 ? (
                                pet.reminders.map(rem => (
                                    <Typography key={rem._id} variant="body2" gutterBottom>
                                        - {rem.title}: {rem.note} (Date: {new Date(rem.date).toLocaleDateString()})
                                    </Typography>
                                ))
                            ) : (
                                <Typography variant="body2" gutterBottom>No reminders found</Typography>
                            )}
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No pets found for this parent.</Typography>
            )}
        </Container>
    );
}
