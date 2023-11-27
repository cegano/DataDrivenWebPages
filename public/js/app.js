   let app = Vue.createApp({
      data() {   
         return {
            student_list: [],        
            filter: '',
            showTable: false,
         }
      },
      methods: {    
         async getData() {   
            this.showTable = true
            
			   url = '/getStudents?filter=' + this.filter
            const response = await fetch(url)
            this.student_list = await response.json()
         },
      }
   })
         
   app.mount('#studentsApp')  
   
   
   
  