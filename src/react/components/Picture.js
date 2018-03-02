
import React from 'react';
import { connect } from 'react-redux';
import {push} from "react-router-redux";

class Picture extends React.Component {
    componentWillReceiveProps(nextProps) {

    }
    render(){
        return (
            <div onClick={this._onClick}>
                我知道你很好
            </div>
        )
    }
    _onClick =()=>{
        this.props.dispatch(push("/picture"))
    }
}



function mapStateToProps(state) {
    return {

    }
}




export default connect(mapStateToProps,null)(Picture);