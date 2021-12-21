import React, {useState} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux';
import useStyles from './styles'
import {createProduct} from '../../actions/products'

const Form = () => {
    const [productData, setProductData] = useState({
        name:'', price: '', description:'', productImage:'', category:''
    })
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault();

        dispatch(createProduct(productData));
    }

    const clear= () =>{

    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a Product</Typography>
                <TextField name="name" variant="outlined" label="Product Name" fullWidth value={productData.name} onChange={(event)=>setProductData({...productData, name: event.target.value})} />
                <TextField name="price" variant="outlined" label="Product Price" fullWidth value={productData.price} onChange={(event)=>setProductData({...productData, price: event.target.value})} />
                <TextField name="description" variant="outlined" label="Description" fullWidth value={productData.description} onChange={(event)=>setProductData({...productData, description: event.target.value})} />
                <TextField name="category" variant="outlined" label="Category" fullWidth value={productData.category} onChange={(event)=>setProductData({...productData, category: event.target.value})} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64})=>setProductData({...productData, productImage: base64})} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;