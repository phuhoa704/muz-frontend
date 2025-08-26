import { Can } from '@casl/react';
import React from 'react';
import { useAbility } from '../features/access-control/context/AbilityContext';

interface ProtectedComponentProps {
    action: string;
    subject: string | undefined;
    children: React.ReactNode;
}

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({action, subject, children }) => {
    const ability = useAbility();

    return (
        <Can I={action} a={subject} ability={ability}>
            {children}
        </Can>
    )
}

export default ProtectedComponent;