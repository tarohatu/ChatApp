import React from "react";
import PropTypes from "prop-types";
import { withRouter} from 'react-router';
import { Provider, Subscribe } from "unstated";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CreateItemContainer from "../../containers/CreateItemContainer";
import Button from "@material-ui/core/Button";

const CreateItem = props => {
  const { app, history } = props;
  return (
    <Provider>
      <Subscribe to={[CreateItemContainer]}>
        {container => {
        return (
          <Grid container spacing={3} justify="center">
            <Grid item lg={3} />
            <Grid item lg={6}>
              <Card elevation={0}>
                <CardContent>
                  <Grid container spacing={3} justify="center">
                    <Grid item lg={12}>
                      <TextField
                        fullWidth
                        placeholder="Title"
                        onChange={(e) => {container.handleChangeTitle(e.target.value)}}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                  <Grid item lg={12}>
                      <TextField
                        fullWidth
                        placeholder="Description"
                        onChange={(e) => {container.handleChangeDescription(e.target.value)}}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                <Grid item lg={4} />
                <Grid item lg={4}>
                  <Button
                    onClick={() => {container.handleCreateItem(app.getDb(), app.getUser(), history)}}
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
        )}}
      </Subscribe>
    </Provider>
  );
};

CreateItem.propTypes = {
  app: PropTypes.object.isRequired
};

export default withRouter(CreateItem);
