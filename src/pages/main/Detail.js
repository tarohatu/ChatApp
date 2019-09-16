import React, { Component } from "react";
import { Provider, Subscribe } from "unstated";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import DetailContainer from "../../containers/DetailContainer";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    margin: "40px 0px, 0px, 0px"
  },
  textArea: {
    background: "#F3F4F5",
    position: "fixed",
    bottom: "0px"
  },
  list: {
    width: '100%',
    height: '100%',
    margin: '0px 0px 40px 0px'
  }
});

class DetailPage extends Component {
  constructor() {
    super();
    this.state = {
      comment: ""
    };
  }

  async componentDidMount() {
    const { app, detail, match } = this.props;
    await detail.readItem(app.getDb(), match.params.id);
    detail.readPosts(app.getDb(), match.params.id);
  }

  render() {
    const { app, detail, match, classes } = this.props;
    const { comment } = this.state;

    const handleChangeComment = e => {
      this.setState({
        comment: e.target.value
      });
    };

    const createPost = async (db, id, user, comment) => {
      await detail.createPost(db, id, user, comment);
      this.setState({
        comment: ""
      });
    };

    return (
      <Grid container>
        <Grid container>
          <Grid item lg={12}>
            <List className={classes.list}>
              {detail.state.posts.map(post => {
                return (
                  <div key={post.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={post.item.createdBy.photoURL}></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={post.item.comment} secondary={post.item.createdBy.displayName} />
                    </ListItem>
                    <Divider/>
                  </div>
                );
              })}
            </List>
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.textArea}
          alignItems="center"
          justify="center"
        >
          <Grid item lg={11}>
            <TextField
              id="comment"
              placeholder="コメントを入力"
              fullWidth
              variant="outlined"
              value={comment}
              onChange={handleChangeComment}
            />
          </Grid>
          <Grid item lg={1}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() =>
                createPost(app.getDb(), match.params.id, app.getUser(), comment)
              }
            >
              送信
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const DetailPageWithProps = withStyles(styles)(withRouter(DetailPage));

const DetailPageWrapper = props => {
  const { app } = props;

  return (
    <Provider>
      <Subscribe to={[DetailContainer]}>
        {detail => <DetailPageWithProps app={app} detail={detail} />}
      </Subscribe>
    </Provider>
  );
};

export default DetailPageWrapper;
