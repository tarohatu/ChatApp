import { Container } from "unstated";

class ItemListContainer extends Container {
  state = {
    items: []
  }

  async readItems(db) {
    const docs = await db.collection('items');
    const unsubscribe = await docs.onSnapshot( async (snapShot) => {
      const items = snapShot.docChanges().map((doc) => doc.data());
      await this.setState({
        items
      });
    });
    this.unsubscribe = unsubscribe;
  }
}

export default ItemListContainer;