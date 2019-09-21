import { Container } from "unstated";

class DetailContainer extends Container {
  state = {
    item: null,
    posts: [],
    error: null
  };

  readPosts(db, id) {
    try {
      const docs = db
        .collection("posts")
        .where("itemId", "==", id)
        .orderBy("createdAt", "desc");
      this.unsnapshot = docs.onSnapshot(snapShot => {
        const posts = [];
        snapShot.forEach(doc => {
          posts.push({
            id: doc.id,
            item: doc.data()
          });
        });
        this.setState({
          ...this.state,
          posts
        });
      });
    } catch (error) {
      this.setState({ ...this.state, error });
    }
  }

  async readItem(db, id, app) {
    const result = await db
      .collection("items")
      .doc(id)
      .get();
    const item = result.data();
    //app.changeAppHeader(item.data.title)
    this.setState({
      ...this.state,
      item
    });
  }

  unregister() {
    try {
      this.unsnapshot();
    } catch (error) {
      this.setState({ ...this.state, error });
    }
  }

  createPost(db, itemId, user, comment) {
    const { uid, photoURL, displayName } = user;
    const newData = {
      comment,
      itemId,
      createdAt: new Date().toISOString(),
      createdBy: {
        uid,
        photoURL,
        displayName
      }
    };
    db.collection("posts")
      .add(newData)
      .catch(err => {
        this.setState({
          ...this.state,
          error: err
        });
        return;
      });
    this.setState({
      ...this.state,
      error: null
    });
  }
}

export default DetailContainer;
