import { Outlet, Navigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web';


const PrivateRoutes = ({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element => {
    const { keycloak, initialized } = useKeycloak();
    if(initialized && ! keycloak.authenticated){
      keycloak.login();
    }

    return keycloak.authenticated ? <>{children}</> :   <div></div>;
}
export default PrivateRoutes;