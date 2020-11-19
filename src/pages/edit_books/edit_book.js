import React, { Component } from 'react'
import './Upload.css'
import Loader from "react-loader-spinner"
import TopBar from '../../components/Header/Header'
import axios from "axios"
import doRequest from "../../utils/requestHooks";

class Upload extends Component {

    state={
        isDisabled:false,
        data:{
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
        },
       bookChange:false,
        vendors:[]
    }
    updateBook=async()=>{
        await this.setState({ isLoading: true })
        await doRequest({
            url: `/admin/book/${this.props.match.params.id}`,
            method: "put",
            body: { ...this.state.data },
            onSuccess: () => {
                if(this.state.bookChange===true){
                    this.updateImages();
                }
                else{
                    this.props.history.goBack()
                }
            },
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
    console.log(this.state.data.image)
    const data = new FormData()
    for(var x = 0; x<this.state.data.image.length; x++) {
        data.append('file', this.state.data.image[x])
    }
        axios.post(`https://du-book-server.herokuapp.com/api/admin/book/image/${this.props.match.params.id}`, data, {
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                console.log(res.data);
               this.props.history.goBack()
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
      let temp=[]
      this.state.data.image.length=0
      this.setState({
          ...this.state,
          bookChange:true
      })
        for(let i=0;i<e.target.files.length;i++){
            //console.log(e.target.files[i].size)
        if (e.target.files[i].size > maxAllowedSize) {
            alert("File size should be below 300kb")
            e.target.value = ''
        } else {
            
            await this.setState({
                data: {
                  ...this.state.data,
                  image:[...this.state.data.image,e.target.files[i] ]
                }
              })
        }
    }
    console.log(this.state.data.image)
    }
    componentDidMount=async()=>{
        await this.getSellers()
        console.log(this.state.vendors)
        await doRequest({
            url: `/admin/book/${this.props.match.params.id}`,
            method: "get",
            onSuccess: async (data) => {
              delete data.__v;
              delete data._id;
              
              console.log(data)

              await this.setState({ data })
            },
            onError: (err) => { alert(err) },
            noToken: () => this.props.history.push("/login")
          });
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
                    <h1 className="welcome-heading-upload"> Edit Book</h1>
                    <br/><br/>
        
        
                <div className="upload-page">
        
                    <div className="justify-content-center row">
                            <div className=" col-md-8 col-sm-8">
                            <div className="card" >
                                <div className="card-body" style={{width:"80%"}}>
                                    
                                            <div className="mt-3">
                                                <div className= "form">
                                                <form style={{justifyContent:"center"}} >
                                                <input type="button" value="Update" disabled={this.state.isDisabled} onClick={()=>this.updateBook()}/>
                  <input type="button" value="Edit" disabled={!this.state.isDisabled} onClick={() => {
                    this.setState({ isDisabled: !this.state.isDisabled })
                  }} />
                  <span className="secButton" style={{ padding: "8px", margin: "10px" }} onClick={() => this.deleteDish()}>
                    Delete
                  </span>
                  <div className="inputRow">
                      {this.state.data.image.map((imag)=>{
                        //  console.log(typeof (imag))
                          if(typeof (imag) === "object"){
                              return(
                                <img src={URL.createObjectURL(imag)} alt="pic"/> 
                              )
                          }
                          else{
                              return(
                                <img src={imag} alt="" disabled={this.state.isDisabled} />
                              )
                          }
                    
                       })}
                

                  <div className="inputCol">
                    <p>Image File</p>
                    <input type="file" id="booksImg" disabled={this.state.disabled} multiple accept="image/*" onChange={e => this.fileValidate(e)} />
                    <label htmlFor="booksImg" className="fileUpload" >{"Edit Images"}</label>
                  </div>
                </div>
                                                <label style={{width:"100%"}}>
                                                    Book Name: 
                                                         <input type="text" placeholder="Enter book name"
                                                        onChange={e => {
                                                            this.setState({
                                                              data: {
                                                                ...this.state.data,
                                                                name: e.target.value
                                                              }
                                                            })
                                                          }} value={this.state.data.name}
                                                         required disabled={this.state.isDisabled}
                                                                    className="form-control"
                                                                    />
                                                </label>
                                        
                                            <br />
                                            <label style={{width:"100%"}}>
                                                Seller: 
                                                <select required className="form-control" placeholder="of the course used in (uptil 3 for commerce and 4 for btech)" onChange={e => {
                  this.setState({
                    data: {
                      ...this.state.data,
                      seller: e.target.value
                    }
                  })
                }} value={this.state.data.seller} isDisabled={this.state.isDisabled}>
                                          {this.state.vendors.map((vendor,index)=>(
                                              <option value={`${vendor._id}`}>{vendor.name},{vendor.address}</option>
                                          ))}
                                            
                                        </select>
                                            </label>
                                            <br/>
        
                                            <label style={{width:"100%"}}>
                                                Price: 
                                                 <input type="text" placeholder="Enter the price of book" disabled={this.state.isDisabled}
                                                   onChange={e => {
                                                    this.setState({
                                                      data: {
                                                        ...this.state.data,
                                                        price: e.target.value
                                                      }
                                                    })
                                                  }} value={this.state.data.price}
                                                  required
                                                                    className="form-control"
                                                                    />
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Description: 
                                                 <input type="text" placeholder="Brief description of the book" disabled={this.state.isDisabled}
                                                  onChange={e => {
                                                    this.setState({
                                                      data: {
                                                        ...this.state.data,
                                                        description: e.target.value
                                                      }
                                                    })
                                                  }} value={this.state.data.description}
                                                  required
                                                                    className="form-control"
                                                                    />
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Author: 
                                                 <input type="text" placeholder="Author" disabled={this.state.isDisabled}
                                                   onChange={e => {
                                                    this.setState({
                                                      data: {
                                                        ...this.state.data,
                                                        author: e.target.value
                                                      }
                                                    })
                                                  }} value={this.state.data.author}
                                                  required
                                                                    className="form-control"
                                                                    />
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Publisher: 
                                                 <input type="text" placeholder="Publisher" disabled={this.state.isDisabled}
                                                   onChange={e => {
                                                    this.setState({
                                                      data: {
                                                        ...this.state.data,
                                                        publisher: e.target.value
                                                      }
                                                    })
                                                  }} value={this.state.data.publisher}
                                                  required
                                                                    className="form-control"
                                                                    />
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Edition: 
                                                 <input type="text" placeholder="1/2/3/.." disabled={this.state.isDisabled}
                                                   onChange={e => {
                                                    this.setState({
                                                      data: {
                                                        ...this.state.data,
                                                        edition: e.target.value
                                                      }
                                                    })
                                                  }} value={this.state.data.edition}
                                                  required
                                                                    className="form-control"
                                                                    />
                                            </label>
                                            <label style={{width:"100%"}}>
                                                Weight: 
                                                 <input type="number" placeholder="Rough estimate of the weight(in gms)"
                                                  onChange={e => {
                                                    this.setState({
                                                      data: {
                                                        ...this.state.data,
                                                        weight: e.target.value
                                                      }
                                                    })
                                                  }} value={this.state.data.weight}
                                                  required
                                                                    className="form-control"
                                                                    />
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Course: 
                                                <select className="form-control" disabled={this.state.isDisabled}onChange={e => {
                  this.setState({
                    data: {
                      ...this.state.data,
                      course: e.target.value
                    }
                  })
                }} value={this.state.data.course} required >
                                            <option  value="Bsc">Bsc</option>
                                            <option value="Bcom">Bcom</option>
                                            <option value="Bscom">Bscom</option>
                                            <option value="Engg">Engg</option>
                                            <option value="Engg">Mtech</option>
                                            
                                        </select>
                                            </label>
                                            <label style={{width:"100%"}}>
                                                Subject: 
                                                <select  disabled={this.state.isDisabled} className="form-control" onChange={e => {
                  this.setState({
                    data: {
                      ...this.state.data,
                      subject: e.target.value
                    }
                  })
                }} value={this.state.data.subject}required >
                                            <option  value="maths">Maths</option>
                                            <option  value="physics">Physics</option>
                                            <option  value="english">English</option>
                                           
                                            
                                        </select>
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                Year: 
                                                <select disabled={this.state.isDisabled} className="form-control" placeholder="of the course used in (uptil 3 for commerce and 4 for btech)" onChange={e => {
                  this.setState({
                    data: {
                      ...this.state.data,
                      year: e.target.value
                    }
                  })
                }} value={this.state.data.year} required>
                                            <option  value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            
                                        </select>
                                            </label>
        
                                            <label style={{width:"100%"}}>
                                                CountInStock: 
                                                 <input type="number"  disabled={this.state.isDisabled} placeholder="Number of books to be seen on website"
                                                                    className="form-control"
                                                                    onChange={e => {
                                                                        this.setState({
                                                                          data: {
                                                                            ...this.state.data,
                                                                            countInStock: e.target.value
                                                                          }
                                                                        })
                                                                      }} value={this.state.data.countInStock}
                                                                    required
                                                                     />
                                            </label>
        
                                            
                                            <br></br>
                                            <br></br>
                                           
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