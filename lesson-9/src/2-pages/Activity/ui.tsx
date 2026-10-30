import { Box, CircularProgress, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Activity, Suspense, useEffect, useState, type FC, type PropsWithChildren, type SyntheticEvent } from 'react';
import { useConsistentPromiseCb } from '6-shared/lib/useConsistentPromiseCb';

export const ActivityPage: FC = () => {
    const [tab, setTab] = useState('one');

    const handleChange = (_event: SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    return (
        <>
            <Typography align="center" variant="h3" sx={{ mb: 2 }}>
                Activity
            </Typography>
            <Tabs
                value={tab}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                centered
                variant="fullWidth"
                sx={{ mb: 4 }}
            >
                <Tab value="one" label="Обычный компонент" />
                <Tab value="two" label="Activity" />
            </Tabs>
            <Suspense fallback={<CircularProgress />}>
                {tab === 'one' && <div>First Tab Content</div>}

                <Activity mode={tab === 'two' ? 'visible' : 'hidden'}>
                    <TabContent index={2} />
                </Activity>
            </Suspense>
        </>
    );
};

export const TabContent: FC<PropsWithChildren<{ index: number }>> = ({ index }) => {
    const [value, setValue] = useState('');

    const data = useConsistentPromiseCb('user1', () =>
        fetch('https://jsonplaceholder.typicode.com/users/1').then((r) => r.json()),
    );

    useEffect(() => {
        console.log(`${index} render`);

        return () => console.log(`${index} unmount`);
    }, [index]);

    return (
        <Box>
            <TextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="FIO"
                id="outlined-basic"
                label="FIO"
                variant="outlined"
            />
            <pre>{JSON.stringify(data, undefined, 2)}</pre>
        </Box>
    );
};
