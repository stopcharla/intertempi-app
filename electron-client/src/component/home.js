import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RestService from '../service/restAPIService';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    async componentWillMount() {
        let result = await RestService.getUserHomePage()
        console.log('homepage result::',result)
        if (!result) {
            this.props.history.push('/');
        }
        this.setState({items:result.data.items})
    }

    productListHTML() {
        // var _self = this;
        return this.state.items.map((item) => {
            return <div  className="HomePage_Item">
                <img className='HomePage_ItemImage' src={item.media.m} alt="Avatar" />
                {/* <div style={{ padding: '2px 16px' }}> */}
                <div>
                    <h4><b>{item.title}</b></h4>
                </div>
                
            </div>;
        })
    }

    async handleLogout(e) {
        e.preventDefault();
        await RestService.logout()
        this.props.history.push('/');
    }

    render() {
        return (

            <div className='HomePage'>
                <div className="HomePage_Header">
                    <h2 style={{display: 'inline-block',color:'white'}}>Your daily pick of images</h2><span style={{padding:'250px'}}></span><button className="HomePage_Logout" onClick={this.handleLogout}>logout</button>
                </div>
             <div style={{ paddingTop: '5px' }}>
                {this.productListHTML()}
            </div>

            
        </div>
        );
    }
}

export default Home;