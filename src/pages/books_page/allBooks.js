import React, {Component} from 'react';
import { connect } from 'react-redux';
import doRequest from "../../utils/requestHooks";
import Loader from "react-loader-spinner"
import styles from "./allBooks.module.css";
import TopBar from '../../components/Header/Header'

//actions part

const setBooks = (books)=>{
    return{
        type:'SET_BOOKS',
        books
    }

}

const getBooks = () => async (dispatch) => {
    await doRequest({
        url: "/admin/book",
        method: "get",
        onSuccess: (data) => {
            dispatch(setBooks(data))
        },

    });
}

class AllBook extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            data2:[],
            isLoading:true
        }
    }
    componentDidUpdate = async (previousProps) => {
        if(this.props.books !== previousProps.books){
            let temp=this.props.books.filter((it)=>it.isLive===true)
            await this.setState({data: temp})
            temp=this.props.books.filter((it)=>it.isLive===false)
            await this.setState({data2: temp})
            this.setState({isLoading:false})
        }
    }

    componentDidMount = async () => {
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
        await this.props.getBooks()
        await this.setState({isLoading:false})
    }
    render(){
        return(
            <div>
                 <TopBar history={this.props.history} />
                {this.state.isLoading?
                    (<center>
                        <Loader type='ThreeDots' color='yellow' height={250} width={250} />
                    </center>)
                    : (<div className={styles.MenuPageStyle} style={{color:"white"}}>

                        <div className = {styles.primaryButtonContainer}>
                            <div className={styles.primaryButton} onClick={() => this.props.history.push("add/books")}>
                                Add Book
                            </div>
                        </div>
                        <h2 className={styles.h2}>Books which are Live and displaying</h2>
                        <div className={styles.bookRow}>
                            
                            {this.state.data.map((book, index) => {
                                return (
                                    <div className={styles.bookCard} key={index}>
                                        <div className={styles.bookImage}>
                                            {book.image.map((imag)=>(
                                                <img src={imag} alt="No Image Uploaded" width={100} height={100} />
                                            ))}
                                            
                                        </div>
                                        <h3>{book.name}</h3>
                                        <h4>Price : {book.price}</h4>
                                        <h4>Count:{book.countInStock}</h4>
                                        <div className={styles.editBook} onClick={() => { this.props.history.push(`/books/${book._id}`) }}>
                                            Edit
                    </div>
                                    </div>
                                )
                            })}
                        </div>
                        <h2 className={styles.h2}>Books which are not Live</h2>
                        <div className={styles.bookRow}>
                            {this.state.data2.map((book, index) => {
                                return (
                                    <div className={styles.bookCard} key={index}>
                                        <div className={styles.bookImage}>
                                            {book.image.map((imag)=>(
                                                <img src={imag} alt="No Image Uploaded" width={100} height={100} />
                                            ))}
                                            
                                        </div>
                                        <h3>{book.name}</h3>
                                        <h4>Price : {book.price}</h4>
                                        <div className={styles.editBook} onClick={() => { this.props.history.push(`/books/${book._id}`) }}>
                                            Edit
                    </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>)
                    }

            </div>
        );
    }

    
}

const mapStateToProps = (state, ownProp) => {
    console.log(state)
    return {
        books: state.book.books
    }
}

const mapDispatchToProps = {
    getBooks
}

export default connect(mapStateToProps,mapDispatchToProps)(AllBook)

