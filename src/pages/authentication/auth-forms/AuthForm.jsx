import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';

// third party
import * as Yup from 'yup';
import { FieldArray, Formik, Form, useFormik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import axios from 'axios';
import { result, values } from 'lodash';

// ============================|| JWT - REGISTER ||============================ //
// const API = process.env.REACT_APP_API;

export default function AuthForm() {
  const [state, setState] = useState({
    product: '',
    brand: '',
    desc: '',
    qty: '',
    category: '',
    features: '',
    uom: '',
    duration: '',
    departement: '',
    id: ''
  });


  const createPR = async () => {
    const prResponse = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to create this Purchase Requisition?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: 'Yes, create it!',
      cancelButtonText: 'No, cancel!',
    });
  
    if (!prResponse.isConfirmed) return;
  
    try {
      const response = await fetch('http://127.0.0.1:5000/prform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          departement: state.departement,
          requester_name: state.requester_name,
          product: state.product,
          brand: state.brand,
          desc: state.desc,
          qty: state.qty,
          category: state.category,
          features: state.features,
          uom: state.uom,
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire('Success', 'User created successfully!', 'success');
        resetForm();
      } else {
        Swal.fire('Error', data.message || 'There was an error creating the user.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'There was an error creating the user.', 'error');
      console.error('Error:', error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const resetForm = () => {
    setState({
      departement: '',
      requester_name: '',
      product: '',
      brand: '',
      desc: '',
      qty: '',
      category: '',
      features: '',
      uom: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPR(state, resetForm);
  };
  

  // const {
  //   control,
  //   register,
  //   formState: { isSubmitSuccessful, errors }
  // } = useForm();

  return (
    <>
      <Formik>
      {/* {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => ( */}
          <form onSubmit={handleSubmit} >
                    <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Stack spacing={1}>
                          <InputLabel htmlFor="departement">Departement</InputLabel>
                          <OutlinedInput
                            id="departement"
                            type="text"
                            value={state.departement}
                            name="departement"
                            onChange={handleChange}
                            placeholder="Enter departement"
                            fullWidth
                            required
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} >
                        <Stack spacing={1}>
                          <InputLabel htmlFor="requester_name">Name</InputLabel>
                          <OutlinedInput
                            id="requester_name"
                            type="text"
                            value={state.requester_name}
                            name="requester_name"
                            onChange={handleChange}
                            placeholder="Enter Requester Name"
                            fullWidth
                            required
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="product">Product Name</InputLabel>
                          <OutlinedInput
                            id="product"
                            type="text"
                            value={state.product}
                            name="product"
                            onChange={handleChange}
                            placeholder="Enter product"
                            fullWidth
                            required
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="brand">Brand</InputLabel>
                          <OutlinedInput
                            id="brand"
                            type="text"
                            value={state.brand}
                            name="brand"
                            onChange={handleChange}
                            placeholder="Enter brand"
                            fullWidth
                            required
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} >
                        <Stack spacing={1}>
                          <InputLabel htmlFor="desc">Description</InputLabel>
                          <OutlinedInput
                            id="desc"
                            type="text"
                            value={state.desc}
                            name="desc"
                            onChange={handleChange}
                            placeholder="Enter desccription"
                            fullWidth
                            required
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="category">Category</InputLabel>
                          <OutlinedInput
                            id="category"
                            type="text"
                            value={state.category}
                            name="category"
                            onChange={handleChange}
                            placeholder="Enter category"
                            fullWidth
                            required
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="qty">Quantity</InputLabel>
                          <OutlinedInput
                            id="qty"
                            type="number"
                            value={state.qty}
                            name="qty"
                            onChange={handleChange}
                            placeholder="0"
                            fullWidth
                            required
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="uom">Unit Of Measures</InputLabel>
                          <OutlinedInput
                            id="uom"
                            type="text"
                            value={state.uom}
                            name="uom"
                            onChange={handleChange}
                            placeholder="UOM"
                            fullWidth
                            required
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                    
                        {/* <div className="my-2">
                            <input 
                                type="text" 
                                value={state.product}
                                onChange={(e) => setState({ ...state, product: e.target.value})}
                                className="form-control"
                                placeholder="Product"
                                name="product"
                                autoFocus
                            />
                        </div>
                        <div className="my-2">
                            <input 
                                type="text" 
                                value={state.brand}
                                onChange={(e) => setState({...state, brand: e.target.value})}
                                className="form-control"
                                placeholder="Brand"
                                name='brand'
                                autoFocus
                            />
                        </div>
                        <div className="my-2">
                            <input 
                                type="text" 
                                value={state.category}
                                onChange={(e) => setState({...state, category: e.target.value})}
                                className="form-control"
                                placeholder="category"
                                name='category'
                                autoFocus
                            />
                        </div> */}
                        <button 
                            type="submit"
                            className={`btn ${state.editing ? 'btn-primary': 'btn-info'} mt-4`}
                        >
                            {state.editing ? 'EDIT': 'CREATE'}
                        </button>
                        
          </form>
      {/* )} */}
      </Formik>
    </>
  );
}