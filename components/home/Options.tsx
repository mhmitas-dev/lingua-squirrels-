import React from 'react'
import { useAuth } from '../providers/AuthProvider';
import { Button } from '../ui/button';

const Options = () => {
    const { user } = useAuth();

    return (
        <section>
            <div>
                <Button>Create a new Group</Button>
            </div>
        </section>
    )
}

export default Options