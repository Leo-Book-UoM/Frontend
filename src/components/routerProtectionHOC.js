"use client";
import { useRouter } from "next/router";

const withRoleProtection = (WrappedComponent, allowedRole) => {
    return(props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
        const roleName = localStorage.getItem('roleName');

        if(roleName !== allowedRole){
            router.push('/login');
            return null;
        }else{
            setLoading(false);
        }
    },[router, allowedRole]);

    if(loading){
        return <h1>Loading...</h1>;
    }
        return <WrappedComponent {...props} />;
    };

};

export default withRoleProtection;