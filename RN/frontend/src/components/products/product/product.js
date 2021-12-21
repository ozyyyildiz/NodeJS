import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import useStyles from './styles'

const Product = ({product}) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={product.productImage} title={product.name}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{product.price}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color:'white'}} size="small" onClick={()=>{}}>AddToCart</Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{product.description}</Typography>
            </div>
        </Card>
    );
}

export default Product;