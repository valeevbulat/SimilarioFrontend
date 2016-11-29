import React from 'react';
import {Component} from 'react';
import { getSongList } from '../helpers/songs';

export default class SongsList extends Component {
    constructor(props) {
        super(props);

        this.state =  {
            list: [<li key="0">Загрузка адиозаписей...</li>]
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.list !== nextState.list) {
            return true;
        }
        return false;
    }

    render() {
        const userId = this.props.userId;
        getSongList(userId, (res, err) => {
            if(!err){
                let songList = [];
                res.forEach( (item, i) => {
                    songList.push(<li key={i}>{(item.artists[0].yandex_name ? item.artists[0].yandex_name : item.artists[0].name)+ "-" + item.title}</li>)

                });
                this.setState({
                    list: songList
                })
            }
        });

        return(
            <div>
                <h1>Список аудиозаписей</h1>

                <ol>
                    {this.state.list}
                </ol>
            </div>
        )
    }
}