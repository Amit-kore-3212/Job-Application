import React from 'react'
import Axios from 'axios'
import './App.css'

class Dashboard extends React.Component{

    constructor(){
        super()
        this.state={
            selectDefault:'Front-End Developer',
            selectUser:['Front-End Developer','FULL Stack Developer','MEAN Stack Developer','Node.js Developer'],
            aspirants:[]
        }
    }
    handleClick=(title)=>{
        this.setState({selectDefault:title})
    }

    componentDidMount(){
        Axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            const aspirants=response.data
            console.log(aspirants)
             this.setState({aspirants})
        })
        .catch((err)=>{
            alert(err)
        })
    }
    handleDetail=(detail)=>{
        alert(`   Name-${detail.name}
               email-${detail.email}
               experience- ${detail.experience}
                Skills-${detail.skills}`)
    }

    handleShortList=(id,status)=>{
        Axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,{status})
        .then((response)=>{
            const result=response.data
            console.log(result)
            this.setState((prevState)=>{
                return{
                    aspirants:prevState.aspirants.map((ele)=>{
                        if(ele._id===result._id){
                            return {...result}

                        }else{
                            return {...ele}
                        }
                     
                    })
                }
            })
        })
        .catch((err)=>{
            alert(err)
        })
    }




    render(){
        return(
            <div>
                <h3 className="h3"> Admin Dashboard</h3>
                {
                    this.state.selectUser.map((ele)=>{
                        return(
                            <button className="button1" onClick={()=>{
                                this.handleClick(ele)
                            }}>{ele}</button>
                        )
                    })
                }
                <h4 className="h4">List of candidates applied for {this.state.selectDefault} job</h4>
                <table border="1">
                    <thead>
                        <tr>
                            <th className="th">Name</th>
                            <th className="th">Technical Skills</th>
                            <th className="th">Experience</th>
                            <th className="th">Applied Date</th>
                            <th className="th">View Details </th>
                            <th className="th">Update Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.aspirants.map((ele)=>{
                                if(ele.jobTitle===this.state.selectDefault)
                                return(
                                    <tr key={ele._id}>
                                        <td className="td">{ele.name}</td>
                                        <td className="td">{ele.skills}</td>
                                        <td className="td">{ele.experience}</td>
                                        <td className="td">{ele.createdAt}</td>
                                        <td><button className="button2" onClick={()=>{
                                            this.handleDetail(ele)
                                        }}>View Details</button></td>
                                        
                                        <td>{ele.status ==='applied' ? (<div>
                                            <button onClick={()=>{
                                                this.handleShortList(ele._id,'shortListed')
                                            }}>ShortList</button><button className="button3" onClick={()=>{
                                                this.handleShortList(ele._id,'rejected')
                                            }}>Reject</button>
                                        </div>) : <button className="button3">{ele.status}</button>
                                     }</td> 
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>
        )
    }
}
export default Dashboard