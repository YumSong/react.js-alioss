'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require('antd/es/modal');

var _modal2 = _interopRequireDefault(_modal);

var _icon = require('antd/es/icon');

var _icon2 = _interopRequireDefault(_icon);

var _message2 = require('antd/es/message');

var _message3 = _interopRequireDefault(_message2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/es/modal/style/css');

require('antd/es/icon/style/css');

require('antd/es/message/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _style = require('./style.less');

var _style2 = _interopRequireDefault(_style);

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @authors zcy (1366969408@qq.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date    2018-03-20 16:52:27
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version $Id$
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var UploadImages = function (_React$Component) {
  _inherits(UploadImages, _React$Component);

  function UploadImages(props) {
    _classCallCheck(this, UploadImages);

    var _this = _possibleConstructorReturn(this, (UploadImages.__proto__ || Object.getPrototypeOf(UploadImages)).call(this, props));

    _this.showMaodal = function (url, width) {

      _this.setState({
        previewVisible: true,
        previewImage: url,
        modalwiddth: width

      });
    };

    _this.deleteFile = function (url) {

      if (_this.state.uploadMess && _this.state.uploadMess.length > 0) {
        _this.state.uploadMess.map(function (item, index) {
          if (item.url == url) {
            _this.state.uploadMess.splice(index, 1);
            _this.setState({
              uploadMess: _this.state.uploadMess
            }, function () {
              _this.props.onChange(null);
            });
            return;
          }
        });
      }
      //this.props.deleteFile(url) 
    };

    _this.handleCancel = function () {
      _this.setState({
        previewVisible: false
      });
    };

    _this.changeV = function (preval, now) {

      if (!preval && now[0].aliurl) {
        _this.props.onChange(now);
      }
      if (preval && now) {
        if (preval[0] && now[0] && now[0].aliurl != preval[0].aliurl) {
          _this.props.onChange(now);
        }
      }
    };

    _this.uploadImags = function (event) {
      var uploadMess = _this.state.uploadMess;
      var file = event.target.files[0];
      var url = _this.getObjectURL(file);
      if (url) {
        var data = [];

        if (uploadMess) {
          uploadMess.push({ url: url, fail: 'loading' });
          data = uploadMess;
        } else {
          data.push({ url: url, fail: 'loading' });
        }
        uploadMess = data;
        _this.setState({
          uploadMess: uploadMess
        }, function () {
          // this.props.onChange(uploadMess)
        });
      }
      if (file) {
        _this.uploadImagsAli(file, uploadMess);
      }
    };

    _this.uploadImagsAli = function (file, uploadMess) {
      if (!_this.props.clientOss) {
        _message3.default.error("没有阿里上传凭证");
        return;
      }
      if (file) {
        var self = _this;
        var key = _this.props.keyOss + "/" + new Date().getTime() + file.name;
        (0, _common.uploadFile)(file, _this.props.clientOss, key, uploadMess.length).then(function (res) {
          // console.log(res)
          //成功 
          var resultAliUrl = res.res.requestUrls[0];
          var successIndex = res.successIndex;
          if (uploadMess && uploadMess.length > 0) {
            uploadMess.map(function (item, index) {
              if (index == successIndex - 1) {
                //上传成功
                uploadMess[index].fail = 'false';
                uploadMess[index].aliurl = resultAliUrl;
                self.setState({
                  uploadMess: uploadMess
                });
                _this.props.onChange(uploadMess);
                return;
              }
            });
          }
          self.setState({
            uploadMess: uploadMess
          });
        }, function (error) {
          var failIndex = error.failIndex; //第几个
          if (uploadMess && uploadMess.length > 0) {
            uploadMess.map(function (item, index) {
              if (index == failIndex - 1) {
                //上传失败
                uploadMess[index].fail = 'true';
                self.setState({
                  uploadMess: uploadMess
                });
                return;
              }
            });
          }
        });
      }

      // uploadMess
    };

    _this.getObjectURL = function (file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    };

    _this.uploadImageElement = function (uploadMess) {
      /// this.props.onChange(uploadMess)
      if (uploadMess && uploadMess.length > 0) {
        return uploadMess.map(function (item, index) {
          var img = new Image();
          img.src = item.url;
          var natureSizeWidth = img.width;
          var natureSizeHeight = img.height;
          var mess = '';
          if (item.fail == 'loading') {
            mess = '上传中';
          }
          if (item.fail == 'true') {
            mess = '上传失败';
          }
          return _react2.default.createElement(
            'div',
            { className: _style2.default.block, style: {
                borderColor: item.fail == 'true' ? 'red' : '#dfdfdf'
              } },
            _react2.default.createElement(
              'div',
              { className: _style2.default.blockinner, style: {
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden'

                } },
              _react2.default.createElement(
                'span',
                { className: _style2.default.reporate },
                _react2.default.createElement(
                  'span',
                  { className: _style2.default.inconWrap },
                  _react2.default.createElement(_icon2.default, { className: _style2.default.icons, type: 'delete', onClick: function onClick() {
                      _this.deleteFile(item.url);
                    } }),
                  _react2.default.createElement(_icon2.default, { className: _style2.default.icons, type: 'eye-o', onClick: function onClick() {
                      _this.showMaodal(item.url, natureSizeWidth);
                    } })
                )
              ),
              _react2.default.createElement(
                'p',
                { className: ' ' + _style2.default.uploadState + ' ' + (item.fail == 'true' ? _style2.default.error : '') },
                mess
              ),
              _react2.default.createElement('img', { style: { width: '100%', height: 'auto' }, src: item.url })
            )
          );
        });
      }
    };

    _this.state = {
      previewVisible: false,
      previewImage: null,
      uploadMess: _this.props.uploadMess || []
    };
    return _this;
  }

  _createClass(UploadImages, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        userName: '11'
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Should be a controlled component.

      if ('uploadMess' in nextProps && nextProps.uploadMess) {
        var value = nextProps.value ? nextProps.value.toString() : nextProps.value;
        this.setState({
          uploadMess: nextProps.uploadMess
        });
        // this.changeV(this.state.uploadMess,nextProps.uploadMess)
      }
    }
    //获取图片路径

  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          previewVisible = _state.previewVisible,
          previewImage = _state.previewImage,
          modalwiddth = _state.modalwiddth;

      var showWidth = modalwiddth ? modalwiddth < 400 ? modalwiddth : 500 : 500;
      var limit = this.props.limit;
      var limituploadMess = this.state.uploadMess;

      return _react2.default.createElement(
        'div',
        null,
        this.uploadImageElement(this.state.uploadMess),
        (limit && limituploadMess && limituploadMess.length < limit || !limit || !limituploadMess) && _react2.default.createElement(
          'a',
          { href: 'javascript:;', className: _style2.default.upload },
          _react2.default.createElement(_icon2.default, { type: 'plus' }),
          '\u4E0A\u4F20\u56FE\u7247',
          _react2.default.createElement('input', { type: 'file', className: _style2.default.change, onChange: this.uploadImags })
        ),
        _react2.default.createElement(
          _modal2.default,
          { width: showWidth, maskClosable: true, visible: previewVisible, footer: null, onCancel: this.handleCancel },
          _react2.default.createElement('img', { alt: 'example', style: { width: '100%' }, src: previewImage })
        )
      );
    }
  }]);

  return UploadImages;
}(_react2.default.Component);

exports.default = UploadImages;