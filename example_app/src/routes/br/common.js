'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message2 = require('antd/es/message');

var _message3 = _interopRequireDefault(_message2);

require('antd/es/message/style/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//上传图片到阿里云  

/**
 * 
 * @authors zcy (1366969408@qq.com)
 * @date    2018-03-28 09:51:18
 * @version $Id$
 */
var current_checkpoint = void 0;

var progress = function progress(p, checkpoint) {
  return function (done) {
    current_checkpoint = checkpoint;
    // console.log(p * 100+ '%')
    // var bar = document.getElementById('progress-bar');
    // bar.style.width = Math.floor(p * 100) + '%';
    // bar.innerHTML = Math.floor(p * 100) + '%';
    done();
  };
};
var uploadFile = function uploadFile(file, client, key, index) {

  if (!client) {
    _message3.default.error("没有阿里上传的凭证,请先获取");
    return;
  }
  var uploadFileClient = client;
  var options = {
    progress: progress,
    partSize: 100 * 1024,
    meta: {
      year: 2017,
      people: 'test'
    }
  };
  if (current_checkpoint) {
    options.checkpoint = current_checkpoint;
  }
  return new Promise(function (resolve, reject) {
    var nowindex = index;
    uploadFileClient.multipartUpload(key, file, options).then(function (res) {
      //console.log('upload success: %j', res);
      current_checkpoint = null;
      uploadFileClient = null;
      res.successIndex = nowindex;
      resolve(res);
    }).catch(function (err) {

      reject({ error: 'error', failIndex: nowindex });
      if (uploadFileClient && uploadFileClient.isCancel()) {
        _message3.default.error('stop-upload!');
      } else {
        _message3.default.error(err);
      }
    });
  });
}; //上传图片初始化信息
exports.default = uploadFile;