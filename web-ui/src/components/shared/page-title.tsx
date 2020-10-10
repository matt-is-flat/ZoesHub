import { makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    titleText: {
        fontSize: '3em'
    }
}));

interface PageTitleProps {
    primary: string;
}

const PageTitle = (props: PageTitleProps): JSX.Element => {
    const classes = useStyles();

    return (
        <Typography variant="h1" className={classes.titleText} gutterBottom>
            {props.primary}
        </Typography>
    );
};

export { PageTitle };