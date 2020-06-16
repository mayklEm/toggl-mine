import React from 'react';

import Entry from './Entry';

import sampleEntries from '../sample-entries.json';


class App extends React.Component {
    state = {
        entries: {}
    }

    buildRedmineLogTimeUrl = (issue, date, duration) => {
        return `https://tracker.ait-themes.com/issues/${issue}/time_entries/new?time_entry[activity_id]=9&time_entry[issue_id]=${issue}&time_entry[project_id]=&time_entry[spent_on]=${date}&time_entry[hours]=${duration}`;
    }

    updateEntryDescription = (key, description) => {
        // TODO: API request to Toggl to update entry
        const entries = {...this.state.entries};
        entries[key].description = description;

        this.setState({entries});
    }

    updateEntryTag = (key) => {
        // TODO: api request to Toggl to update entry
        const entries = {...this.state.entries};
        entries[key].tags = entries[key].tags.concat(['logged']);

        this.setState({entries});
    }

    componentDidMount() {
        const entries = {};

        sampleEntries.data.map(function(entry) {
            entries[entry.id] = entry
        })

        this.setState(function() {
            return {
                'entries': entries
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                {Object.keys(this.state.entries).map((key) => {
                    return <Entry 
                        key={key}
                        details={this.state.entries[key]}
                        updateDescription={this.updateEntryDescription}
                        updateTag={this.updateEntryTag}
                        redmineLogUrl={this.buildRedmineLogTimeUrl}
                    />;
                })}
            </React.Fragment>
        );
    }
}

export default App;