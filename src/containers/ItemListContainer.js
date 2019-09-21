import { Container } from "unstated";

class ItemListContainer extends Container {
  state = {
    items: []
  };

  readItems(db) {
    try {
      const docs = db.collection("items");
      this.unsnapshot = docs.onSnapshot(snapShot => {
        const items = [];
        snapShot.forEach(
          doc => {
            items.push({
              id: doc.id,
              item: doc.data()
            });
          },
          error => {
            this.setState({ error });
          }
        );
        this.setState({
          ...this.state,
          items
        });
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  unregister() {
    this.unsnapshot();
  }
}

export default ItemListContainer;
