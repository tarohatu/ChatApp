import React, { Component } from 'react';
import { Provider, Subscribe } from 'unstated';
import ItemContainer from '../../containers/ItemListContainer';

class ItemList extends Component {

  async componentDidMount() {
    const { app, itemList } = this.props;
    await itemList.readItems(app.getDb());
  }

  render() {
    return (<div>aaa</div>);
  }
}

const ItemListWrapper = (props) => {
  const { app } = props;
  return(
    <Provider>
      <Subscribe to={[ItemContainer]}>
        {(items) => (
          <ItemList app={app} itemList={items} />
        )}
      </Subscribe>
    </Provider>
  )
}

export default ItemListWrapper;
