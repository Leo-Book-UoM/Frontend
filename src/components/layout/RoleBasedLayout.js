import SecrataryLayout from './secrataryLayout';
import PresidentLayout from './presidentlayout';

const RoleBasedLayout = ({ userRole, children }) => {
    switch (userRole?.toLowerCase()) {
        case "secretary":
            return <SecrataryLayout>{children}</SecrataryLayout>
        case "president":
            return <PresidentLayout>{children}</PresidentLayout>
        case "director":
            return <PresidentLayout>{children}</PresidentLayout>
        default:
            return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
                <h1 className="text-3xl font-bold">Unauthorized Access</h1>
                <p className="mt-2 text-gray-300">You do not have permission to view this page.</p>
            </div>;
    }
};

export default RoleBasedLayout;