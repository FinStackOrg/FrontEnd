import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SimpleCard from './Card';
import {React, useState, useEffect} from 'react';

export default function TabCard ({title, total, pctChange, assets, username, reload, setReload}) {
    const [tabValue, setTabValue] = useState('1');
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
      };
    return (
        <Box sx={{ width: '100%' }}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        value={tabValue}
                        onChange={handleTabChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="1" label="Daily Change" />
                        <Tab value="2" label="Since Bought" />
                    </TabList> 
                </Box>
                <TabPanel value="1">
                    {/* <SimpleCard title={title} total={total} pctChange={pctChange} assets={assets} username={username} reload={reload} setReload={setReload}/> */}
                </TabPanel>
            </TabContext>
        </Box>
    )
    
}