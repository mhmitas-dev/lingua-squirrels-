import { useAuth } from '../providers/AuthProvider';
import { CreateGroupForm } from './create-group-form';

const Options = () => {
    const { user } = useAuth();

    return (
        <section className='custom-container'>
            <div>
                <CreateGroupForm />
            </div>
        </section>
    )
}

export default Options