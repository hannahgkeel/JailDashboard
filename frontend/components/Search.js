import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FreeSolo() {
    return (
        <div style={{width: 300}}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={counties.map((option) => option.name)}
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
        </div>
    );
}

const counties = [
    {name: 'Orange County'},
    {name: 'Foryth County'}
];