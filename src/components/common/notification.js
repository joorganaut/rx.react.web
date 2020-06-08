import React, { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Notification extends Component {
    constructor(props){
        super(props);
        this.state={
            Title : props.Title,
            Type : props.Type,
            Word : props.Word
        }
        this.showNotification = this.showNotification.bind(this);
    }
    componentDidMount() {
        this.props.setClick(this.showNotification);
     }
    showNotification = (Type, Word) => {
        switch(this.props.Type === undefined ? Type : this.props.Type){
            case 'success' : 
                toast.success(this.props.Word === undefined ? Word : this.props.Word, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    break;
            case 'warning' : 
                toast.warning(this.props.Word === undefined ? Word : this.props.Word, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    break;
            case 'error' : 
                toast.error(this.props.Word === undefined ? Word : this.props.Word, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    break;
            case 'info' : 
                toast.info(this.props.Word === undefined ? Word : this.props.Word, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    break;
            default : 
                toast.info(this.props.Word === undefined ? Word : 'Please add information', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    break;
        }
    }
    render() {
    return (
      <>
      </>
    );
  }
}

export default Notification;