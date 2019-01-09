import React from 'react';
import { Form, Label } from 'semantic-ui-react'

// REUSABLE COMPONENT

const TextInput = ({input, width, type, placeholder, meta: {touched, error}}) => {
	return (
		<Form.Field error={touched && !!error} width={width}>
			{console.log(input)}
			{console.log('...input', {...input})}
			<input {...input} type={type} placeholder={placeholder}/>
			{touched && error && <Label basic color='red'>{error}</Label>}
		</Form.Field>
	);
};

export default TextInput;