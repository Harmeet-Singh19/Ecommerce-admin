import React, { Component } from 'react'
import styles from './edit_book.module.css'
import Loader from "react-loader-spinner"
import TopBar from '../../components/Header/Header'
import axios from "axios"
import doRequest from "../../utils/requestHooks";

class Upload extends Component {

    state={
        isDisabled:true,
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
           
            isLive:true,
            hand:0
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
 
    let token = await localStorage.getItem('token')
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
changeActiveStatus = async e => {
    this.setState({ isLoading: true })
    await doRequest({
      url: `/admin/book/${this.props.match.params.id}`,
      method: "delete",
      body:{isLive:!this.state.data.isLive},
      onSuccess: (res) =>{console.log(res) 
         doRequest({
          url: `/admin/book/${this.props.match.params.id}`,
          method: "get",
          onSuccess: async (data) => {
            delete data.__v;
            delete data._id;
            
          //  console.log(data)

            await this.setState({ data })
          },
          onError: (err) => { alert(err) },
          noToken: () => this.props.history.push("/login")
        })
      }
    });
    this.setState({ isLoading: false })
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
       // console.log(this.state.vendors)
       await doRequest({
        url: "/admin/auth/verify",
        method: "get",
        onSuccess: async (data) => {
           
         if(data.isVendor===true){
             alert('Not authorized')
             this.props.history.push('/')
         }
        },
      });
        await doRequest({
            url: `/admin/book/${this.props.match.params.id}`,
            method: "get",
            onSuccess: async (data) => {
              delete data.__v;
              delete data._id;
              
            //  console.log(data)
           
              await this.setState({ data })
              console.log(this.state.data)
            },
            onError: (err) => { alert(err) },
            noToken: () => this.props.history.push("/login")
          });
    }

    render (){
      let disabled=this.state.isDisabled
      let message=this.state.data.isLive?'Stop Displaying':'Make Live Again'
    
        
    return (
        <>
         <TopBar {...this.props} />
         {this.state.isLoading ? (
                    <center>
                        <Loader type='ThreeDots' color='yellow' height={250} width={250} />
                    </center>
                ):(
                    <div className={styles.edit}>
                    <h1 className={styles.welcome_heading_edit}> Edit Book</h1>
                    <br/><br/>
        
        
                <div className={styles.edit_page}>
        
                    <div className="justify-content-center row">
                            <div className=" col-md-8 col-sm-8">
                            <div className={styles.card} >
                                <div className={styles.card_body} style={{width:"80%"}}>
                                    
                                            <div className="mt-3">
                                                <div className= {styles.form}>
                                                <form style={{justifyContent:"center"}} >
                                                <div className={styles.buttons_container}>
                                                <input type="button" value="Update" disabled={disabled} onClick={()=>this.updateBook()}/>
                  <input type="button" value="Edit" disabled={!this.state.isDisabled} onClick={() => {
                    this.setState({ isDisabled: !this.state.isDisabled })
                  }} />
                  <button  onClick={() => this.changeActiveStatus()}>{this.state.data.isLive?'Stop Displaying':'Make Live Again'
    }</button>
                  </div>
                  <div className={styles.inputRow}>
                      {this.state.data.image.map((imag)=>{
                        //  console.log(typeof (imag))
                          if(typeof (imag) === "object"){
                              return(
                                <img src={URL.createObjectURL(imag)} alt="pic" className={styles.im}/> 
                              )
                          }
                          else{
                              return(
                                <img src={imag} alt="" disabled={this.state.isDisabled}  className={styles.im}/>
                              )
                          }
                    
                       })}
                

                  <div className={styles.inputCol}>
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
                                                 <input type="number" placeholder="Rough estimate of the weight(in kgs)"
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
                                            <option value="Bms">Bachelor of Management Studies</option>
                                                                <option value="BcomH">Bcom(Hons)</option>
                                                                <option value="BcomP">Bcom(P)</option>
                                                                <option value="BAHEco">BA(Hons) Economics</option>
                                                                <option value="BAHEng">BA(Hons) English</option>
                                                                <option value="BAHPsy">BA(Hons) Psychology</option>
                                                                <option value="Shivdas">Shivdas</option>
                                                                <option value="BscHSta">BSc(Hons) Statistics</option>
                                                                <option value="BscHMat">BSc(Hons) Mathematics</option>

                                            
                                        </select>
                                            </label>
                                            <label style={{width:"100%"}}>
                                                Subject: 
                                                <input type="text" placeholder="Enter subject"
                                                        onChange={e => {
                                                            this.setState({
                                                              data: {
                                                                ...this.state.data,
                                                                subject: e.target.value
                                                              }
                                                            })
                                                          }} value={this.state.data.subject}
                                                         required disabled={this.state.isDisabled}
                                                                    className="form-control"
                                                                    />
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
                                                Hand: 
                                                <select disabled={this.state.isDisabled} className="form-control" placeholder="Select 1st for new , 2nd for 2nd hand" onChange={e => {
                  this.setState({
                    data: {
                      ...this.state.data,
                      hand: e.target.value
                    }
                  })
                }} value={this.state.data.hand} required>
                                           <option  value="1">1st</option>
                                            <option value="2">2nd</option>
                                            
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
                                            <div className ={styles.user_login_button}>
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
