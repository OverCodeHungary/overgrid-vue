import axios from 'axios'

export default (axiosConfigurator?: Function) => {
  if (axiosConfigurator) {
    return axiosConfigurator(axios)
  } else {
    return axios
  }
}
