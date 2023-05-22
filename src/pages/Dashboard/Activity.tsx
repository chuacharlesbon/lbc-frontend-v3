import React, { FC } from 'react';
import { Div, Divider, FlexColumn, FlexRow } from '../../core/Containers';
import { NavbarMain } from '../../components/Navigation/NavbarMain';
import { TopNavBar } from '../../components/Navigation/TopNavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { classNames } from '../../helpers/ClassNames';
import { ActiveTab, PastTab, DraftTab } from './ActivityTabs';

export const Activity: FC<any> = () => {

    const navigate = useNavigate();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const actionQuery = query.get('option');

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const tabs = ['Active', 'Past', 'Draft'];

    React.useEffect(() => {
        if (actionQuery === '0') {
            setSelectedIndex(0)
            navigate('/activity');
        } else if (actionQuery === '1') {
            setSelectedIndex(1)
            navigate('/activity');
        } else if (actionQuery === '2') {
            setSelectedIndex(2)
            navigate('/activity');
        }
    }, [actionQuery, navigate])

    return (
        <FlexRow className='w-full h-full items-center justify-between overflow-hidden scrollbar-hide'>
            {/* Side Navigation */}
            <NavbarMain route='Activity' />

            {/* Main Dashboard */}
            <FlexColumn className='w-11/12 h-full'>

                {/* Top Navigation */}
                <TopNavBar
                    showMenu={true}
                    showNotifBell={true}
                    showSearchBar={true}
                />

                {/* Body */}
                <Div className='w-full h-full p-10 bg-white'>
                    <FlexRow className='w-full h-full'>
                        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                            <FlexColumn className='w-full h-full'>
                                <Tab.List className="tabletWide:space-x-4">
                                    {tabs.map((tab: any) => (
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'p-2 font-semibold w-auto focus:border-b-4 focus:border-yellow-400 ring:border-yellow-400 outline-none',
                                                    selected
                                                        ? 'text-yellow-100 border-b-4 border-yellow-400'
                                                        : 'text-secondary-200  hover:text-secondary-100',
                                                )
                                            }
                                            key={tab}
                                        >
                                            {tab}
                                        </Tab>
                                    ))}
                                </Tab.List>
                                <Divider className="text-grey-400" />
                                <Tab.Panels className="w-full h-full">
                                    <Tab.Panel className={`w-full h-full`}>
                                        <ActiveTab />
                                    </Tab.Panel>
                                    <Tab.Panel className={`w-full h-full`}>
                                        <PastTab />
                                    </Tab.Panel>
                                    <Tab.Panel className={`w-full h-full`}>
                                        <DraftTab />
                                    </Tab.Panel>
                                </Tab.Panels>
                            </FlexColumn>
                        </Tab.Group>
                    </FlexRow>
                </Div>
            </FlexColumn>
        </FlexRow>
    );
};