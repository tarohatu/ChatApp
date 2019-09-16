import { Container } from "unstated";

class DetailContainer extends Container {
  state = {
    item: null,
    posts: [],
    error: null
  }

  readPosts(db, id) {
    const docs = db.collection('posts').where('itemId', '==', id).orderBy('createdAt', 'desc');
    docs.onSnapshot((snapShot) => {
      const posts = [];
      snapShot.forEach((doc) => {
        posts.push({
          id: doc.id,
          item: doc.data()
        });
      });
      this.setState({
        posts
      });
    });
  }

  async readItem(db, id, app) {
    const result = await db.collection('items').doc(id).get();
    const item = result.data();
    //app.changeAppHeader(item.data.title)
    this.setState({
      item
    });
  }

  async createPost(db, itemId, user, comment) {
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
    }
    await db.collection('posts').add(newData).catch((err) => {
      this.setState({
        error: err
      });
      return;
    });
    this.setState({
      postData: {
        comment: '',
      },
      error: null
    });
  }
}

export default DetailContainer;