import { Container } from "unstated";

class ItemListContainer extends Container {
  state = {
    items: []
  }

  async readItems(db) {
    const docs = await db.collection('items');
    const unsubscribe = docs.onSnapshot((snapShot) => {
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
    this.unsubscribe = unsubscribe;
  }
}

export default ItemListContainer;