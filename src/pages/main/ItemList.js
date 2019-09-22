import React, { Component } from "react";
import { Provider, Subscribe } from "unstated";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ItemContainer from "../../containers/ItemListContainer";
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  container: {
    margin: "40px 0px, 40px, 0px",
    padding: "0px 0px 40px, 0px",
    backgroundColor: "#F6F6F6"
  },
  root: {
    flexWrap: "wrap"
  },
  tileRoot: {
    fontFamily: "uzura",
    background: "#B2707AC1"
  }
});

class ItemList extends Component {
  componentDidMount() {
    const { app, itemList } = this.props;
    try {
      itemList.readItems(app.getDb());
    } catch (err) { itemList.setError(err); }
  }

  componentWillUnmount() {
    try {
      const { itemList } = this.props;
      itemList.unregister();
    } catch (err) { }
  }

  redirectToCreate = () => {
    const { history } = this.props;
    history.push("/items/new");
  };

  render() {
    const { classes, itemList, history } = this.props;
    const { items, error } = itemList.state;

    const redirectToDetail = id => {
      history.push(`/items/details/${id}`);
    };

    return (
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={12}>
          <GridList cellHeight={180} cols={2} className={classes.root}>
            {items.map(item => (
              <GridListTile
                key={item.id}
                onClick={() => redirectToDetail(item.id)}
              >
                <img
                  src={item.item.createdBy.photoURL}
                  alt={item.item.data.title}
                />
                <GridListTileBar
                  title={item.item.data.title}
                  subtitle={<span>{item.item.data.description}</span>}
                  classes={{
                    root: classes.tileRoot
                  }}
                />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
        <Snackbar autoHideDuration={6000} open={!!error} message="エラーが発生しました" anchorOrigin={{ vertical: "bottom", horizontal: "center"}}/>
      </Grid>
    );
  }
}

const ItemListWithProps = withStyles(styles)(withRouter(ItemList));

const ItemListWrapper = props => {
  const { app } = props;
  return (
    <Provider>
      <Subscribe to={[ItemContainer]}>
        {items => <ItemListWithProps app={app} itemList={items} />}
      </Subscribe>
    </Provider>
  );
};

export default ItemListWrapper;
