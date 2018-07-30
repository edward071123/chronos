import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddFormMoal from '@components/worker/add';
import EditFormMoal from '@components/worker/edit';
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import { Actions } from '@actions/main';
import { IFetch } from '../../models/fetch';
import * as service from '../../services';

type ListTableProps = {
    className?: string;
};

type FStateProps = IFetch;
type DispatchProps = typeof Actions;
type Props = ListTableProps & FStateProps & DispatchProps;

class ListTable extends Component<Props> {
    constructor(prop: Props) {
        super(prop);
        this.getWorkers();
    }

    public componentWillUpdate(nextProps: Props) {
        if (nextProps.sendfinish) {
            this.getWorkers();
        }
    }
    public getWorkers() {
        this.props.fetchBegin();
        service.getWorkers()
            .then((response: any) => {
                this.props.fetchGetDataSuccess(response);
            }, (error) => {
                this.props.fetchFailure(error);
            });
    }
    public deleteWorker(getId: any) {
        this.props.fetchBegin();
        const obj: object = { 'id': getId };
        service.deleteWorker(obj)
            .then((response: any) => {
                if (response === 'yes') {
                    this.props.fetchSendSuccess();
                    alert('刪除成功');
                }
            }, (error) => {
                this.props.fetchFailure(error);
            });
    }
    public getLists() {
        const {items} = this.props;
        const rows: JSX.Element[] = [];
        Object.keys(items).map((id: any) => {
            // tslint:disable-next-line:no-string-literal
            const getItemName = items[id]['name'];
            const getItemMobile = items[id]['mobile'];
            rows.push(
                <Table.Row key={`worker-${id}}`}>
                    <Table.Cell>{id}</Table.Cell>
                    <Table.Cell>{getItemName}</Table.Cell>
                    <Table.Cell>{getItemMobile}</Table.Cell>
                    <Table.Cell selectable>
                        <EditFormMoal
                            editId={id}
                            editName={getItemName}
                            editMobile={getItemMobile}
                        />
                        <Button icon onClick={this.deleteWorker.bind(this, id)}> <Icon name='trash' /></Button>
                    </Table.Cell>
                </Table.Row>);
        });
        return rows;
    }
    public render() {
        const {loading} = this.props;
        if (loading) {
            return (
                <Message icon>
                    <Icon name='circle notched' loading />
                        <Message.Content>
                        <Message.Header>Loading</Message.Header>
                    </Message.Content>
                </Message>
            );
        }
        return (
            <div className={this.props.className} >
                <AddFormMoal />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>保全</Table.HeaderCell>
                            <Table.HeaderCell>手機</Table.HeaderCell>
                            <Table.HeaderCell>動作</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.getLists()}</Table.Body>
                </Table>
            </div>
        );
  }
}

export default connect<FStateProps, DispatchProps>(
    (state: any) => state.fetch,
    Actions
)(ListTable);