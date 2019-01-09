import React from 'react';
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({input: {value, onChange, ...restInput}, width, placeholder, timeFormat, showTimeSelect, meta: {touched, error}}, ...rest ) => {
	return (
		<Form.Field error={touched && !!error} width={width}>
			<DatePicker
				{...rest}
				placeholderText={placeholder}
				selected={value ? new Date(value) : null}
				onChange={onChange}
				showTimeSelect = {showTimeSelect}
				timeFormat={timeFormat}
				dateFormat='YYYY-MM-DD HH:mm'
				// {...restInput}
			/>
			{touched && error && <Label basic color='red'>{error}</Label>}
		</Form.Field>
	);
};


export default DateInput;