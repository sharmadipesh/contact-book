import React, { Component } from 'react';
import { Row, Col, Card, Avatar,Button, notification  } from 'antd';
import {connect} from 'react-redux';
import idx from 'idx';
import {removeFavouriteHandler} from 'redux/actions/Auth';
import { SmileOutlined } from '@ant-design/icons';


class FavouriteContact extends Component {
    state = {  }


    removeFromFav = (currentData) =>{
        let fav_arry = [...this.props.favourite_list];
        let updated_array = this.removeByAttr(fav_arry,'id',currentData.id);

        // console.log("updated_array ",updated_array)
        this.props.removeFavouriteHandler(updated_array,()=>{
            // message.success('Removed Successfullt ;)');
            notification.open({
                message: 'Removed Successfully',
                icon: <SmileOutlined style={{ color: '#794c74' }} />,
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
    
        return ( 
            <div className="ptb-30">
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <div className="mb-20 header-style">
                            Favourite List
                        </div>
                        {idx(this.props.favourite_list,_=>_.length)?
                            idx(this.props.favourite_list,_=>_.map((value,index)=>
                                <Card 
                                    key={index} 
                                    className="mb-20 contact-card-style"
                                >
                                    <div className="contact-details-container">
                                        <div className="contact-infor">
                                            <Avatar className="mr-15" size={55} src={idx(value,_=>_.avatar)} />
                                            <div>
                                                <div className="contact-name">{`${idx(value,_=>_.first_name)} ${idx(value,_=>_.last_name)}`}</div>
                                                <div className="contact-email">{idx(value,_=>_.email)}</div>
                                            </div>
                                        </div>
                                        <div className="contact-time fav-contact">
                                            {/* 10:42AM */}
                                            <div>
                                                {value.id}
                                            </div>
                                            <div>
                                                <Button size="small" onClick={()=>this.removeFromFav(value)} danger>
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                    ))
                        :
                        <div className="mb-20 not-available">
                            Not Available :(
                        </div>
                        }
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div> 
            );
    }
}
 
// export default FavouriteContact;
function mapStateToProps(state){
    return{
        favourite_list:state.Auth.favourite_list
    }
}

export default connect(mapStateToProps,{
    removeFavouriteHandler
})(FavouriteContact);