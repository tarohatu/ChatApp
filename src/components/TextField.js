import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Text from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  articleText: {
    fontSize: "14px",
    padding: "0px 0px 0px 0px",
  },
  articleTextField: {
    margin: "0px 0px 0px 0px",
    padding: "0px 0px 0px 0px"
  }
}));

const TextField = props => {
  const { onChange, value, placeholder } = props;
  const classes = useStyles();
  return (
    <Text
      id="comment"
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      value={value}
      onChange={onChange}
      className={classes.articleTextField}
      InputProps={{
        classes: { input: classes.articleText }
      }}
    />
  );
};

TextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

export default TextField;
