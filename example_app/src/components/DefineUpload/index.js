/**
 * 
 * @authors zcy (1366969408@qq.com)
 * @date    2018-03-20 16:52:27
 * @version $Id$
 */
import React,{Component} from 'react';
import {Modal,message ,Icon, Input,Button} from 'antd'; 
import moment from 'moment';
import styles from './style.less';
import {uploadFile} from './common'
class   UploadImages extends React.Component{
  constructor(props) {
    super(props);
      this.state = { 
         previewVisible:false,
         previewImage:null,
         uploadMess:this.props.uploadMess||[],
      }
  }
  componentDidMount(){
    this.setState({
      userName:'11'
    })
  }
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
 
    if ('uploadMess' in nextProps && nextProps.uploadMess) {
      const value = nextProps.value?nextProps.value.toString():nextProps.value;
       this.setState({
        uploadMess:nextProps.uploadMess
       } );
      // this.changeV(this.state.uploadMess,nextProps.uploadMess)
    }
  }
  showMaodal = (url,width) => {
 
     this.setState({
       previewVisible:true,
         previewImage:url, 
         modalwiddth:width

     })
  }
  deleteFile = (url) => {
      
      if(this.state.uploadMess&&this.state.uploadMess.length>0){
             this.state.uploadMess.map((item,index)=>{
                  if(item.url==url){
                         this.state.uploadMess.splice(index,1)
                         this.setState({
                             uploadMess:this.state.uploadMess
                         },()=>{
                          this.props.onChange(null)
                         })
                        return;
                  }
             })
     }
      //this.props.deleteFile(url) 
  }
  handleCancel = () => {
    this.setState({
       previewVisible:false,
     })
  }
  changeV = (preval,now) => {
 
    if(!preval&&now[0].aliurl){
        this.props.onChange(now)
    } 
    if(preval&&now){
       if(preval[0]&&now[0]&&now[0].aliurl!=preval[0].aliurl){
          this.props.onChange(now)
       }
    }
  }
  uploadImags = (event) => {
       let uploadMess = this.state.uploadMess;
        var file = event.target.files[0];
       let url =this.getObjectURL(file);
        if(url){
          let data=[];
   
          if(uploadMess){
               uploadMess.push({url:url,fail:'loading'})
              data=uploadMess
          }else{
             data.push({url:url,fail:'loading'}) 
          }
          uploadMess=data;
          this.setState({
              uploadMess:uploadMess
          },()=>{
             // this.props.onChange(uploadMess)
          })
        }
        if(file){
            this.uploadImagsAli(file,uploadMess)
        }
  }
  uploadImagsAli = ( file, uploadMess) => {
      if(!this.props.clientOss){
          message.error("没有阿里上传凭证")
           return
      }
       if(file){
            const self =this;
            const key = this.props.keyOss+"/"+(new Date()).getTime()+file.name;
            uploadFile(file,this.props.clientOss,key, uploadMess.length).then(res=>{
               // console.log(res)
                 //成功 
                  let resultAliUrl = res.res.requestUrls[0];
                  let successIndex = res.successIndex;
                  if(uploadMess&&uploadMess.length>0){
                         uploadMess.map((item,index)=>{
                            if(index==successIndex-1){
                                   //上传成功
                                   uploadMess[index].fail='false';
                                   uploadMess[index].aliurl=resultAliUrl;
                                   self.setState({
                                       uploadMess:uploadMess
                                   })
                                   this.props.onChange(uploadMess)
                                  return;
                            }
                       })   
                  }
                  self.setState({
                       uploadMess:uploadMess
                   })
                 
            },function(error){
                 let failIndex= error.failIndex;  //第几个
                  if(uploadMess&&uploadMess.length>0){
                         uploadMess.map((item,index)=>{
                            if(index==failIndex-1){
                                   //上传失败
                                   uploadMess[index].fail='true';
                                   self.setState({
                                       uploadMess:uploadMess
                                   })
                                  return;
                            }
                       })   
                  }
 
              }) 
         
        }
      
     
     
       
     // uploadMess
  } 
  //获取图片路径
 getObjectURL = ( file) => {
      var url = null ;
      if (window.createObjectURL!=undefined) { // basic
      url = window.createObjectURL(file) ;
      } else if (window.URL!=undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file) ;
      } else if (window.webkitURL!=undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file) ;
      }
      return url ;
  }
  uploadImageElement = (uploadMess) => {
      /// this.props.onChange(uploadMess)
       if(uploadMess&&uploadMess.length>0){
          return uploadMess.map((item,index)=>{
              let img = new Image();
          img.src =item.url;
        let natureSizeWidth = img.width;
        let natureSizeHeight = img.height;
        let mess = '';
        if(item.fail=='loading'){
                   mess = '上传中'
        }
        if(item.fail=='true'){
          mess = '上传失败'
        }
             return (
               <div className={styles.block} style={{
                    borderColor:item.fail=='true'?'red':'#dfdfdf'
                 }}>
                  
                  <div className={styles.blockinner} style={{
                     width:'100%',
                     height:'100%',
                     overflow:'hidden',

                  }}>
                    <span className={styles.reporate}>
                      <span className={styles.inconWrap}>
                         <Icon className={styles.icons} type="delete" onClick={()=>{this.deleteFile(item.url)}} />
                         <Icon className={styles.icons} type="eye-o" onClick={()=>{this.showMaodal(item.url,natureSizeWidth)}} />
                       </span>
                    </span>
                    <p className={` ${styles.uploadState} ${item.fail=='true' ? styles.error: ''}`}>{mess}</p>
                     <img style={{width:'100%',height:'auto'}} src={item.url}/>
                  </div>
                 
               </div>  
             )
       })
         
       }
      
  }

  render() {
    const {previewVisible,previewImage,modalwiddth} = this.state
    const showWidth =modalwiddth?modalwiddth<400?modalwiddth:500:500
    const limit = this.props.limit;
    const limituploadMess =this.state.uploadMess;
  
    return (
          
         <div> 
              {this.uploadImageElement(this.state.uploadMess)}
              {(limit&&limituploadMess&&limituploadMess.length<limit||!limit||!limituploadMess) &&
                <a href="javascript:;" className={styles.upload}>
                   <Icon type="plus" />
                   上传图片
                  <input type="file" className={styles.change} onChange={this.uploadImags}/>
                </a>
              }
               <Modal width={showWidth} maskClosable={true} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
         </div>
    );
  }
 }




                   


    export default UploadImages;                 
