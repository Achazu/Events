import React, {Component} from 'react';
import {Menu, Container, Button} from 'semantic-ui-react';
import {NavLink, Link, withRouter} from 'react-router-dom'
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

class NavBar extends Component {
    state = {
        authenticated: false
    }

    handleSignIn = () => {
        this.setState({authenticated: true})
    }

    handleSignOut = () => {
        this.setState({authenticated: false});
        this
            .props
            .history
            .push('/')
    }

    render() {
        const {authenticated} = this.state;
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item as={Link} to='/' header>
                        <img src="/assets/logo.png" alt="logo"/>
                        Re-vents
						  </Menu.Item>
						  
						  <Menu.Item as={NavLink} to='/events' name="Events"/> 
						  <Menu.Item as={NavLink} to='/test' name="Test"/> 
						  {authenticated && <Menu.Item as={NavLink} to='/people' name="People"/>}

                    {authenticated && <Menu.Item>
                        <Button
                            as={Link}
                            to='/createEvent'
                            floated="right"
                            positive
                            inverted
                            content="Create Event"/>
                    </Menu.Item>}

                    {authenticated
                        ? <SignedInMenu signOut={this.handleSignOut}/>
                        : <SignedOutMenu signIn={this.handleSignIn}/>}
                </Container>
            </Menu>
        );
    }
}
// NavBar is not in a root is app.js. In order to be able to use history we have
// to add routing features to it here
export default withRouter(NavBar);

// {authenticated ? (
//    <Fragment>
//      <Menu.Item as={NavLink} to="/people" name="People" />
//      <Menu.Item>
//        <Button
//          positive
//          inverted
//          as={Link}
//          floated="right"
//          to="/createEvent"
//          content="Create Event"
//         />
//      </Menu.Item>
//      <SignedInMenu signOut={this.handleSignOut} />
//    </Fragment>
// ) : (
//   <SignedOutMenu signIn={this.handleSignIn} />