import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Modal, Form, Icon, TextArea } from 'semantic-ui-react';
import { Actions } from '@actions/main';
import { IFetch } from '../../models/fetch';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import * as service from '../../services';

type EditFormProps = {
  className?: string;
  editId: string;
  editName: string;
  editMobile: string;
  editArea: string;
  editStable: string;
  editDesc: string;
  editDayStart: string;
  editDayEnd: string;
  editNightStart: string;
  editNightEnd: string;
};
const formPropos = {
  title: '修改保全資料',
  selectStationCounts: '駐點人數',
  selectArea: '地區'
};
const backdropStyle = {
  marginTop: '0px !important',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: 'rgba(0,0,0,0.3)',
  padding: 50
};
const timeFormat = 'HH:mm';
type FStateProps = IFetch;
type DispatchProps = typeof Actions;
type Props = EditFormProps & FStateProps & DispatchProps;

class EditForm extends Component<Props> {
  public state = {
    open: false,
    dimmer: true,
    closeondocument: false,
    closeondimmer: false,
    sname: this.props.editName,
    smobile: this.props.editMobile,
    sstable: this.props.editStable,
    sarea: this.props.editArea,
    sdesc: this.props.editDesc,
    sid: this.props.editId,
    daystart: this.props.editDayStart,
    dayend: this.props.editDayEnd,
    nightstart: this.props.editNightStart,
    nightend: this.props.editNightEnd
  };
  public show = (dimmer: boolean) => () => this.setState({ dimmer, open: true });
  public close = () => this.setState({ open: false });

  public fetchStation() {
    const {
      sname, smobile, sstable, sarea, sdesc, sid,
      daystart, dayend, nightstart, nightend
    } = this.state;
    this.props.fetchBegin();
    const obj: object = {
      'name': sname,
      'mobile': smobile,
      'area': sarea,
      'stable': sstable,
      'desc': sdesc,
      'daystart': daystart,
      'dayend': dayend,
      'nightstart': nightstart,
      'nightend': nightend,
      'id': sid
    };
    service.putStation(obj)
      .then((response: any) => {
        if (response === 'yes') {
          this.props.fetchSendSuccess();
        }
      }, (error) => {
        this.props.fetchFailure(error);
      });
  }
  public edit = () => {
    this.setState({ open: false });
    this.fetchStation();
  }
  public change = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  public timePickDayStart = (value: any) => {
    this.setState({ daystart: value.format('HH:mm') });
  }
  public timePickDayEnd = (value: any) => {
    this.setState({ dayend: value.format('HH:mm') });
  }
  public timePickNightStart = (value: any) => {
    this.setState({ nightstart: value.format('HH:mm') });
  }
  public timePickNightEnd = (value: any) => {
    this.setState({ nightend: value.format('HH:mm') });
  }
  public render() {
    const {
      open, dimmer, closeondocument, closeondimmer,
      sname, smobile, sstable, sarea, sdesc,
      daystart, dayend, nightstart, nightend} = this.state;
    const button = <Button onClick={this.show(true)} icon><Icon name='compose' /></Button>;
    return (
      <Modal
        closeOnDimmerClick={closeondimmer}
        closeOnDocumentClick={closeondocument}
        dimmer={dimmer}
        onClose={this.close}
        open={open}
        className={this.props.className}
        style={backdropStyle}
        trigger={button}
      >
        <Modal.Content image scrolling>
          <Modal.Description>
            <Header>{formPropos.title}</Header>
            <Form>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>駐點名稱</label>
                  <input placeholder='請輸入駐點名稱' name='sname' value={sname} onChange={this.change} />
                </Form.Field>
                <Form.Field label={formPropos.selectArea} name='sarea' value={sarea} control='select' onChange={this.change}>
                  <option value='北區'>北區</option>
                  <option value='中區'>中區</option>
                  <option value='南區'>南區</option>
                  <option value='東區'>東區</option>
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field>
                  <label>駐點電話</label>
                  <input placeholder='駐點電話' name='smobile' value={smobile} onChange={this.change} />
                </Form.Field>
                <Form.Field label={formPropos.selectStationCounts} name='sstable' value={sstable} control='select' onChange={this.change}>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </Form.Field>
              </Form.Group>
              <Form.Group inline>
                <Form.Field>
                  <label>日班時數起始</label>
                  <TimePicker
                    format={timeFormat}
                    defaultValue={moment(daystart, 'HH:mm')}
                    onChange={this.timePickDayStart}
                    showSecond={false}
                    minuteStep={30}
                    hideDisabledOptions
                  />
                </Form.Field>
                <Form.Field>
                  <label>日班時數結束</label>
                  <TimePicker
                    format={timeFormat}
                    defaultValue={moment(dayend, 'HH:mm')}
                    onChange={this.timePickDayEnd}
                    showSecond={false}
                    minuteStep={30}
                    hideDisabledOptions
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group inline>
                <Form.Field>
                  <label>晚班時數起始</label>
                  <TimePicker
                    format={timeFormat}
                    defaultValue={moment(nightstart, 'HH:mm')}
                    onChange={this.timePickNightStart}
                    showSecond={false}
                    minuteStep={30}
                    hideDisabledOptions
                  />
                </Form.Field>
                <Form.Field>
                  <label>晚班時數結束</label>
                  <TimePicker
                    format={timeFormat}
                    defaultValue={moment(nightend, 'HH:mm')}
                    onChange={this.timePickNightEnd}
                    showSecond={false}
                    minuteStep={30}
                    hideDisabledOptions
                  />
                </Form.Field>
              </Form.Group >
              <Form.Group widths='equal'>
                <Form.Field
                  id='form-textarea-control-opinion'
                  control={TextArea}
                  label='描述'
                  placeholder='請輸入描述'
                  name='sdesc'
                  value={sdesc}
                  onChange={this.change}
                  rows={3}
                  style={{ resize: 'none' }}
                />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={this.edit} >修改</Button>
          <Button color='black' onClick={this.close}>取消</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect<FStateProps, DispatchProps>(
  (state: any) => state.fetch,
  Actions
)(EditForm);
