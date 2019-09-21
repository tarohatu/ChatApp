import { Container } from "unstated";

class ItemListContainer extends Container {
  state = {
    items: []
  }

  readItems(db) {
    const docs = db.collection('items');
    this.unsnapshot = docs.onSnapshot((snapShot) => {
      const items = []
      snapShot.forEach((doc) => {
        items.push({
          id: doc.id,
          item: doc.data()
        });
      });
      this.setState({
        ...this.state,
        items
      })
    });
  }

  unregister() {
    this.unsnapshot()
  }
}

export default ItemListContainer;