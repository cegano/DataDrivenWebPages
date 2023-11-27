 let app = Vue.createApp({
      data() {     
         return {
            allStudents: [], 
			student: '', 
            index: '',
			maxIndex: '',
			status1: ''
         }
      },
      created() {
         this.getAllStudents()  
      },
      methods: {    
         previousRecord() {
			   this.index--
			   if(this.index <= 0) {this.index = 0}
			   this.student = this.allStudents[this.index]
         },
         nextRecord() {
			   this.index++
			   if(this.index >= this.allStudents.length) {this.index = allStudents.length -1}
			   this.student = this.allStudents[this.index]
         },
         async updateRecord() {
			   s = this.student.sid  
			   m = this.student.major
			   h = this.student.hrs_attempted
			   g = this.student.gpa_points
			   
            console.log(s, m, g, h)

			   const response = await fetch('/updateStudent', 
               {
                  method: 'POST',
                  headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({sid: s, major: m, hrs_attempted: h, gpa_points: g })
               });
            this.status1 = await response.text();
            console.log(this.status)
         },
			
		async deleteRecord() {
			sid = this.student.sid  
			url = "/deleteStudent?sid=" + sid
         const response = await fetch(url)
            console.log(await response.json())
				//
			},
		 
         async getAllStudents() {       
			   url = '/getStudents?filter=all' 
            const response = await fetch(url)
            this.allStudents = await response.json()
			   this.student = this.allStudents[0]	
			   this.maxIndex = this.allStudents.length
		   },
      }
   })
         
   app.mount('#editApp')