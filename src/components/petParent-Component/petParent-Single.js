// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from '../../config/axios';

// const PetParentDetail = () => {
//     const { id } = useParams();
//     const [petParent, setPetParent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPetParent = async () => {
//             try {
//                 const response = await axios.get(`/api/singleparent/${id}`, {
//                     headers: {
//                         Authorization: localStorage.getItem('token'),
//                     },
//                 });
//                 console.log(response.data)
//                 setPetParent(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };
//         fetchPetParent();
//     }, [id]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <h2>Pet Parent Details</h2>
//             {petParent ? (
//                 <div>
//                     {petParent.userId ? (
//                         <>
//                             <h3>{petParent.userId.username}</h3>
//                             <p>Email: {petParent.userId.email}</p>
//                             <p>Phone: {petParent.userId.phoneNumber}</p>
//                         </>
//                     ) : (
//                         <p>User Information not available</p>
//                     )}
//                     <p>Address: {petParent.address}</p>
//                     <p>Bio: {petParent.bio}</p>
//                     <div>
//                         <h3>Pets</h3>
//                         {petParent.pets.map((pet, index) => (
//                             <div key={index}>
//                                 <p>Name: {pet.name}</p>
//                                 <p>Type: {pet.type}</p>
//                                 <p>Age: {pet.age}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 <div>Pet Parent not found</div>
//             )}
//         </div>
//     );
// };

// export default PetParentDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';

const PetParentDetail = () => {
    const { id } = useParams();
    const [petParent, setPetParent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPetParent = async () => {
            try {
                const response = await axios.get(`/api/singleparent/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                setPetParent(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchPetParent();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Pet Parent Details</h2>
            {petParent ? (
                <div>
                    {petParent.userId ? (
                        <>
                            <h3>{petParent.userId.username}</h3>
                            <p>Email: {petParent.userId.email}</p>
                            <p>Phone: {petParent.userId.phoneNumber}</p>
                        </>
                    ) : (
                        <p>User Information not available</p>
                    )}
                    <p>Address: {petParent.address}</p>
                    <div>
                        <h3>Profile Photo</h3>
                        <img src={petParent.photo} alt='Profile' style={{ maxWidth: '200px' }} />
                    </div>
                    <div>
                        <h3>Proof Document</h3>
                        {petParent.proof.endsWith('.pdf') ? (
                            <a href={petParent.proof} target='_blank' rel='noreferrer'>View PDF</a>
                        ) : (
                            <img src={petParent.proof} alt='Proof' style={{ maxWidth: '200px' }} />
                        )}
                    </div>
                </div>
            ) : (
                <div>Pet Parent not found</div>
            )}
        </div>
    );
};

export default PetParentDetail;

