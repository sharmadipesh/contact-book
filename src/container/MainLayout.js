import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import {Routes} from 'config/Routes';
import ContactList from 'views/contact-list/ContactList';
import FavouriteContacts from 'views/fav-contact/FavouriteContact';
import Sidebar from 'views/components/Sidebar';

class MainLayout extends Component {
    render() {
        return (
            <div>
                <Sidebar {...this.props}/>
                <div>
                    <Switch>
                        <Route exact  {...this.props} path={Routes.ContactList} component={ContactList} />
                        <Route   {...this.props} path={Routes.FavouriteList} component={FavouriteContacts} />
                    </Switch>
                </div> 
            </div>
        );
    }
}

export default MainLayout;