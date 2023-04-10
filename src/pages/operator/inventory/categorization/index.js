import PetsIndex from 'src/views/operator/components/PetsIndex'
import BrandsIndex from 'src/views/operator/components/BrandsIndex'
import CategoriesIndex from 'src/views/operator/components/CategoriesIndex'

// ** MUI Imports
import Grid from '@mui/material/Grid'

const CategorizationIndex = () => {
  // ** SUPER MODAL XD

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

CategorizationIndex.acl = {
  action: 'read',
  subject: 'inventory'
}

export default CategorizationIndex
