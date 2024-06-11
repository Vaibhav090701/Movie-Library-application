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
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Return null or a loading indicator while checking authentication
    if (!isAuthenticated) {
        return null; // or a loading spinner if desired
    }

    // Only render children if authenticated
    return children;
};

export default ProtectedRoute;

