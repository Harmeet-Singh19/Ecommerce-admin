import React, { Component } from 'react'
import './Upload.css'
import Loader from "react-loader-spinner"
import TopBar from '../../components/Header/Header'
import axios from "axios"
import doRequest from "../../utils/requestHooks";

class Upload extends Component {

    state={
        
        name:"",
        price:0,
        description:"",
        author:"",
        publisher:"",
        course:"",
        subject:"",
        year:0,
        edition:"",
        weight:"",
        countInStock:0,
        image:[],
        seller:"",
        vendors:[]
    }
    updateBook=async(urls)=>{
        await this.setState({ isLoading: true })
        await doRequest({
            url: `/admin/book/add`,
            method: "post",
            body: { ...this.state, image: urls },
            onSuccess: () => this.props.history.goBack(),
            onError: (err) => {
                this.setState({ isLoading: false })
                alert(err)
                console.log(err)
            },
        });

    }
    getSellers=async()=>{
        let vendors=[];
        await this.setState({ isLoading: true })
        await doRequest({
            url: `/admin/auth/all-vendors`,
            method: "get",
            onSuccess: (res) => {this.setState({
                ...this.state,
                vendors:res
            });
            this.setState({ isLoading: false })},
            onError: (err) => {
                this.setState({ isLoading: false })
                console.log(err)
                alert(err)
            },
        });
       // console.log(vendors)
        return vendors
    }

