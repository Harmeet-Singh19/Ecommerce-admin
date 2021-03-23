import React, { Component } from 'react';
import { connect } from 'react-redux';
import doRequest from "../../utils/requestHooks";
import Loader from "react-loader-spinner"
// import styles from "./allBooks.module.css";
import styles from '../../pages/books_page/allBooks.module.css'
import TopBar from '../../components/Header/Header'

//actions part


class AllBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            id: ""
        }
    }
    getBooks = async (id) => {
        console.log(id)

        await doRequest({
            url: `/admin/vbook/vendor/${id}`,
            method: "get",
            onSuccess: (data) => {

                this.setState({
                    ...this.state,
                    data: data
                })
                this.setState({ isLoading: false })
            },
            onError: (err) => { alert(err) },
        });

    }

    componentDidUpdate = async (previousProps) => {
        if (this.props.books !== previousProps.books) {
            await this.setState({ data: [...this.props.books] })
            this.setState({ isLoading: false })
        }
    }

    componentDidMount = async () => {
        await doRequest({
            url: "/admin/auth/verify",
            method: "get",
            onSuccess: async (data) => {

                await this.setState({
                    ...this.state,
                    id: data.admin._id
                })
                console.log(this.state)
            },
        });
        await this.setState({ isLoading: true })
        await this.getBooks(this.state.id)

    }
    render() {
        return (
            <div>
                <TopBar history={this.props.history} />
                {this.state.isLoading ?
                    (<center>
                        <Loader type='ThreeDots' color='yellow' height={250} width={250} />
                    </center>)
                    : (<div className={styles.MenuPageStyle} style={{ color: "white" }}>

                        <div className={styles.primaryButtonContainer}>
                            <div className={styles.primaryButton} onClick={() => this.props.history.push("add/books")}>
                                Add Book
                            </div>
                        </div>
                        <div className={styles.bookRow}>
                            {this.state.data.map((book, index) => {
                                return (
                                    <div className={styles.bookCard} key={index}>
                                        <div className={styles.bookImage}>
                                            {book.image.map((imag) => (
                                                <img src={imag} alt="No Image Uploaded" width={100} height={100} />
                                            ))}

                                        </div>
                                        <h3>{book.name}</h3>
                                        <h4>Price : {book.price}</h4>
                                        <div className={styles.editBook} onClick={() => { this.props.history.push(`/vendor/books/${book._id}`) }}>
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



export default (AllBook)

