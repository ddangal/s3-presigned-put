import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import axios from 'axios';


class App extends Component {
  
  uploadFile(event){
    
    event.preventDefault()
    var rawInput1 = document.getElementById('file1')
    var rawInput2 = document.getElementById('file2')
    var rawInput3 = document.getElementById('file3')
    var rawInput4 = document.getElementById('file4')
    var rawInput5 = document.getElementById('file5')
    


    var file1=rawInput1.files[0]
    var file2=rawInput2.files[0]
    var file3=rawInput3.files[0]
    var file4=rawInput4.files[0]
    var file5=rawInput5.files[0]

    
    var requestURL = 'https://5wjmgfnyyd.execute-api.us-east-1.amazonaws.com/stage/generateurl'

    var formData = {'file1':file1.name
    ,'file2':file2.name,'file3':file3.name,'file4':file4.name,'file5':file5.name
  } 
     
    axios.post(requestURL, formData)
    .then(
      res => {
        
        console.log(res.data)
        for (const [key, value] of Object.entries(res.data)) {
          const config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log(percentCompleted);
            }
          };
          var actualfile = ''
          if(key == 'file1'){
            actualfile = file1
          }
          if(key == 'file2'){
            actualfile = file2
          }
          if(key == 'file3'){
            actualfile = file3
          }
          if(key == 'file4'){
            actualfile = file4
          }
          if(key == 'file5'){
            actualfile = file5
          }
          axios.put(value,actualfile,config)
          .then(
            res => {
              console.log(res)
              
            }
          ).catch(function (err) {
            console.log(err);
          });
        }
        
      }
    ).catch(function (err) {
      console.log(err);
      alert("error occured")
    });

    // var h = {headers:{'Content-Type': file.type}}
  
  }
  

  render(){
    return (
      <div className="App">
        <br/><br/>
        <input id='file1' type='file'/><br/><br/>
        <input id='file2' type='file'/><br/><br/>
        <input id='file3' type='file'/><br/><br/>
        <input id='file4' type='file'/><br/><br/>
        <input id='file5' type='file'/><br/><br/>
        <button onClick={this.uploadFile.bind(this)}>Submit</button>
      </div>
    );
  }
  
}

export default App;