    updateImages=async () =>{
        await this.setState({ isLoading: true })
 
    let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjljNDA3YmRhMTYyOTJhM2MzN2IxMjYiLCJpYXQiOjE2MDU2MzkyMzl9.XxIKLVS_-nPgnx4y43OWRYIz9zuy2ofCObCb0mC_YXg`
    console.log(this.state.image)
    const data = new FormData()
    for(var x = 0; x<this.state.image.length; x++) {
        data.append('file', this.state.image[x])
    }
        axios.post(`http://localhost:4000/api/admin/book/image/add`, data, {
            headers: {
                
                Authorization: token
            }
        })
            .then(res => {
                console.log(res.data);
                this.addBook(res.data.images)
             //   this.props.history.goBack()
            })
            .catch(err => {
                alert(err.response.data.message)
                this.setState({ isLoading: false })
            })
}
deleteBook = async e => {
    this.setState({ isLoading: true })
    await doRequest({
      url: `/admin/book/${this.props.match.params.id}`,
      method: "delete",
      onSuccess: () => this.props.history.goBack()
    });
  }


    fileValidate = async(e) => {
        const maxAllowedSize = 3000 * 1024;
      //  console.log(e.target.files[0].size)
        for(let i=0;i<e.target.files.length;i++){
            //console.log(e.target.files[i].size)
        if (e.target.files[i].size > maxAllowedSize) {
            alert("File size should be below 300kb")
            e.target.value = ''
        } else {
            await this.setState({
                ...this.state,
                 image: [...this.state.image,e.target.files[i] ]
                })
        }
    }
    console.log(this.state.image)
    }
    componentDidMount=async()=>{
        await this.getSellers()
        console.log(this.state.vendors)
    }

    render (){
        
    return (
        <>
         <TopBar {...this.props} />
         {this.state.isLoading ? (
                    <center>
                        <Loader type='ThreeDots' color='yellow' height={250} width={250} />
                    </center>
                ):(
                    <div className="upload">
                    <h1 className="welcome-heading-upload"> Book Upload</h1>
                    <br/><br/>
        
        
                <div className="upload-page">
        
                    <div className="justify-content-center row">
                            <div className=" col-md-8 col-sm-8">
                            <div className="card" >
                                <div className="card-body" style={{width:"80%"}}>
                                    
                                            <div className="mt-3">
                                                <div className= "form">
                                                <form style={{justifyContent:"center"}} >
                                                
                                                <label style={{width:"100%"}}>
                                                    Book Name: 
                                                         <input type="text" placeholder="Enter book name"
                                                         value={this.state.name}
                                                         onChange={(e)=>this.setState({
                                                             ...this.state,
                                                             name:e.target.value
                                                         })}
                                                         required
                                                                    className="form-control"
                                                                    />
                                                </label>
                                        
                                            <br />
                                            <label style={{width:"100%"}}>
                                                Seller: 
                                                <select required className="form-control" placeholder="of the course used in (uptil 3 for commerce and 4 for btech)" onChange={async(e) => {
                                           await this.setState({
                                               ...this.state,
                                                seller: e.target.value
                                            })
                                           await console.log(this.state.seller)
                                        }} >
                                          {this.state.vendors.map((vendor,index)=>(
                                              <option value={`${vendor._id}`}>{vendor.name},{vendor.address}</option>
                                          ))}
                                            
                                        </select>
                                            </label>
                                            <br/>
        
                                            <label style={{width:"100%"}}>
                                                Price: 
                                                 <input type="text" placeholder="Enter the price of book"
                                                  value={this.state.price}
                                                  onChange={(e)=>this.setState({
                                                      ...this.state,
                                                      price:Number(e.target.value)
                                                  })}
                                                  required
                                                                    className="form-control"
                                                                    />
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Description: 
                                                 <input type="text" placeholder="Brief description of the book"
                                                  value={this.state.description}
                                                  onChange={(e)=>this.setState({
                                                      ...this.state,
                                                      description:e.target.value
                                                  })}
                                                  required
                                                                    className="form-control"
                                                                    />
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Author: 
                                                 <input type="text" placeholder="Author"
                                                  value={this.state.author}
                                                  onChange={(e)=>this.setState({
                                                      ...this.state,
                                                      author:e.target.value
                                                  })}
                                                  required
                                                                    className="form-control"
                                                                    />
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Publisher: 
                                                 <input type="text" placeholder="Publisher"
                                                  value={this.state.publisher}
                                                  onChange={(e)=>this.setState({
                                                      ...this.state,
                                                      publisher:e.target.value
                                                  })}
                                                  required
                                                                    className="form-control"
                                                                    />
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Edition: 
                                                 <input type="text" placeholder="1/2/3/.."
                                                  value={this.state.edition}
                                                  onChange={(e)=>this.setState({
                                                      ...this.state,
                                                      edition:Number(e.target.value)
                                                  })}
                                                  required
                                                                    className="form-control"
                                                                    />
                                            </label>
                                            <label style={{width:"100%"}}>
                                                Weight: 
                                                 <input type="number" placeholder="Rough estimate of the weight(in gms)"
                                                  value={this.state.weight}
                                                  onChange={(e)=>this.setState({
                                                      ...this.state,
                                                      weight:Number(e.target.value)
                                                  })}
                                                  required
                                                                    className="form-control"
                                                                    />
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Course: 
                                                <select className="form-control" onChange={async(e) => {
                                           await this.setState({
                                               ...this.state,
                                                course: e.target.value
                                            })
                                           await console.log(this.state.course)
                                        }} required >
                                            <option  value="Bsc">Bsc</option>
                                            <option value="Bcom">Bcom</option>
                                            <option value="Engg">Engg</option>
                                            <option value="Engg">Mtech</option>
                                            
                                        </select>
                                            </label>
                                            <label style={{width:"100%"}}>
                                                Subject: 
                                                <select className="form-control" onChange={async(e) => {
                                           await this.setState({
                                               ...this.state,
                                                subject: e.target.value
                                            })
                                           await console.log(this.state.course)
                                        }} required >
                                            <option  value="maths">Maths</option>
                                            <option  value="physics">Physics</option>
                                           
                                            
                                        </select>
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Year: 
                                                <select className="form-control" placeholder="of the course used in (uptil 3 for commerce and 4 for btech)" onChange={async(e) => {
                                           await this.setState({
                                               ...this.state,
                                                year: e.target.value
                                            })
                                           await console.log(this.state.year)
                                        }} required>
                                            <option  value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            
                                        </select>
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                CountInStock: 
                                                 <input type="number" placeholder="Number of books to be seen on website"
                                                                    className="form-control"
                                                                    value={this.state.countInStock}
                                                                    onChange={(e)=>this.setState({
                                                                        ...this.state,
                                                                        countInStock:e.target.value
                                                                    })}
                                                                    required
                                                                     />
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Image (to upload):
                                                <input type="file" id="booksImg" accept="image/*" onChange={e => this.fileValidate(e)}   multiple/>
                                                <label htmlFor="booksImg" className="fileUpload" >{this.state.image ? <>{this.state.image.name}</> : <>Browse File</>}</label>
                                                 
                                            </label>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                           <label style={{width:"100%"}}>
                                                Author :
                                                    {this.state.author}     
                                            </label> 
                                            <br />
                                            <div className = "user_login_button">
                                            <input type="button" value="Add Book" onClick={this.addImages} />
                                            </div>
                                        </form>
                                                </div>
                                            </div>
                                            <br />
                                </div>
                            </div>
                            </div>
                            </div>
                </div>
            </div>
                )}
      
    </>
    )
}
}

export default Upload
