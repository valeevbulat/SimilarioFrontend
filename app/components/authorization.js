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
                else{
                    this.setState({userId: res.userId});
                    cookie.save('userId', res.userId, {path: '/'});
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
            <div>
                <button onClick={this.onLogout}>Выйти</button>
            </div>
        )
    }

    renderLogIn(){
        return(
            <div>
                <h1>Войти</h1>
                <input type="text" value={this.state.nickname} onChange={this.handleChangeNickname} />
                <button onClick={this.onLogin}>Авторизоваться</button>

                {this.state.error ? (
                    <div style={{color: "#cc0000"}}>{this.state.errorMsg}</div>
                ) : (
                    <div></div>
                )}
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