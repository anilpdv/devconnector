import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProfileGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: 'f06f735aa74aad47bc9d',
            clientSecret: 'df5a10ff92d5acac03ea150d045583a5c50012e3',
            count: 5,
            sort: 'created: asc',
            repos: []
        }
    }

    componentDidMount() {
        const { username } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;
        const gitHubApiUrl = 'https://api.gihub.com/users/'+username+'repos?per_page='+'&sort='+sort+'&client_id='+clientId+'&client_secret='+clientSecret;
        fetch(gitHubApiUrl);

    }
    render() {
        return (
            <div>
                <h1>TOD: Pofile Github</h1>
            </div>
        )
    }
}

export default ProfileGithub;
