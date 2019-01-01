import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  List, Avatar, Button,Row, Col,notification } from 'antd';

  import{CartItemSet} from './../actions'
  import {Link} from 'react-router-dom'

import reqwest from 'reqwest';

const count = 3;
//const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
const fakeDataUrl = `http://www.mocky.io/v2/5c2502ab3000007c007a6256`;

class Home extends Component {

  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
    setitem: []
  }

   constructor (props) {
    super(props)

    this.ItemAdded = this.ItemAdded.bind(this)
  }

  componentDidMount() {
    this.getData((res) => {
      this.setState({
        initLoading: false,
        data: res.data,
        list: res.data,
      });
    });
  }

  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, item: {} }))),
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.data);
      this.setState({
        data,
        list: data,
        loading: false,
      }, () => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
    });
  }

  render () {

    const { initLoading, loading, list } = this.state;
    const loadMore = !initLoading && !loading ? (
      <div style={{
        textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
      }}
      >
        <Button onClick={this.onLoadMore}>loading more</Button>
      </div>
    ) : null;

    const openNotification = (item) => {
      this.ItemAdded(item)
      //this.setitem.push('1')
      //this.setState([...state.setitem, action.place])
      notification.open({
        message: `${item.item}`,
        description: `${item.item}`+' is Added in Our cart.This you can continue shoping and get the notification. This is the content of the notification.',
        style: {
          width: 600,
          marginLeft: 335 - 600,
        },
      });
    };

    return (
      <article>
        <div>
          <section className='text-section'>
             <Link to='/dashboard' className='btn btn--dash btn--nav'>Place order</Link>
              <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="verticle"
                loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                  <List.Item actions={[<a onClick={(e) => openNotification(item)}>Add</a>]}>
                      <List.Item.Meta
                        avatar={<Avatar src="http://www.fourarm.com/Images/Product.png" />}
                        title={<a href="https://ant.design">{item.item}</a>}
                        description={<span>{item.weight}</span>}
                      />
                      <div>Price: ${item.price}</div>
                  </List.Item>
                )}
              />
            </section>
        </div>
      </article>
    )
  }

  async ItemAdded (item1) {
    await this.props.dispatch(CartItemSet(item1,(res) => {
    }
    ));
  }
}

function select (state) {
  return {
    data: state.item
  }
}

export default connect(select)(Home)