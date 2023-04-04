// ** Demo Components Imports
import Checkout from 'src/views/checkout'

const WizardExamples = () => {
  return <Checkout />
}
WizardExamples.acl = {
  action: 'read',
  subject: 'sales'
}

export default WizardExamples
