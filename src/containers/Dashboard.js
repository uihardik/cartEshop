import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Carousel, Card, Col, Row  } from 'antd';

class Dashboard extends Component {

  state = {
    sum:''
  }

   constructor (props) {
    super(props)
  }

  componentDidMount() {
    let totalPrice =[];
      this.props.item.map((value) =>{
        totalPrice.push(value.price)
        var sum = totalPrice.reduce((a, b) => a + b, 0);
        this.setState({sum,sum})
      });
  }

    // set Cost of courier
  renderSwitch(weight) {
      if(weight <= 200){
        return <span>$5</span>
      }else if(weight <= 500){
        return <span>$10</span>
      }else if(weight <= 1000){
        return <span>$15</span>
      }else if(weight <= 5000){
        return <span>$20</span>
      }else{
        return <span>$22</span>
      }
  }

  // Join item Array
  renderItem(item) {
    if(item){
      let ItemJoin = item.join(", ");
      return <span>{ItemJoin}</span>
    }
  }

  render () {
      const {item} = this.props;
      let img1 = require('../styles/images/img1st.jpg');
      let img2 = require('../styles/images/imagestwo.jpg');
      let img3 = require('../styles/images/img3rd.jpg');
      let img4 = require('../styles/images/img1st.jpg');

    // Set Single Item List
    const listArryItems = item?(item.map((itemList) =>
      itemList.item
    )):null;

    const listItems = this.renderItem(listArryItems)
    // get Array of Item weight List
    const weight = item?(item.map((itemWeight) =>{
      return itemWeight.weight;
    })):null;
    // Sum Of Total Weight Of Item
    const weightSum =  weight.length?(weight.reduce((a,b)=> a+b)):null;
    
    // Get courier cost 
    const courierCost = this.renderSwitch(weightSum);

    // get Array of Item Price List
    const ItemPrices = item?(item.map((itemPrice) =>{
      return itemPrice.price;
    })):null;
    
    // Sum Of Total Price Of Item
    const PriceSum = ItemPrices.length?(ItemPrices.reduce((a,b)=> a+b)):null;
    
    //  Split with multiple Items if total price upto 250 other wise in same packages 
    const ItemList = this.state.sum >= 251 ? (
      item.map((value,index) =>
        <Card style={{ width: 300 }} title={"packages "+(index+1)}>
          <p><label>Items: </label> <span>{value.item}</span></p>
          <p><label>Weight: </label> <span>{value.weight}g</span></p>
          <p><label>Total Price: </label> ${value.price}</p>
          <p><label>Courier Cost: </label> {this.renderSwitch(value.weight)}</p>
      </Card>
      )
    ):(
      <Card style={{ width: 300 }} title="packages 1">
        <p><label>Items: </label> {listItems}</p>
        <p><label>Total Weight: </label> {weightSum}g</p>
        <p><label>Total Price: </label> ${PriceSum}</p>
        <p><label>Courier Cost: </label> {courierCost}</p>
      </Card>
    )

    return (
      <div className="dashBoard">
        <div className="dashcarousel">
          <Carousel autoplay>
            <div><img src={img1} alt="img1" width="100%" height="auto"/></div>
            <div><img src={img2} alt="img1" width="100%" height="auto"/></div>
            <div><img src={img3} alt="img1" width="100%" height="auto"/></div>
            <div><img src={img4} alt="img1" width="100%" height="auto"/></div>
          </Carousel>
        </div>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          {item.length > 0 ? (
            <Row gutter={16}>
              <Col span={8}>
                {ItemList}
            </Col>
          </Row>
          ):(
            <Row gutter={16}>
              <Col span={8}>
                <Card style={{ width: 300 }} title="No Packages">
                  <p>No Item</p>
                </Card>
              </Col>
            </Row>
          )
          }    
        </div>
      </div>
    )
  }
}

function select (state) {
  return {
    item: state.item
  }
}

export default connect(select)(Dashboard)
