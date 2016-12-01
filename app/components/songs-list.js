import React from 'react';
import {Component} from 'react';
import { getSongList } from '../helpers/songs';

export default class SongsList extends Component {
    constructor(props) {
        super(props);

        this.state =  {
            list: [<li key="0" style={{'listStyle': 'none'}}> <img src="/images/preloader.svg" /> </li>],
            recommendedSongs: [<li key="0" style={{'listStyle': 'none'}}> <img src="/images/preloader.svg" /> </li>]
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.list !== nextState.list) {
            return true;
        }
        if (this.state.recommendedSongs !== nextState.recommendedSongs) {
            return true;
        }
        return false;
    }

    componentWillMount(){
        this.uploadList()
    }

    uploadList(){
        const userId = this.props.userId;
        getSongList(userId, (res, err) => {
            if(!err){
                let songList = [];
                let recommendedList = [];
                let songs = res.songs;
                let recommended = res.recommended;
                songs.forEach( (item, i) => {
                    songList.push(<li key={i}>{(item.artists[0].yandex_name ? item.artists[0].yandex_name : item.artists[0].name)+ "-" + item.title}</li>)

                });
                recommended.forEach( (item2, j) => {
                    recommendedList.push(<li key={j}>{(item2.yandex_name ? item2.yandex_name : item2.name)}</li>)

                });

                this.setState({
                    list: songList
                });
                this.setState({
                    recommendedSongs: recommendedList
                });
            }
        });
    }

    render() {
        return(
            <div  className="songLists">
                <div className="songList">
                    <h1>Список аудиозаписей</h1>

                    <ol className="songList">
                        {this.state.list}
                    </ol>
                </div>
                <div className="songList">
                    <h1>Список рекоммендаций</h1>

                    <ol>
                        {this.state.recommendedSongs}
                    </ol>
                </div>

            </div>
        )
    }
}