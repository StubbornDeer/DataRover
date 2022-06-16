import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Box, Stepper} from '@mantine/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'; 

import RegisterForm from './tabs/RegisterForm';
import RegisterFinal from './tabs/RegisterFinal';
import ConnectForm from '@src/components/adapters/postgres/ConnectForm';

function RegisterPage() {
    let data = {
        registration: {
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
        },
        string: '',
        params: {
            username: '',
            password: '',
            host: '',
            port: '5432',
            dbname: ''
        }
    };
    const form = useForm({
        initialValues: data.registration,  
        validate: {
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null,
        },
    });
    const submitData = (data)=>{
        console.log(data)
    };
    const onChange = (objectName, fieldName, value)=>{

    };
    const [active, setActive] = useState(0);
    const [formData, updateFormData] = React.useState(data);
    const toRegistrationStep = () => setActive(0);
    const toDbStep = () => setActive(1);
    const toReviewAndFinish = () => setActive(2);
    useEffect(() => {
        //console.log(formData)
    }, [formData]);

    return (
        
        <Box className="auth-box" mx="auto" my="md">
            <div className="auth-box-title">
                <h4>Welcome to DataRover!</h4>
                <img src="/static/images/rover.png"/>
            </div>
            <Stepper active={active} completedIcon={<FontAwesomeIcon icon={solid('circle-check')} />} mt="md">
                <Stepper.Step icon={<FontAwesomeIcon icon={solid('user')}/>} 
                    label="Step 1" 
                    description="Create an account">
                    <RegisterForm
                        onChange={onChange}
                        goNext={(values)=>{
                            updateFormData({
                                ...formData,
                                registration: values
                            });
                            toDbStep();
                        }}
                        submit={(values)=>{
                            var data = {formData, registration: values};
                            submitData(data);
                            updateFormData({
                                ...formData,
                                registration: values
                            });
                        }}
                        data={formData.registration}/>
                </Stepper.Step>
                <Stepper.Step 
                    icon={<FontAwesomeIcon icon={solid('database')}/>} 
                    label="Step 2" description="Connect the database">
                        <ConnectForm 
                            onChange={onChange}
                            data={formData}
                            goBack={(values, section)=>{
                                updateFormData({
                                    ...formData,
                                    ...values
                                });
                                toRegistrationStep();
                            }}
                            goNext={(values, section)=>{
                                updateFormData({
                                    ...formData,
                                    [section]: values
                                });
                                toReviewAndFinish();
                            }}/>
                </Stepper.Step>
                <Stepper.Step 
                    icon={<FontAwesomeIcon icon={solid('flag-checkered')}/>} 
                    label="Step 3" description="Finish the setting up">
                        <RegisterFinal/>
                </Stepper.Step>
            </Stepper>
            
        </Box>
    );
}
export default RegisterPage;