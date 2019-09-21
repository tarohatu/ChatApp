import { Container } from "unstated";
import firebase from 'firebase';

class CreateItemContainer extends Container {
  state = {
    data: {
      imageURL: null,
      title: '',
      description: '',
    },
    success: false,
    error: null
  }

  handleChangeImageURL(imageURL) {
    this.setState({
      data: {
        ...this.state.data,
        imageURL
      }
    });
  }

  handleChangeTitle(title) {
    this.setState({
      data: {
        ...this.state.data,
        title
      }
    });
  }

  handleChangeDescription(description) {
    this.setState({
      data: {
        ...this.state.data,
        description
      }
    });
  }

  async handleCreateItem(db, user, history) {
    const { data } = this.state;
    const { uid, photoURL, displayName } = user;
    const item = {
      data,
      createdBy: {
        uid,
        photoURL,
        displayName,
      },
      createdAt: firebase.firestore.Timestamp.now()
    }
    await db.collection('items').add(item).catch((err) => {
      this.setState({
        ...this.state,
        error: err
      });
      return;
    });
    await this.setState({
      ...this.state,
      data: {},
      success: false,
      error: null
    });
    history.push('/items/home');
  }
}

export default CreateItemContainer;