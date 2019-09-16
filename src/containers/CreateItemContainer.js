import { Container } from "unstated";

class CreateItemContainer extends Container {
  state = {
    data: {
      imageURL: null,
      title: null,
      description: null,
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
        displayName
      }
    }
    await db.collection('items').add(item).catch((err) => {
      this.setState({
        error: err
      });
      return;
    });
    await this.setState({
      data: {},
      success: false,
      error: null
    });
    history.push('/items/home');
  }
}

export default CreateItemContainer;