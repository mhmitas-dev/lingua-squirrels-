import React from 'react'
import { useAuth } from '../providers/AuthProvider';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

const Options = () => {
    const { user } = useAuth();

    return (
        <section className='custom-container'>
            <div>
                <Button>
                    <Plus />
                    <span>Create a new Group</span>
                </Button>
            </div>
        </section>
    )
}

export default Options