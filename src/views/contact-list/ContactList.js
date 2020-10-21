import React, { Component } from 'react';
import { Row, Col, Card, Avatar,Drawer,Button,notification,Menu, Dropdown } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';
import {reduxSetup,contactListHandler,contactDetailsHandler,addFavouriteHandler,removeFavouriteHandler} from 'redux/actions/Auth';
import idx from 'idx';
import { SmileOutlined } from '@ant-design/icons';


class ContactList extends Component {
    state = { 
        isDrawerVisible:false,
        currentRowData:{},
        isExist:false,
        contactStateData:[]
     }

     openDrawer = async (currentData) =>{
        await this.props.contactDetailsHandler(currentData.id);
        let existInFavourite = await this.contactExist(currentData.id);

        this.setState({
            isDrawerVisible:true,
            currentRowData:currentData,
            isExist:existInFavourite
        })
     }

     sortingAtoZ = (a,b) => {
        if ( a.first_name < b.first_name ){
            return -1;
        }
        if ( a.first_name > b.first_name ){
            return 1;
        }
        return 0;
    };
    
    sortingZtoA = (a,b) => {
        if ( a.first_name > b.first_name ){
            return -1;
        }
        if ( a.first_name < b.first_name ){
            return 1;
        }
        return 0;
    };

    sortingOperationHandler = async (order) =>{
        let data = []
        if(order){
            data = await this.state.contactStateData.sort(this.sortingZtoA);
        }else{
            data = await this.state.contactStateData.sort(this.sortingAtoZ);
        }
        // console.log("sortingOperationHandler ",data)
        this.setState({
            contactStateData:data
        })
    }

     addToFavouriteHandler = (value) =>{
        this.props.addFavouriteHandler(value,()=>{
            let existInFavourite =  this.contactExist(value.id);
            this.setState({
                isExist:existInFavourite
            })
            notification.open({
                message: 'Add to favourite Successfully',
                icon: <SmileOutlined style={{ color: '#794c74' }} />,
                placement:"topLeft"
            });
        })
     }


     closeDrawer = () =>{
        this.setState({
            isDrawerVisible:false,
            isExist:false
         })
     }

    componentDidMount = async() =>{
        this.props.reduxSetup();
        await this.props.contactListHandler();   
        await  this.setState({
            contactStateData:this.props.contact_list_data.data
        })
    }

    contactExist = (id) =>{
        if(idx(this.props.favourite_list,_=>_.length)){
          const value = this.props.favourite_list.some(el => el.id === id)
          return value
        }

        return false;
    }

    removeFromFav = (currentData) =>{
        let fav_arry = [...this.props.favourite_list];
        let updated_array = this.removeByAttr(fav_arry,'id',currentData.id);

        // console.log("updated_array ",updated_array)
        this.props.removeFavouriteHandler(updated_array,()=>{
            let existInFavourite = this.contactExist(currentData.id);
            this.setState({
                isExist:existInFavourite
            })
            notification.open({
                message: 'Remove from favourite Successfully',
                icon: <SmileOutlined style={{ color: '#794c74' }} />,
                placement:'topLeft'
            });
        })
    }

    removeByAttr = (arr, attr, value) => {
        var i = arr.length;
        while(i--){
           if( arr[i] 
               && arr[i].hasOwnProperty(attr) 
               && (arr[i][attr] === value ) ){ 
    
               arr.splice(i,1);
    
           }
        }
        return arr;
    }

    render() { 

        console.log(this.state.contactStateData," ########")

        const menu = (
            <Menu>
                <Menu.Item key="1"  onClick={()=>this.sortingOperationHandler(0)}>
                    A to Z              
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2" onClick={()=>this.sortingOperationHandler(1)}>
                  Z to A
                </Menu.Item>
            </Menu>
          );


        return ( 
        <div className="ptb-30">
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <div className="mb-20 header-style">
                        <div>
                            Contact List
                        </div>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <div className="ant-dropdown-link clickable">
                                <img src="/img/menu.svg" height="30px" width="20px"/>
                            </div>
                        </Dropdown>
                    </div>
                    {idx(this.state.contactStateData,_=>_.length) ?
                        idx(this.state.contactStateData,_=>_.map((value,index)=>
                            <Card 
                                key={index} 
                                className="mb-20 contact-card-style clickable"
                                onClick={() => this.openDrawer(value)}
                            >
                                <div className="contact-details-container">
                                    <div className="contact-infor">
                                        <Avatar className="mr-15" size={55} src={idx(value,_=>_.avatar)} />
                                        <div>
                                            <div className="contact-name">{`${idx(value,_=>_.first_name)} ${idx(value,_=>_.last_name)}`}</div>
                                            <div className="contact-email">{idx(value,_=>_.email)}</div>
                                        </div>
                                    </div>
                                    <div className="contact-time">
                                        {/* 10:42AM */}
                                        {value.id}
                                    </div>
                                </div>
                            </Card>
                        ))
                    :null}
                </Col>
                <Col span={8}></Col>
            </Row>
            <Drawer
                title="Contact Information"
                placement="right"
                closable={false}
                onClose={this.closeDrawer}
                visible={this.state.isDrawerVisible}
                // width={275}
            >
                <div>
                    <Avatar className="mb-15" size={90} src={idx(this.props.contact_user_details,_=>_.avatar)} />
                    <div className="details-label">
                        First name
                    </div>
                    <div className="details-value mb-10">
                        {idx(this.props.contact_user_details,_=>_.first_name)}
                    </div>
                    <div className="details-label">
                        Last name 
                    </div>
                    <div className="details-value mb-10">
                        {idx(this.props.contact_user_details,_=>_.last_name)}
                    </div>
                    <div className="details-label">
                        Email
                    </div>
                    <div className="details-value mb-20">
                        {idx(this.props.contact_user_details,_=>_.email)}
                    </div>
                    {!this.state.isExist ?
                        <Button type="primary" block onClick={()=>this.addToFavouriteHandler(this.props.contact_user_details)}>
                            Add to favourite
                        </Button>
                    :
                        <Button type="primary" block onClick={()=>this.removeFromFav(this.props.contact_user_details)}>
                            Remove from favourite
                        </Button>
                    }
                </div>
            </Drawer>
        </div> );
    }
}
 
// export default ContactList;
function mapStateToProps(state){
    return{
        contact_list_data:state.Auth.contact_list_data,
        contact_user_details:state.Auth.contact_user_details,
        favourite_list:state.Auth.favourite_list
    }
}

export default connect(mapStateToProps,{
    contactListHandler,
    reduxSetup,
    contactDetailsHandler,
    addFavouriteHandler,
    removeFavouriteHandler
})(ContactList);