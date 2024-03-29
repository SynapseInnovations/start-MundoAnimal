// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { motion } from 'framer-motion'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports

import SalesHistoryTable from 'src/views/operator/tables/SalesHistoryTable'

const SalesListIndex = () => {
  const theme = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 40, delay: 0.1, duration: 0.3 }}
    >
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 40, delay: 0.1, duration: 0.3 }}
          >
            <Card>
              <SalesHistoryTable />
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  )
}
SalesListIndex.acl = {
  action: 'read',
  subject: 'sales'
}

export default SalesListIndex
