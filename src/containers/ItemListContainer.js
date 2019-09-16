import { Container } from "unstated";

class ItemListContainer extends Container {
  state = {
    items: []
  }

  readItems(db) {
    const docs = db.collection('items');
    docs.onSnapshot((snapShot) => {
      const items = []
      snapShot.forEach((doc) => {
        items.push({
          id: doc.id,
          item: doc.data()
        });
      });
      this.setState({
        items
      })
    });
  }
}

export default ItemListContainer;