import React from 'react';
import { ActionIcon, Checkbox, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function RegisterForm(props) {
    const form = useForm({
        initialValues: props.data,
        validate: {
            email: (value) => {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(value) ? null : 'Invalid email';
            },
            confirmPassword: (value, values) =>
                (value !== values.password ? 'Passwords did not match' : null),
        },
    });
    /*<form onSubmit={form.onSubmit((values) => {props.goNext(form.values);})}>*/
    return (    
        <form onSubmit={form.onSubmit((values) => {props.submit(values);})}>
            <TextInput 
                label="Name" 
                placeholder="Name" 
                {...form.getInputProps('name')} />
            <TextInput
                mt="md"
                required
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
            />
            <PasswordInput
                mt="md"
                required
                label="Password"
                placeholder="Password"
                {...form.getInputProps('password')}
            />
            <PasswordInput
                mt="md"
                label="Confirm password"
                placeholder="Confirm password"
                {...form.getInputProps('confirmPassword')}
            />

            <Group position="center" mt="md">
                {/*<Button type="submit">Next</Button>*/}
                <Button type="submit">Register</Button>
            </Group>
        </form>
    );
}
export default RegisterForm;