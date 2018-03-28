import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Breadcrumb, Icon } from 'antd';
//import UploadImages  from '../components/DefineUpload/index.js';
import UploadImages  from 'uploadimage_alioss'
console.log(UploadImages)
const IndexPage  = ({ dispatch,indexapp}) => { 
  const {values} = indexapp 
  console.log(indexapp)
  const imageChange = (e) => {
      console.log(e)
  }
  return (
    <div className={styles.normal}>
      <Breadcrumb>
    <Breadcrumb.Item href="">
      <Icon type="home" />
    </Breadcrumb.Item>
    <Breadcrumb.Item href="">
      <Icon type="user" />
      <span>Application List</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      Application
    </Breadcrumb.Item>
  </Breadcrumb>
  <UploadImages uploadMess={values} onChange={imageChange} />
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};
// export default connect(({userlog,dispatch,loading}) => ({
//     userlog,dispatch,loading
// }))( userlog);
export default connect(({dispatch,indexapp}) => ({dispatch,indexapp}))(IndexPage); 
