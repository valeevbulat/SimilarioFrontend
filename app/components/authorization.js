import React from 'react';
import {Component} from 'react';
import { login } from '../helpers/signin'
import cookie from 'react-cookie';

export default class Authorization extends Component {
    constructor(props) {
        super(props);

        this.state =  {
            userId: cookie.load('userId'),
            nickname: '',
            error: false,
            errorMsg: ''
        };
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.handleChangeNickname = this.handleChangeNickname.bind(this);
    }

    handleChangeNickname(event) {
        this.setState({nickname: event.target.value});
    }

    onLogin() {
        let nickname = this.state.nickname;

        console.log(nickname)

        if(!this.state.error) this.setState({error: !this.state.error});

        if(nickname){
            login(nickname,(res, err) =>{
                if(err) return console.log(err);
                if(res.userId)
                {
                    this.setState({userId: res.userId});
                    cookie.save('userId', res.userId, {path: '/'});
                }
                else{
                    this.setState({error: !this.state.error});
                    this.setState({errorMsg: 'Ошибка авторизации'})
                }
            });

        }else{
            this.setState({errorMsg: 'Заполните поле с вашим логином', error:!this.state.error})
        }
    }

    onLogout() {
        cookie.remove('userId', { path: '/' });
        /** Clear all cookies starting with 'session' (to get all cookies, omit regex argument) */
        Object.keys(cookie.select(/^session.*/i)).forEach(name => cookie.remove(name, { path: '/' }))
        this.setState({ userId: '' });
    }

    renderLogOut(){
        return(
            <div className="row">
                <div className="col-md-12 sign-out-button">
                    <button onClick={this.onLogout} className="btn btn-danger btn-large">Выйти</button>
                </div>
            </div>
        )
    }

    renderLogIn(){
        return(
             <div className="row">
                <div className="col-md-6">
                    <div className="sign-in-back">
                        <h1 className="sign-in-title">Вход</h1>
                        <div className="form-group">
                            {this.state.error ? (
                                <div className="alert alert-danger">{this.state.errorMsg}</div>
                            ) : (
                                <div></div>
                            )} 
                            <input type="text" value={this.state.nickname} onChange={this.handleChangeNickname} className="form-control" placeholder="Введите логин" />
                            <button onClick={this.onLogin} className="btn btn-success">Авторизоваться</button> 

                            
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

    render() {
        const renderLoginPanel = this.state.userId ? this.renderLogOut() : this.renderLogIn();
        return(
            <div>
                {renderLoginPanel}
            </div>
        )
    }
}