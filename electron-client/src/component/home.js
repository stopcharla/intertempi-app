import React, { Component } from 'react';
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
        await this.getItems();
    }

    async getItems(){
        this.setState({isLoading:true});
        let result = await RestService.getUserHomePage();
        if (!result) {
            this.props.history.push('/');
        }
        this.setState({items:this.state.items.concat(result.data.items)});
        return;
    }

    productListHTML() {
        return this.state.items.map((item) => {
            const title = item.title.trim() || 'Untitled Image';
            return <div  className='HomePage_Item'>
                <img className='HomePage_ItemImage' src={item.media.m} alt='flickrImage'/>
                <div className='HomePage_ItemTitle'>
                    <h4><b>{title}</b></h4>
                </div>
                
            </div>;
        })
    }

    async handleLogout(e) {
        e.preventDefault();
        await RestService.logout();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className='HomePage'>
                <div className='HomePage_Header'>
                    <h2 className='HomePage_Message'>Your daily pick of images</h2>
                    <button className='HomePage_Logout' onClick={this.handleLogout}>logout</button>
                </div>
             <div className='HomePage_Items'>
                {this.productListHTML()}
            </div>
            
        </div>
        );
    }
}

export default Home;