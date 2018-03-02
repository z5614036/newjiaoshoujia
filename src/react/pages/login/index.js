/**
 * Created by zll on 2017/10/11.
 */
import React from 'react';
import { connect } from 'react-redux';
import styles from "./index.scss";
import "./index.less"
class Login extends React.Component {
    componentWillReceiveProps(nextProps) {
            
    }
    render(){
        return (
            <div className={styles.container}>
                <div className={styles.fixHeader}>

                </div>
                    <div className={styles.scrollView}>
                            <div style={{height:300,backgroundColor:"#00ff00",width:"100%"}}></div>
                            <div style={{height:300,backgroundColor:"#ffbb96",width:"100%"}}></div>
                            <div style={{height:300,backgroundColor:"#fa8c16",width:"100%"}}></div>
                    </div>

            </div>
        )
    }
}



function mapStateToProps(state) {
    return {

    }
}




export default connect(mapStateToProps,null)(Login);