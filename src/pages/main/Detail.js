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
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AppBar from "../shared/AppBar";

moment.locale("ja");

const styles = theme => ({
  root: {
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    margin: "0px 0px, 0px, 0px"
  },
  icon: {
    color: "white"
  },
  textArea: {
    background: "#F3F4F5",
    position: "fixed",
    bottom: "0px",
    padding: "0px 0px 0px 0px",
    margin: "10px 0px 0px -15px"
  },
  list: {
    margin: "0px 0px 80px 0px"
  },
  comment: {},
  button: {},
  articleText: {
    fontSize: "14px",
    padding: "0px 0px 0px 0px",
  },
  articleTextField: {
    margin: "0px 0px 0px 0px",
    padding: "0px 0px 0px 0px"
  }
});

class DetailPage extends Component {
  constructor() {
    super();
    this.state = {
      comment: ""
    };
  }

  componentDidMount() {
    const { app, detail, match } = this.props;
    detail.readPosts(app.getDb(), match.params.id);
  }

  componentWillUnmount() {
    const { detail } = this.props;
    detail.unregister();
  }

  handleBack = () => {
    const { history } = this.props;
    history.push("/items/home");
  };

  render() {
    const { app, detail, match, classes } = this.props;
    const { comment } = this.state;

    const handleChangeComment = e => {
      this.setState({
        ...this.state,
        comment: e.target.value
      });
    };

    const createPost = (db, id, user, comment) => {
      detail.createPost(db, id, user, comment);
      this.setState({
        ...this.state,
        comment: ""
      });
    };

    const backIcon = (
      <IconButton onClick={this.handleBack}>
        <ArrowBackIcon className={classes.icon} />
      </IconButton>
    );

    return (
      <>
        <AppBar
          app={app}
          user={app.getUser()}
          children={backIcon}
          {...this.props}
        />
        <Grid container spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.list}>
              <List>
                {detail.state.posts.map(post => {
                  return (
                    <div key={post.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar src={post.item.createdBy.photoURL}></Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={post.item.comment}
                          secondary={`${
                            post.item.createdBy.displayName
                          }さんが${moment(post.item.createdAt).format(
                            "YYYY/MM/DD HH:mm"
                          )}に投稿しました`}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          className={classes.textArea}
          alignItems="center"
          justify="flex-start"
        >
          <Grid item xs={8} className={classes.comment}>
            <TextField
              id="comment"
              placeholder="コメントを入力"
              fullWidth
              multiline
              rowsMax={3}
              variant="outlined"
              value={comment}
              onChange={handleChangeComment}
              className={classes.articleTextField}
              InputProps={{
                classes: { input: classes.articleText }
              }}
            />
          </Grid>
          <Grid item xs={2} className={classes.button}>
            <Button
              fullWidth
              disabled={comment === ""}
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
      </>
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
