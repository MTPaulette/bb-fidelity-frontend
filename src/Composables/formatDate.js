import moment from 'moment'

export const formatDate = (date) => {
  return moment(date).locale('fr').fromNow()
}