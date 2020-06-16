import React from 'react';

import { formatDateTime, durationInHours, getTicketIdFromDescription } from '../helpers';

class Entry extends React.Component {

    descriptionInputRef = React.createRef();

    handleClick = () => {
        this.props.updateDescription(this.props.details.id, this.descriptionInputRef.current.value);
    }

    handleLog = (event) => {
        this.props.updateTag(this.props.details.id);
    }

    isAlreadyLogged = () => {
        return this.props.details.tags.includes('logged');
    }

    render() {
        const {description, start, dur} = this.props.details;

        const issue = getTicketIdFromDescription(description);
        const date = start.substring(0, 10);
        
        return (
            <div>
                { formatDateTime(start) }: { durationInHours(dur) } h
                { getTicketIdFromDescription(description) ? (
                    <React.Fragment>
                        {description}
                        {!this.isAlreadyLogged() && 
                            <a onClick={this.handleLog} type="button" target="_blank" href={this.props.redmineLogUrl(issue, date, description)}>Log in tracker</a>
                        }
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <input defaultValue={description} ref={this.descriptionInputRef} /><button onClick={ this.handleClick }>Update</button>
                    </React.Fragment>

                )}
            </div>
        );
    }
}

export default Entry;