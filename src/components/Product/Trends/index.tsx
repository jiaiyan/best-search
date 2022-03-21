import React from "react";
import Grid from '@material-ui/core/Grid'

const Trends: React.FC = (props) => {
    return (
        <Grid container spacing={2}>
            {props.children}
        </Grid>
    )
}

export default Trends