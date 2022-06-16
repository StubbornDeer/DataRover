import React from 'react';
import { Accordion, Checkbox, Container, Button, Group, Paper, PasswordInput, Text, TextInput, ThemeIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'; 

function ConnectForm(props) {
    const formString = useForm({
        initialValues: {
            string: props.data.string
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    const formParams = useForm({
        initialValues: props.data.params,
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    const finish = (values)=>{
        props.goNext(formParams.values, 'params')
    }
    const DBConnectionStringForm = 
        <form>
            <TextInput
                required
                label={"Enter the connection string in the format \"postgres://username:password@host:port/database\" "}
                {...formString.getInputProps('string')}
            />
            <Group position="right" mt="md">
                <Button type="submit" onClick={()=>props.goNext(formString.values.string, 'string')}>Finish</Button>
            </Group>
        </form>;
    const DBConnectionParamsForm = 
        <form>
            <TextInput
                required
                label="Username"
                {...formParams.getInputProps('username')}
            />
            <PasswordInput
                required
                label="Password"
                {...formParams.getInputProps('password')}
            />
            <TextInput
                required
                label="Database Host"
                {...formParams.getInputProps('host')}
            />
            <TextInput
                required
                label="Database Port"
                {...formParams.getInputProps('port')}
            />
            <TextInput
                required
                label="Database Name"
                {...formParams.getInputProps('dbname')}
            />
            <Group position="right" mt="md">
                <Button type="submit" onClick={()=>props.goNext(formParams.values, 'params')}>Finish</Button>
            </Group>
        </form>;
    return (
        <React.Fragment>
            <Text my="md">Select one of the ways to connect to your PostgreSQL database</Text>
            <Accordion disableIconRotation 
                m="md" 
                className="connect-accordion" iconPosition="right">
                <Accordion.Item
                    label="Connection String">
                    {DBConnectionStringForm}
                </Accordion.Item>
                <Accordion.Item
                    label="Connection Parameters">
                    {DBConnectionParamsForm}
                </Accordion.Item>
            </Accordion>
            <Container mt="md">
                <Button variant="default" onClick={()=>props.goBack(
                    {string: formString.values.string, 
                    params: formParams.values})}>Back</Button>
            </Container>
        </React.Fragment>
    );
}
export default ConnectForm;