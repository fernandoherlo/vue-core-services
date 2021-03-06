/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import Vue from 'vue'

/*
|--------------------------------------------------------------------------
| $api
|--------------------------------------------------------------------------
|
*/
let api = new Vue({
  methods: {
    // GET ALL
    // ******************
    get (url, _callback) {
      // Degub
      this.$log.debug('API', url)
      // var self = this
      var options = {
        url: url,
        method: 'GET'
      }
      this.$http.axios(options).then((response) => {
        // Return items
        _callback(response.data)
      }, (error) => {
        this.$log.info('SERVICES -> API -> get()')
        this.$log.error(error)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'error',
            title: 'Error',
            text: 'Error on API'
          })
        }
      })
    },

    // UPDATE
    // ******************
    update (url, item, _callback) {
      // Degub
      this.$log.debug('API', url)
      // Data
      var data = {}
      // Fields
      for (var propertyName in item) {
        data[propertyName] = item[propertyName]
      }
      var options = {
        url: url + '/' + item.id,
        method: 'POST',
        data: data
      }
      this.$http.axios(options).then((response) => {
        // CallBack
        _callback(response.data)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Update',
            text: 'Update element successfull!'
          })
        }
        // -----
      }, (error) => {
        this.$log.info('SERVICES -> API -> update()')
        this.$log.error(error)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'error',
            title: 'Error',
            text: 'Error on API'
          })
        }
      })
    },

    // SAVE
    save (url, item, _callback) {
      // Degub
      this.$log.debug('API', url)
      // Data
      var data = {}
      // Fields
      for (var propertyName in item) {
        data[propertyName] = item[propertyName]
      }
      var options = {
        url: url,
        method: 'POST',
        data: data
      }
      this.$http.axios(options).then((response) => {
        // CallBack
        _callback(response.data)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Save',
            text: 'Save element successfull!'
          })
        }
      }, (error) => {
        this.$log.info('SERVICES -> API -> save()')
        this.$log.error(error)
        // CallBack
        _callback(null)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'error',
            title: 'Error',
            text: 'Error on API'
          })
        }
      })
    },

    // SAVE
    order (url, item, _callback) {
      // Degub
      this.$log.debug('API', url)
      // Data
      var data = {
        'order': item
      }
      var options = {
        url: url + '/order',
        method: 'POST',
        data: data
      }
      this.$http.axios(options).then((response) => {
        // CallBack
        _callback(response.data)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Order',
            text: 'Order element successfull!'
          })
        }
      }, (error) => {
        this.$log.info('SERVICES -> API -> order()')
        this.$log.error(error)
        // CallBack
        _callback(null)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'error',
            title: 'Error',
            text: 'Error on API'
          })
        }
      })
    },

    // UPLOAD
    upload (url, item, _callback) {
      // Degub
      this.$log.debug('API', url)
      // Data
      // var data = item.formData
      var form = new FormData()
      // Fields
      for (var propertyName in item) {
        if (propertyName == 'file') {
          if (item[propertyName].length > 0) {
            for (var i = 0; i < item[propertyName].length; i++) {
              form.append(propertyName + '[' + i +']', item[propertyName][i])
            }
          } else {
            form.append(propertyName, item[propertyName])
          }
        } else {
          form.append(propertyName, item[propertyName])
        }
      }
      var options = {
        url: url + '/upload',
        method: 'POST',
        data: form
      }
      this.$http.axios(options).then((response) => {
        // CallBack
        _callback(response.data)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'warn',
            title: 'Upload',
            text: 'Upload element successfull!'
          })
        }
      }, (error) => {
        this.$log.info('SERVICES -> API -> upload()')
        this.$log.error(error)
        // CallBack
        _callback(null)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'error',
            title: 'Error',
            text: 'Error on API'
          })
        }
      })
    },

    // DOWNLOAD
    download (url, item) {
      // Degub
      this.$log.debug('API', url)
      
      var options = {
        url: url + '/download/' + item.id,
        method: 'GET'
      }
      this.$http.axios(options).then((response) => {
        window.open(response.data.url, '_blank')
      
      }, (error) => {
        this.$log.info('SERVICES -> API -> download()')
        this.$log.error(error)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'error',
            title: 'Error',
            text: 'Error on API'
          })
        }
      })
    },

    // DELETE
    delete (url, item, _callback, wait, id_parent) {
      // Degub
      this.$log.debug('API', url)
      if (wait) {
        // Alert wait
      }
      var options = {
        url: url + '/' + item.id,
        method: 'DELETE'
      }
      if (id_parent) {
        options.url = options.url + '/' + id_parent
      }
      this.$http.axios(options).then((response) => {
        // CallBack
        _callback(response.data)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'success',
            title: 'Delete',
            text: 'Delete element successfull!'
          })
        }
      }, (error) => {
        this.$log.info('SERVICES -> API -> delete()')
        this.$log.error(error)
        // Notify
        if (this.$notify){
          this.$notify({
            group: 'global',
            type: 'error',
            title: 'Error',
            text: 'Error on API'
          })
        }
      })
    }
  }
})

export default {
  install: function(Vue) {
    Vue.prototype.$api = api
  }
}

