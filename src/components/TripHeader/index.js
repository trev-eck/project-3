import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/box";
import { withRouter } from "react-router-dom";

class TripHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const path = this.props.location.pathname.slice(18);
    console.log("path: ", path);
    return (
      <div>
        <Container maxWidth="md">
          <Box
            display="flex"
            style={{ justifyContent: "space-between", padding: 10 }}
          >
            <h1>
              {path.length > 0 ? <div>{path}</div> : <div>{this.props.header}</div>}
            </h1>

          </Box>
        </Container>
      </div>
    );
  }
}

export default withRouter(TripHeader);
