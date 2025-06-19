import { useEffect, useContext } from 'react';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../context/UserContext';


const PrivateRouter = (props) => {
    let history = useHistory();
        const {user} = useContext(UserContext);

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            history.push("/login");
        }
    }, [])
    return (
        <>
            <Route path={props.path} component={props.component} />
        </>
    );
}

export default PrivateRouter;