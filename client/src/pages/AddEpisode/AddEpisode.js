import React from 'react';
import {server_API_URL, serverURL} from '../../config';

import {Link, Redirect} from 'react-router-dom';

import './AddEpisode.scss';

export class AddEpisode extends React.Component {

    constructor() {
        super();
        this.state = {
            fireRedirect: false
        }

        this.doSubmit = this
            .doSubmit
            .bind(this);
    }

    redirect(res) {
        if (res.status === 200) {
            window.location.href = serverURL;
        } else {
            // Something went wrong here
        }
    }

    doSubmit(e) {
        e.preventDefault();
        var season = this.refs.season.value;
        var title = this.refs.title.value;
        var description = this.refs.description.value;
        var length = this.refs.length.value;

        fetch(server_API_URL + "series/addEpisode", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                stitle: this
                    .props
                    .match
                    .url
                    .split('/')[2],
                season: season - 1,
                title: title,
                description: description,
                length: length
            })
        }).then(() => {
            this.setState({fireRedirect: true})
        });
    }

    render() {
        const {from} = this.props.location.state || {
            from: {
                pathname: '/series/' + this
                    .props
                    .match
                    .url
                    .split('/')[2]
            }
        }
        const {fireRedirect} = this.state;

        if (fireRedirect) {
            return (<Redirect to={from}/>)
        }

        return (
            <div>
                <Link class="o-backLink" to="/series">
                    <p>Back to series list</p>
                </Link>
                <h1>Adding an episode to {this
                        .props
                        .match
                        .url
                        .split('/')[2]}</h1>
                <form>
                    <input
                        ref="season"
                        type="text"
                        name="season"
                        id="season"
                        placeholder="Season"
                        required/>
                    <br/><br/>
                    <input
                        ref="title"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        required/>
                    <br/><br/>
                    <input
                        ref="description"
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description"
                        required/>
                    <br/><br/>
                    <input
                        ref="length"
                        min='0'
                        type="number"
                        name="length"
                        id="length"
                        placeholder="Length"
                        required/>
                    <br/><br/>
                    <button onClick={this.doSubmit}>Adding this episode</button>
                </form>
            </div>
        )
    }
}