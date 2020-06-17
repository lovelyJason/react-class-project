import api from '../../lib/axios';

export default {
  getFaqCategoryList: (data) => {
    return api.post('/api/v2/faq-category/list', data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  },
  getFaqList: (data) => {
    return api.post('/api/v2/faq/list', data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  },
  deleteFaq: (id) => {
    return api.delete(`/api/v2/faq/del?id=${id}`).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  },
  getFeqInfo: (id) => {
    return api.get(`/api/v2/faq/info?id=${id}`).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  },

  editFaq: (data) => {
    return api.put(`/api/v2/faq/edit`, data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  },
  addFaq: (data) => {
    return api.put(`/api/v2/faq/add`, data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}
