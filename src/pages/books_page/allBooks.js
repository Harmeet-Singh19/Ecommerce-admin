import React, {Component} from 'react';
import { connect } from 'react-redux';
import doRequest from "../../utils/requestHooks";
import Loader from "react-loader-spinner"
import './allBooks.module.css'

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
            isLoading:true
        }
    }
    componentDidUpdate = async (previousProps) => {
        if(this.props.books !== previousProps.books){
            await this.setState({data: [...this.props.books]})
            this.setState({isLoading:false})
        }
    }

    componentDidMount = async () => {
        await this.props.getBooks()
        await this.setState({isLoading:false})
    }
    render(){
        return(
            <div>
                {this.state.isLoading?
                    (<center>
                        <Loader type='ThreeDots' color='#f08080' height={150} width={150} />
                    </center>)
                    : (<div className="MenuPageStyle">
                        <div className="primaryButton" onClick={() => this.props.history.push("book/add")}>
                            Add Dish
          </div>
                        <div className="dishRow">
                            {this.state.data.map((book, index) => {
                                return (
                                    <div className="dishCard" key={index}>
                                        <div className="dishImage">
                                            <img src={book.image} alt="No Image Uploaded" />
                                        </div>
                                        <h3>{book.name}</h3>
                                        <h4>Price : {book.price}</h4>
                                        <div className="editDish" onClick={() => { this.props.history.push(`/book/${book._id}`) }}>
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

