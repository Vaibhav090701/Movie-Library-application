// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {

//         useEffect(() => {
//             // Check if the page has already been reloaded
//             const isReloaded = sessionStorage.getItem('isReloaded');
            
//             if (!isReloaded) {
//               sessionStorage.setItem('isReloaded', 'true');
//               window.location.reload();
//             }
//           }, []);
        
//         const navigate=useNavigate();
//         const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
//         if (!isAuthenticated) {
//             navigate('/login')
//         }
    
//         navigate('/movies')
//         return children;
      
//     };
    
    
// export default ProtectedRoute;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    useEffect(() => {
        // Check if the page has already been reloaded
        const isReloaded = sessionStorage.getItem('isReloaded');

        if (!isReloaded) {
            sessionStorage.setItem('isReloaded', 'true');
            window.location.reload();
        } else if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate('/movies');
        }
    }, [isAuthenticated, navigate]);

    // Render null while checking authentication and handling navigation
    return null; 
};

export default ProtectedRoute;



