import React, { Component } from "react";
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/auth_actions";
import Modal from "react-bootstrap/Modal";
import cx from 'classnames'
import styles from './forgot.module.css'

class AddressModal extends Component {
    state = {
        email:""
        
    };

    handleEmail = () => {
     //   console.log(this.state)
        this.props.forgotPassword(this.state);
        this.props.setModalOpen(false);
      
    };

       componentDidMount(){
        
       }
    
    

    render() {
        return (
            <Modal
                show={this.props.isOpen}
                onHide={() => this.props.setModalOpen(false)}
                centered
                size="md"
                style={{
                    zIndex: "999999",
                    maxHeight: "90vh",
                    fontFamily: "Shentox",
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Enter the email you registered with!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx(styles.accordion, "py-4")}>
                        <div className="row">
                            <input
                            value={this.state.email}
                            onChange={(e)=>{
                                this.setState({
                                    ...this.state,
                                    email:e.target.value
                                })
                            }}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="row w-100">
                        <div className="col-sm-12">
                            <button
                                 className="btn btn-outline-danger btn-md"
                                onClick={this.handleEmail}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { forgotPassword })(AddressModal);
