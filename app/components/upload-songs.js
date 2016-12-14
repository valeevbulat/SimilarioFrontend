import React from 'react';
import Dropzone from 'react-dropzone';
import {Component} from 'react';
import { uploadSong } from '../helpers/songs';

export default class UploadSongs extends Component {
    constructor(props) {
        super(props);

        this.state =  {
            maxSize: 1024*1024*30,
            minSize: 1024*1024*0.1,
            acceptTypes: 'audio/mpeg, audio/mp3',
            show: true,
            error: false,
            errorMsg: [<li key="0">{""}</li>],
            success: false,
            successMsg: [<li key="0">{""}</li>]
        };

        this.onDrop = this.onDrop.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.show !== nextState.show) {
            return true;
        }
        if (this.state.error !== nextState.error || this.state.errorMsg !== nextState.errorMsg) {
            return true;
        }
        if (this.state.success !== nextState.success || this.state.successMsg !== nextState.successMsg) {
            return true;
        }
        return true;
    }

    onDrop(acceptedFiles, rejectedFiles) {
        this.setState({
            error: false,
            errorMsg: [<li key="0">{""}</li>],
            success: false,
            successMsg: [<li key="0">{""}</li>]
        });
        if(rejectedFiles.length > 0){
            let list = [<li key={this.list.length}>{'Ошибка валидации файл(а/ов)'}</li>]
            this.setState({
                error: true,
                errorMsg: list
            });
            return false
        }
        if(acceptedFiles.length > 0 && acceptedFiles.length <= 10){
            this.setState({
                show: !this.state.show
            });

            acceptedFiles.forEach((item, i, arr) =>{
                let list = [], listS = [];
                uploadSong(item, this.props.userId, (err, res) => {
                    if(err === 'Error'){
                        console.log('error')
                        if(this.state.error){
                            list = this.state.errorMsg;
                            list.push(<li key={i}>{`Ошибка (${res}) при загрузке файла ${item.name}`}</li>)
                                this.setState({
                                    error: true,
                                    errorMsg: list
                                });
                        }else{
                            list = [<li key={i}>{`Ошибка (${res}) при загрузке файла ${item.name}`}</li>]
                            this.setState({
                                error: true,
                                errorMsg: list
                            });
                        }
                    }else {
                        if(this.state.success){
                            listS = this.state.successMsg;
                            listS.push(<li key={i}>{`Файл загружен - ${item.name}`}</li>)
                        }else{
                            listS = [<li key={i}>{`Файл загружен - ${item.name}`}</li>]
                        }
                        this.setState({
                            success: true,
                            successMsg: listS
                        });
                    }

                    if(arr.length == i+1){
                        this.setState({
                            show: true
                        });
                    }
                })
            })
        }else{
            let list;
            list = [<li key={i}>{'Ошибка в описании файла ' + item.name}</li>]
            this.setState({
                error: true,
                errorMsg: list,

            });
            return false
        }
    }

    render() {
        let error, success, dropzone;
        if(this.state.error){
            error = (
                <div className="error">
                    <ul>
                        {this.state.errorMsg}
                    </ul>
                </div>
            );
        }else {
            error = '';
        }
        if(this.state.success){
            success = (
                <div className="success">
                    <ul>
                        {this.state.successMsg}
                    </ul>
                </div>
            );
        }else {
            success = '';
        }

        if(this.state.show){
            dropzone = (
                <div>
                    <Dropzone className={'dropzone'} rejectClassName={'dropzone--active'} onDrop={this.onDrop} maxSize={this.state.maxSize} minSize={this.state.minSize} accept={this.state.acceptTypes}>
                        <div>Переместите файлы в эту область или кликните сюда для их загрузки.</div>
                    </Dropzone>
                    {error}
                    {success}
                </div>
            );
        }else {
            dropzone = (
                <div>
                    <div className="preloader dropzone">
                        <img src="/images/preloader-black.svg" width="37px" />
                    </div>
                    {error}
                    {success}

                </div>
            );
        }

        return (
            <div>
                {dropzone}
            </div>
        );
    }
}