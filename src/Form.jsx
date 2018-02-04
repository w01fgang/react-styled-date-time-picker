yarn// @flow
import React, { Component } from 'react';
import cx from 'classnames';
import type Moment from 'moment';
import Calendar from './Calendar';
import Time from './Time';

const labels = {
  ru: {
    date: 'Дата',
    time: 'Время',
  },
  en: {
    date: 'Date',
    time: 'Time',
  },
  it: {
    date: 'Data',
    time: 'Tempo',
  },
  es: {
    date: 'Fecha',
    time: 'Tiempo',
  },
  pt: {
    date: 'Data',
    time: 'Hora',
  },
};

type Props = {
  onChange: Function,
  onSave: Function,
  moment: Moment,
  language: string,
};

type State = {
  tab: 0 | 1,
};

class Form extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tab: 0,
    };
  }

  handleClickTab = (tab: 0 | 1, e: Event) => {
    if (e) e.preventDefault();
    this.setState(() => ({ tab }));
  }

  handleSave = (e: Event) => {
    if (e) e.preventDefault();
    this.props.onChange();
    if (this.props.onSave) this.props.onSave();
  }

  switchTabOne = (e: Event) => this.handleClickTab(0, e);
  switchTabTwo = (e: Event) => this.handleClickTab(1, e);

  render() {
    const { tab } = this.state;
    const { moment, language } = this.props;

    return (
      <div>
        <div className="m-input-moment">
          <div className="options">
            <button
              type="button"
              className={cx('ion-calendar im-btn', { 'is-active': tab === 0 })}
              onClick={this.switchTabOne}
            >
              {labels[language].date}
            </button>
            <button
              type="button"
              className={cx('ion-clock im-btn', { 'is-active': tab === 1 })}
              onClick={this.switchTabTwo}
            >
              {labels[language].time}
            </button>
          </div>

          <div className="tabs">
            <Calendar
              language={this.props.language}
              className={cx('tab', { 'is-active': tab === 0 })}
              moment={moment}
              onChange={this.props.onChange}
              switchTab={this.switchTabTwo}
            />
            <Time
              language={this.props.language}
              className={cx('tab', { 'is-active': tab === 1 })}
              moment={moment}
              onChange={this.props.onChange}
            />
          </div>

          <button type="button" className="im-btn btn-save ion-checkmark" onClick={this.handleSave}>
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default Form;
