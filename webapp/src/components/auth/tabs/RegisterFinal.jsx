import React from 'react';
import { ThemeIcon, RingProgress, Text, Center } from '@mantine/core';
import { Check } from 'tabler-icons-react';

export default function RegisterFinal() {
    return (
        <>
        <h4>Registration Process</h4>
            <RingProgress
            sections={[{ value: 40, color: 'blue' }]}
            label={
                <Text color="blue" weight={700} align="center" size="xl">
                40%
                </Text>
            }
            />
        </>
    );
}