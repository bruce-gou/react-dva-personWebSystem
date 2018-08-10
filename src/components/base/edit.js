/**
 * 富文本编辑器
 */
import React from "react";
import BraftEditor from "braft-editor";
import "braft-editor/dist/braft.css";
import { URL } from "@/utils/config";
class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange = content => {
    if(this.props.onChange){
      this.props.onChange(content);
    }
  };
  componentWillUnmount() {
  	
  }
  shouldComponentUpdate(nextProps,nexrState){
  	return this.props.value !== nextProps.value;
  }
  render() {
  	const { value }  = this.props;
	const id = Math.random() * 10;
    let innerContent = value ? value : "";
    const editorProps = {
      height: 400,
      contentFormat: "html",
      placeholder: "请输入内容",
      initialContent: innerContent,
      contentId:id,
      onChange: this.handleChange,
      onRawChange: this.handleRawChange,
      disabled: false,
      controls:[
		  'undo', 'redo', 'split', 'font-size', 'font-family', 'letter-spacing',
		  'indent','text-color', 'bold', 'italic', 'underline', 'strike-through',
		  'superscript', 'subscript', 'remove-styles', 'emoji', 'text-align', 'split', 'headings', 'list_ul',
		  'list_ol', 'blockquote', 'code', 'split', 'link', 'split', 'hr', 'split', 'media', 'clear'
		],
      media: {
        allowPasteImage: true,
        image: true,
        video: false,
        audio: false,
        uploadFn: null,
        removeConfirmFn: null,
        onRemove: null,
        onChange: null,
        onInsert: null,
        uploadFn:(param) => {
		  const serverURL = `${URL}/admin/upload/test`;
		  const xhr = new XMLHttpRequest();
		  xhr.open('POST', serverURL, true)
//		  xhr.setRequestHeader("Authorization",`Bearer ${token}`)
		  const fd = new FormData();
		  // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
		  //console.log(param.libraryId)
		  const successFn = (response) => {
//		  	let data = JSON.parse(xhr.responseText)[0];
		  	const path = URL + xhr.responseText;
		    // 假设服务端直接返回文件上传后的地址
		    // 上传成功后调用param.success并传入上传后的文件地址
		    param.success({
		      url: path,
//		      meta: {
//		        id: data.id,
//		        title: 'xxx',
//		        alt: 'xxx',
//		        loop: falde, // 指定音视频是否循环播放
//		        autoPlay: false, // 指定音视频是否自动播放
//		        controls: false, // 指定音视频是否显示控制栏
//		        poster: 'http://xxx/xx.png', // 指定视频播放器的封面
//		      }
		    })
		  }
		
		  const progressFn = (event) => {
		    // 上传进度发生变化时调用param.progress
		    param.progress(event.loaded / event.total * 100)
		  }
		
		  const errorFn = (response) => {
		    // 上传发生错误时调用param.error
		    param.error({
		      msg: 'unable to upload.'
		    })
		  }
		
		  xhr.upload.addEventListener("progress", progressFn, false)
		  xhr.addEventListener("load", successFn, false)
		  xhr.addEventListener("error", errorFn, false)
		  xhr.addEventListener("abort", errorFn, false)
		
		  fd.append('file', param.file)
		  xhr.send(fd)
		}
      }
    }; // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器 // 开启图片插入功能 // 开启视频插入功能 // 开启音频插入功能 // 指定本地校验函数，说明见下文 // 指定上传函数，说明见下文 // 指定删除前的确认函数，说明见下文 // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组) // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组) // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)

    return (
      <div className="demo">
        <BraftEditor {...editorProps} />
      </div>
    );
  }
}

export default Test;
