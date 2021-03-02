import React from "react";
import {connect} from "react-redux";
import {logoutUserRequest, loginUserRequest} from "../../redux/modules/user";
import {contactRequest} from "../../redux/modules/contact";
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {IndexLink} from "react-router";
import ContactForm from "../../components/ContactForm";
import {getFormValues, change, dispatch, reset, destroy} from "redux-form";
import "react-virtualized/styles.css";
import "../../stylesheets/theme.scss";
import "./App.scss";
import {FormattedMessage} from "react-intl";
import {FORM_CONTACT} from "../../consts";

export class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isContactOpen: false
        };

        this.openContact = this.openContact.bind(this);
        this.closeContact = this.closeContact.bind(this);
        this.sendContact = this.sendContact.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        const {user, router, errors} = this.props;

        if (!user && nextProps.user) {
            router.push('/offers');
        } else if (user && !nextProps.user) {
            router.push('/');
        }

    }

    openContact() {
        this.setState({
            isContactOpen: true
        });
    }

    closeContact() {
        this.setState({
            isContactOpen: false
        });
    }

    sendContact(event) {
        event.preventDefault();
        this.props.contactRequest();
        this.closeContact();
        this.props.destroy(FORM_CONTACT);
    }

    render() {
        const {children, user} = this.props;

        return (
            <div className="app">

                <Navbar staticTop collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <IndexLink to="/offers">
                                <FormattedMessage
                                    id={ 'app.appName' }
                                    defaultMessage={ 'Dorywczo' }/>
                            </IndexLink>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>

                            <LinkContainer to="/offers">
                                <NavItem >
                                    <FormattedMessage
                                        id={ 'app.offers' }
                                        defaultMessage={ 'Offers' }/>
                                </NavItem>
                            </LinkContainer>

                            {user &&
                            <LinkContainer to="/new-offer">
                                <NavItem >
                                    <FormattedMessage
                                        id={ 'app.newOffer' }
                                        defaultMessage={ 'New Offer' }/>
                                </NavItem>
                            </LinkContainer>}

                            {!user &&
                            <LinkContainer to="/" onClick={() => this.props.loginUserRequest()}>
                                <NavItem >
                                    <FormattedMessage
                                        id={ 'app.login' }
                                        defaultMessage={ 'Login' }/>
                                </NavItem>
                            </LinkContainer>}

                            <NavItem onClick={this.openContact}>
                                <FormattedMessage
                                    id={ 'app.contact' }
                                    defaultMessage={ 'Contact' }/>
                            </NavItem>


                            {user &&<NavItem onClick={() => this.props.logoutUserRequest()}>
                                <FormattedMessage
                                    id={ 'app.logout'}
                                    defaultMessage={ 'Logout' }/>
                            </NavItem>}


                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <ContactForm
                    isOpen={this.state.isContactOpen}
                    handleSubmit={this.sendContact}
                    closeContact={this.closeContact}/>
                {children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        errors: state.errors,
    };
}

export default connect(mapStateToProps, {logoutUserRequest, loginUserRequest, contactRequest, destroy})(App);

