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

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// ============================|| JWT - REGISTER ||============================ //
// const API = process.env.REACT_APP_API;

export default function AuthForm() {
  const [formData, setFormData] = useState({
    product: '',
    brand: '',
    desc: '',
    qty: '',
    category: '',
    features: '',
    uom: '',
    duration: '',
    department: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data); // Handle success response
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const {
    control,
    register,
    formState: { isSubmitSuccessful, errors }
  } = useForm();

  return (
    <>
      <Formik
        initialValues={{
          rfr_no: '',
          rfr_date: '',
          product: '',
          brand: '',
          desc: '',
          qty: '',
          category: '',
          features: '',
          uom: '',
          duration: '',
          departement: '',
          submit: false
        }}
        validationSchema={Yup.object().shape({
          rfr_no: Yup.string().max(255).required('RFR No is required'),
          rfr_date: Yup.string().max(255).required('RFR Date is required'),
          product: Yup.string().max(255).required('Product is required'),
          brand: Yup.string().max(255).required('Brand is required'),
          qty: Yup.string().max(255).required('Quantity is required'),
          category: Yup.string().max(255).required('Category is required'),
          duration: Yup.string().max(255).required('Duration is required'),
          departement: Yup.string().max(255).required('Departement is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form
            onSubmit={async ({ formData, data, formDataJson, event }) => {
              await axios.fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                  'Content-Type' : 'application/json'
                },
                body: formData
              });
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="product-pr">Product Name*</InputLabel>
                  <OutlinedInput
                    id="product-pr"
                    type="product"
                    value={values.product}
                    name="product"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.product && errors.product)}
                  />
                </Stack>
                {touched.product && errors.product && (
                  <FormHelperText error id="helper-text-product-pr">
                    {errors.product}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="brand-pr">Brand*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.brand && errors.brand)}
                    id="brand-pr"
                    type="brand"
                    value={values.brand}
                    name="brand"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </Stack>
                {touched.brand && errors.brand && (
                  <FormHelperText error id="helper-text-brand-pr">
                    {errors.brand}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="desc-pr">Description</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.desc && errors.desc)}
                    id="desc-pr"
                    value={values.desc}
                    name="desc"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                  />
                </Stack>
                {touched.desc && errors.desc && (
                  <FormHelperText error id="helper-text-desc-pr">
                    {errors.desc}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="category-pr">Category</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.category && errors.category)}
                    id="category-pr"
                    value={values.category}
                    name="category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                  />
                </Stack>
                {touched.category && errors.category && (
                  <FormHelperText error id="helper-text-category-pr">
                    {errors.category}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="qty-pr">Quantity</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.qty && errors.qty)}
                    id="qty-pr"
                    type="number"
                    value={values.qty}
                    name="qty"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                  />
                </Stack>
                {touched.qty && errors.qty && (
                  <FormHelperText error id="helper-text-qty-pr">
                    {errors.qty}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="uom-pr">Unit of Measures</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.uom && errors.uom)}
                    id="uom-pr"
                    value={values.uom}
                    name="uom"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                  />
                </Stack>
                {touched.uom && errors.uom && (
                  <FormHelperText error id="helper-text-uom-pr">
                    {errors.uom}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="departement-pr">Departement</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.departement && errors.departement)}
                    id="departement-pr"
                    value={values.departement}
                    name="departement"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                  />
                </Stack>
                {touched.departement && errors.departement && (
                  <FormHelperText error id="helper-text-departement-pr">
                    {errors.departement}
                  </FormHelperText>
                )}
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button fullWidth size="large" type="submit" variant="contained" color="primary">
                    Submit PR
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
