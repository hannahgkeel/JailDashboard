import React, { Component } from "react";
import Pie from './Pie'

const data = {
    labels: ['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Hispanic or Latino', 'Native or Other Pacific Islander', 'White'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [50, 70, 60, 70, 50, 60],
            backgroundColor: ['orange', 'brown', 'blue', 'yellow', 'purple', 'teal'],
        }
    ]
}

class SexGraph extends Component {
    render() {
        return  (
            <Pie data={data} title='Race'/>
        )
    }
}

export default SexGraph;