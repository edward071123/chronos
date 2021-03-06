import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import ShiftTable from '@components/shift/list';
import StationTable from '@components/station/list';
import WorkerTable from '../containers/worker';
import CountTable from '../containers/count';

type MainTabProps = {
    className?: string;
    onChangeAreaEvent?: any;
    selectArea: string;
};

const tablTitle = {
    title1: '班表管理',
    title2: '駐點管理',
    title3: '保全管理',
    title4: '保全時數',
};
class MainTab extends Component<MainTabProps> {
    public panes = [
        {
            menuItem: tablTitle.title1, render: () =>
                <Tab.Pane attached={false}><ShiftTable /></Tab.Pane>
        },
        {
            menuItem: tablTitle.title2, render: () =>
                // tslint:disable-next-line:jsx-wrap-multiline
                <Tab.Pane attached={false}>
                    <StationTable
                        onChangeAreaEvent={this.props.onChangeAreaEvent}
                        selectArea={this.props.selectArea}
                    />
                </Tab.Pane>
        },
        {
            menuItem: tablTitle.title3, render: () =>
                <Tab.Pane attached={false}><WorkerTable /></Tab.Pane>
        },
        {
            menuItem: tablTitle.title4, render: () =>
                <Tab.Pane attached={false}><CountTable/></Tab.Pane>
        },
    ];
    public render() {
        return (
            <Tab className={this.props.className} panes={this.panes} menu={{ pointing: true }} />
        );
    }
}
export default MainTab;
