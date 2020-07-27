import React from 'react'
import axios from 'axios'
import './App.css'
class JobApplication extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            errName:'',
            email:'',
            errEmail:'',
            phone:'',
            errPhone:'',
            skills:'',
            jobTitle:'',
            experience:''
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    validate=()=>{
        let errName=""
        let errEmail=""
        let errPhone=""
        if(this.state.name.length<6){
            errName="Name Should Contain atleast 6 Characters"
        }
        if(!this.state.email.includes('@')){
            errEmail="Invalid Email"
        }
     if(this.state.phone.length<10 ){
            errPhone="Invalid Mobile Number"
        }
        if(errName||errEmail||errPhone){
            this.setState({errName,errEmail,errPhone})
            return false
        }
        return true
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        
        const formData={
            name:this.state.name,
            email:this.state.email,
            phone:this.state.phone,
            skills:this.state.skills,
            jobTitle:this.state.jobTitle,
            experience:this.state.experience
        }
        const isValidate=this.validate()
         if(isValidate) {
            this.setState({
                name:'',
            errName:'',
            email:'',
            errEmail:'',
            phone:'',
            errPhone:'',
            skills:'',
            jobTitle:'',
            experience:''
                
            })

        }
        
        
        axios.post('http://dct-application-form.herokuapp.com/users/application-form',formData)
        .then((response)=>{
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')){
                alert('Enter Valid Data')
            }else{
                alert('Your Application Submitted Successfully')
            }
            this.props.history.push('/dashboard')
        })
        .catch((err)=>{
            alert(err)
        })
         
    }

    render(){
        return(
            <div className="div">
                <h2 className="h3">Job Application</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <label htmlFor="name">
                        fullname:
                                <input className="label" type="text" placeholder="Enter Full Name" value={this.state.name} name="name" id="name" onChange={this.handleChange}/>
                    </label><br/>
                    <div style={{color:'red'}}>{this.state.errName}</div>
                    <label htmlFor="email">Email address:
                        <input type="text" className="label"  placeholder="Enter Email" value={this.state.email} name="email" id="email" onChange={this.handleChange}/>
                    </label><br/>
                    <div style={{color:'red'}}>{this.state.errEmail}</div>
                    <label htmlFor="phone">Contact Number:
                        <input type="text" className="label"  placeholder="+91 1234567888" value={this.state.phone} name="phone" id="phone" onChange={this.handleChange}/>
                    </label><br/>
                    <div style={{color:'red'}}>{this.state.errPhone}</div>
                    <label htmlFor="skills">skills:
                        <textarea className="textarea" type="text" placeholder="Skills" value={this.state.skills} name="skills" id="skills" onChange={this.handleChange}></textarea>
                    </label><br/>
                    <label>jobTitle:
                        <select className="select" value={this.state.jobTitle} onChange={this.handleChange} name="jobTitle">
                            <option  value="select">select</option>
                            <option  value="Front-End Developer">Front-End Developer</option>
                            <option  value="FULL Stack Developer">FULL Stack Develope</option>
                            <option  value="Node.js Developer">Node.js Developer</option>
                            <option  value="MEAN Stack Developer">MEAN Stack Developer"</option>
                        </select>
                    </label><br/>
                    <label>Experience:
                        <input type="text" className="label"  placeholder="2 years 6 months" value={this.state.experience} name="experience" id="experience" onChange={this.handleChange}/>
                    </label><br/>
                    <input  className="button"   type="submit" value="Send Application"/>
                </form>
            </div>
        )
    }
}
export default JobApplication