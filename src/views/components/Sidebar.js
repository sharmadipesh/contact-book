import React, { Component } from 'react';

class Sidebar extends Component {
    state = {  }
    render() { 
        console.log(this.props,"  fff ")
        const pathname = this.props.location.pathname ;

        return ( <div className="sidebar-container">
                <div className="clickable" onClick={()=>this.props.history.push('/')}>
                    {pathname == '/' ? 
                        <img src='/img/contact-active.svg' height="50px" width="40px" className="mb-15"/>
                        :
                        <img src='/img/contact.svg' height="50px" width="40px" className="mb-15"/>
                    }
                </div>
                <div className="clickable" onClick={()=>this.props.history.push('/favourite-list')}>
                    {pathname == '/favourite-list' ? 
                        <img src='/img/fav-active.svg' height="50px" width="40px" className="mb-15"/>
                        :
                        <img src='/img/fav.svg' height="50px" width="40px" className="mb-15"/>
                    }
                </div>
        </div>);
    }
}
 
export default Sidebar;