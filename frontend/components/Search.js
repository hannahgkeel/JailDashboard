import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import '../styles/Search.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Typography, Button } from "@material-ui/core";
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function Search() {
    let history = useHistory()

    // Initialize state
    const [state, setState] = useState({
        county: '',
        all: false,
        pretrial: false,
    });

    const handleChange = (event, value) => {
        setState({...state, county: value});
    }

    const handleCheckboxChange = (event) => {
        if (event.target.name === 'all') {
            setState({...state, all: true, pretrial: false})
        } else {
            setState({...state, all:false, pretrial: true})
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        history.push({
            pathname: '/county',
            state: state,
        })
        console.log("Submit button pressed.");
    }

    return (
        <div className='search-div pure-u-11-12 pure-u-md-1-2 pure-g'>
            <Typography variant="h6">Search by county name</Typography>
            <div className="search-input pure-u-1 pure-u-md-2-3">
                <form onSubmit={handleSubmit} style={{width: 300}}>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={counties.map((option) => option.name)}
                        onChange={handleChange}         // onChange triggered when user selects from dropdown
                        onInputChange={handleChange}    // onInputChange triggered when user types
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="County Name"
                            margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
                            />
                        )}
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={state.all} onChange={handleCheckboxChange} name="all" /> }
                            label='All Detainees'
                        />
                        <FormControlLabel
                            control={<Checkbox checked={state.pretrial} onChange={handleCheckboxChange} name="pretrial" /> }
                            label='Pretrial Detainees'
                        />
                    </FormGroup>

                    <Button type="submit" variant="contained" color="primary" size="small">Search</Button>
                </form>
            </div>
        </div>
    );
}

const counties = [
    {name: 'Orange County'},
    {name: 'Foryth County'}
];