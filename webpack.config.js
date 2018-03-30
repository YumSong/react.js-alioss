/**
 * 
 * @authors zcy (1366969408@qq.com)
 * @date    2018-03-29 09:30:35
 * @version $Id$
 */
const path = require('path');
module.exports={
   entry:'./src/index.js',
   output:{
   	  path: path.resolve(__dirname,'dist'),
   	  filename:'main.js'
   },

   module: {
	    rules: [
	      {
	         test: /\.(js|jsx)$/,
	         include: path.resolve(__dirname,'src'), 
	         //exclude:[path.resolve(__dirname,'node_modules')],
	         use: [
	            { 
	            	loader: 'babel-loader',
	            	options:{
	            		  presets:[
	            		   //"es2015",
	            		   "env",
					       "react",
					       //"stage-1"
					       ],
					      "plugins": [
							 ["transform-es2015-arrow-functions", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
						  ]
	            	} 
	            }
	          ]
	      },{
	      	test: /\.less$/, 
	      	loader: 'style-loader!css-loader!less-loader'
	      },
	      {
	        test: /\.css$/,
	        use: [
	          { loader: 'style-loader' },
	          {
	            loader: 'css-loader',
	            options: {
	              modules: true
	            }
	          }
	        ]
	      }
	    ]
  }
}
