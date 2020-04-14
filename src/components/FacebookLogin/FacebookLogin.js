import React from 'react';
import FacebookLoginBtn from 'react-facebook-login/dist/facebook-login-render-props'
import Button from "reactstrap/lib/Button";
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../actions/user";

const FacebookLogin = props => {
    const dispatch = useDispatch();

    const facebookCallback = data => {
        if(data.id){
            dispatch(loginWithFacebook(data, props.history))
        }
    };
    return (
        <div>
            <FacebookLoginBtn
                appId="263479881481167"
                callback={facebookCallback}
                fields='name,email, picture'
                readPermissions={['public_profile']}
                render={renderProps => (
                    <Button onClick={renderProps.onClick}>Login in Facebook</Button>
                )}
            />
        </div>
    );
};

export default FacebookLogin;