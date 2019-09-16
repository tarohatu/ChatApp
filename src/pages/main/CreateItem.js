import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { Provider, Subscribe } from "unstated";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CreateItemContainer from "../../containers/CreateItemContainer";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    height: "90vh",
    background: theme.palette.background.paper
  },
  container: {},
  divider: {
    margin: theme.spacing(3)
  }
}));

const CreateItem = props => {
  const { app, history } = props;
  const classes = useStyles();
  return (
    <Provider>
      <Subscribe to={[CreateItemContainer]}>
        {container => {
          return (
            <Grid
              container
              spacing={3}
              justify="center"
              className={classes.root}
            >
              <Grid item lg={12} style={{ width: "100%" }}>
                <Card elevation={0}>
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                      justify="center"
                      className={classes.container}
                    >
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          autoFocus
                          required
                          error={container.state.data.title === ''}
                          helperText={container.state.data.title === '' ? '必須項目です' : null}
                          placeholder="Title*"
                          onChange={e => {
                            container.handleChangeTitle(e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <div className={classes.divider} />
                    <Grid
                      container
                      spacing={3}
                      justify="center"
                      className={classes.container}
                    >
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows="4"
                          placeholder="Description"
                          onChange={e => {
                            container.handleChangeDescription(e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <div className={classes.divider} />
                    <Grid
                      container
                      spacing={3}
                      justify="center"
                      className={classes.container}
                    >
                      <Grid item xs={4}>
                        <Button
                          onClick={() => {
                            container.handleCreateItem(
                              app.getDb(),
                              app.getUser(),
                              history
                            );
                          }}
                          disabled={container.state.data.title === ''}
                          variant="contained"
                          color="primary"
                        >
                          登録する
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          );
        }}
      </Subscribe>
    </Provider>
  );
};

CreateItem.propTypes = {
  app: PropTypes.object.isRequired
};

export default withRouter(CreateItem);
