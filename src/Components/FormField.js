import React from "react";
import './FormField.css'

export default (props) => (
    <div className="edit-form-field">
        <span> {props.label}</span>
        <input type="text" defaultValue={props.value} className={"field-" + props.label} key={props.value} />
    </div>
);