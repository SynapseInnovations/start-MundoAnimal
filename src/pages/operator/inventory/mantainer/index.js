import PetsIndex from 'src/pages/operator/inventory/pets'
import BrandsIndex from 'src/pages/operator/inventory/brands'
import CategoriesIndex from 'src/pages/operator/inventory/categories'

// ** MUI Imports
import Grid from '@mui/material/Grid'

const MantainerIndex = () => {
  // ** SUPER COMPONENTE XD

  return (
    <Grid container spacing={8}>
      <Grid item xs={4}>
        <PetsIndex />
      </Grid>
      <Grid item xs={4}>
        <BrandsIndex />
      </Grid>
      <Grid item xs={4}>
        <CategoriesIndex />
      </Grid>
    </Grid>
  )
}

export default MantainerIndex
