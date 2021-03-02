import React from "react";
import {connect} from "react-redux";
import FacebookLogin from 'react-facebook-login';
import {loginUserSuccess, loginUserFail} from '../../redux/modules/user'

class Login extends React.Component {

    render() {
        return (
            <div className="container">
                <FacebookLogin
                    appId='1826937380879748'
                    fields='name,email,picture'
                    version='2.8'
                    scope='pages_show_list,manage_pages,read_insights, publish_actions, publish_pages, user_status, pages_messaging'
                    callback={(response) => {
                        const {name, accessToken, id, picture} = response;

                        if (accessToken) {
                            this.props.loginUserSuccess(name, accessToken, id, picture.data.url);
                        } else
                            this.props.loginUserFail();
                    }}/>

            </div>
        );
    }
}

function mapStateToProps(state, own_props) {
    return {
        user: state.user,
        action: own_props.params.action
    };
}

export default connect(mapStateToProps, {loginUserSuccess, loginUserFail})(Login);
