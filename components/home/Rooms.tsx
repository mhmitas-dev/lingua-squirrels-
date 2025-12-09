import React from 'react'
import { useAuth } from '../providers/AuthProvider';

const Rooms = () => {
    const { user } = useAuth();

    return (
        <div>Rooms</div>
    )
}

export default Rooms