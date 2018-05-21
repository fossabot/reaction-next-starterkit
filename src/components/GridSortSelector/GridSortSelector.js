import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Select from "material-ui/Select";
import MenuItem from "material-ui/Menu/MenuItem";
import keyMirror from "keymirror";

const SORT_OPTIONS = keyMirror({
  "Newest": null,
  "Price: low to high": null,
  "Price: high to low": null
});

const styles = (theme) => ({
  root: {
    display: "flex"
  }
});

@withStyles(styles)
class GridSortSelector extends Component {
  static propTypes = {
    classes: PropTypes.object
  }
  state = {
    pageSize: SORT_OPTIONS["Newest"]
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  renderOptions() {
    return (
      Object.keys(SORT_OPTIONS).map((key) => (
        <MenuItem key={key} value={key}>{`${key}`}</MenuItem>
      ))
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Select
          value={this.state.pageSize}
          onChange={this.handleChange}
          autowidth={true}
          inputProps={{
            name: "gridSort",
            id: "gridSort"
          }}
        >
          {this.renderOptions()}
        </Select>
      </div>
    );
  }
}

export default GridSortSelector;
