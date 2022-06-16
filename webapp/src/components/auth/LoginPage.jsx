import React from 'react';
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

function LoginPage() {
    const form = useForm({
        initialValues: {
            email: '',
            termsOfService: false,
        },
    
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    
    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
                required
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
            />
            <Checkbox
                mt="md"
                label="I agree to sell my privacy"
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />
            <Group position="center" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    );
}
export default LoginPage;