import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {makeRequest} from '../../../../libs/request';
import Checkbox from '../../../../common/Checkbox/Checkbox';
import _ from 'lodash';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recentPost: [],
            searchPost: [],
            textSearch: '',
            chooseRecent: [],
            chooseSearch: []
        }
    }

    componentWillMount() {
        let {t, currentApp} = this.props;
        this.getRecentPost(currentApp);
    }

    getRecentPost(currentApp) {
        makeRequest('get', `/admin/${currentApp}/posts/recent`,{
            isPublish: 1
        })
            .then(result => {
                if (result.signal) {
                    let data = result.data;
                    this.setState({
                        recentPost: data
                    });
                } else {
                    console.log(result.message);
                }
            }).catch(err => {
                console.log(err);
            });
    }

    onChangeInput(e) {
        let value = e.target.value;
        this.setState({
            textSearch: value
        });

        if (value.length < 2) return;

        setTimeout(() => {
            this.searchPost(value)
        },900);
    }

    searchPost(text) {
        let {t, currentApp} = this.props;
        let {textSearch} = this.state;
        if (textSearch != text) return;

        makeRequest('get', `/admin/${currentApp}/posts/search`,{
            isPublish: 1,
            q: text
        })
            .then(result => {
                if (result.signal) {
                    let data = result.data;
                    this.setState({
                        searchPost: data,
                        chooseSearch: []
                    });
                } else {
                    console.log(result.message);
                }
            }).catch(err => {
                console.log(err);
            });
    }

    onCheckPost(data) {
        let {chooseRecent, chooseSearch} = this.state;
        let {check, id, type} = data;
        let typeChoose, dataChoose;

        if (type == 'recent') {
            typeChoose = 'chooseRecent';
            dataChoose = chooseRecent;
        } else {
            typeChoose = 'chooseSearch';
            dataChoose = chooseSearch;
        }

        if (check) {
            dataChoose.push(id);
            this.setState({
                [typeChoose]: dataChoose
            });
        } else {
            dataChoose = dataChoose.filter(item => { return item != id});
            this.setState({
                [typeChoose]: dataChoose
            });
        }
    }

    addToMenu() {
        let {menu, currentApp} = this.props;
        let {chooseRecent, chooseSearch, recentPost, searchPost} = this.state;
        let allChoose = _.union(chooseRecent, chooseSearch);
        if (!menu || !allChoose.length) return;

        let allPost = _.union(recentPost, searchPost);
        let dataMenu = allPost.filter(item => {
            return allChoose.indexOf(item.id) >= 0;
        }).map(val => {
            return {
                title: val.title,
                link: `/${val.slug}`,
                type: 'post',
                type_id: val.id
            }
        });

        makeRequest('post', `/admin/${currentApp}/navMenu/addChild`, {
            dataMenu,
            menu
        })
        .then(result => {
            if (result.signal) {
                let data = result.data;
                let menuUpdate = data.menu;
                let {newMenu} = data;
                this.props.addToMenu(newMenu, menuUpdate);
            } else {
                console.log(result.message);
                showErrorMessage(result.message);
            }
        }).catch(err => {
            console.log(err);
            showErrorMessage(err);
        });
    }

    renderPost(listPost, type) {
        if (!listPost.length) {
            return 'No posts found';
        }

        // let {chooseRecent, chooseSearch} = this.state;
        // let dataChoose = (type == 'recent') ? chooseRecent : chooseSearch;

        let contentPost = listPost.map((item, idx) => {
            // let isCheck = dataChoose.indexOf(item.id) >= 0 ? true: false;
            return <Checkbox type={type} isCheck={false} title={item.title} id={item.id} key={idx} onChange={this.onCheckPost.bind(this)}/>
        });

        return (
            <div className="form-group pt-15">
                {contentPost}
            </div>
        );
    }

    render() {
        let {recentPost, searchPost, textSearch} = this.state;

        return (
            <div>
                <div className="tabbable">
                    <ul className="nav nav-tabs nav-tabs-solid nav-justified">
                        <li className="active"><a href="#solid-justified-tab1" data-toggle="tab" aria-expanded="true">Recent</a></li>
                        <li className=""><a href="#solid-justified-tab2" data-toggle="tab" aria-expanded="false">Search</a></li>
                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane active" id="solid-justified-tab1">
                            {this.renderPost(recentPost, 'recent')}
                        </div>

                        <div className="tab-pane" id="solid-justified-tab2">
                            <div className="form-group">
                                <input type="search" value={textSearch} className="form-control" placeholder="Search" onChange={this.onChangeInput.bind(this)}/>
                            </div>
                            {this.renderPost(searchPost, 'search')}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="pull-right mt-10">
                        <button type="submit" className="btn btn-default" onClick={this.addToMenu.bind(this)}>Add To Menu</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default translate('translations')(Post);