import intl from 'src/intl'
import option from './option'
import config from './config'
import data from './data'

export { option, config, data }

export default {
  title: intl.formatMessage({ id: 'thermal map', defaultMessage: '热力地图' }),
  imgClassName: 'geo-hot',
  option
}
