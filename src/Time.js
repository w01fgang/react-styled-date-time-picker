// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
// import InputSlider from 'react-input-slider';

const labels = {
  ru: {
    hours: 'Часы',
    minutes: 'Минуты',
  },
  en: {
    hours: 'Hours',
    minutes: 'Minutes',
  },
  it: {
    hours: 'Ore',
    minutes: 'Minuti',
  },
  es: {
    hours: 'Ore',
    minutes: 'Minuti',
  },
  pt: {
    hours: 'Ore',
    minutes: 'Minuti',
  },
};

const TimeContainer = styled.div`
  color: #fff;
  padding-top: 50px;
  display: ${props => (props.visible ? 'block' : 'none')};
  height: 270px;
`;

const TimeInputContainer = styled.div`
  text-align: center;
`;

const Label = styled.span`
  display: ${props => (props.visible ? 'inline-block' : 'none')};
  width: 65px;
  height: 65px;
  font-size: 38px;
  line-height: 65px;
  background-color: #CC2262;
  border-radius: 3px;
  text-align: center;
  font-family: Roboto;  
`;

const Input = styled.input`
  display: ${props => (props.show ? 'inline-block' : 'none')};
  width: 65px;
  height: 65px;
  font-size: 38px;
  line-height: 65px;
  background-color: #CC2262;
  border-radius: 3px;
  text-align: center;
  -webkit-appearance: none;
  color: #fff;
  border: 0;
  padding: 0;
  margin: 0;
  vertical-align: baseline;
  outline: 0;
  font-family: Roboto;
`;

const Separater = styled.span`
  display: inline-block;
  font-size: 32px;
  font-weight: bold;
  color: #CC2262;
  width: 32px;
  height: 65px;
  line-height: 65px;
  text-align: center;
`;

type Position = {
  x: number,
  y: number,
}

type Props = {
  visible: boolean,
  moment: Object,
  language: Language,
  onChange: Function,
};

type State = {
  editHours: boolean,
  editMinutes: boolean,
};

class Time extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editHours: false,
      editMinutes: false,
    };
  }
 
  getHours = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const m = this.props.moment;
    m.hours(parseInt(e.target.value, 10));
    this.props.onChange(m);
    this.editHours();
  }
  
  getMinutes = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const m = this.props.moment;
    m.minutes(parseInt(e.target.value, 10));
    this.props.onChange(m);
    this.editMinutes();
  }

  editHours = () => {
    this.setState({ editHours: !this.state.editHours });
    console.log(this.hours);
    
    setTimeout(() => {
      if (this.hours) this.hours.focus();
    }, 0);
  }

  editMinutes = () => {
    this.setState({ editMinutes: !this.state.editMinutes });
    setTimeout(() => {
      if (this.minutes) this.minutes.focus();
    }, 0);
  }

  hours: ?HTMLInputElement;
  minutes: ?HTMLInputElement;

  changeMinutes = (pos: Position) => {
    this.setState(() => ({ editMinutes: false }));
    const m = this.props.moment;
    m.minutes(parseInt(pos.x, 10));
    this.props.onChange(m);
  }
  
  changeHours = (pos: Position) => {
    this.setState(() => ({ editHours: false }));
    const m = this.props.moment;
    m.hours(parseInt(pos.x, 10));
    this.props.onChange(m);
  }
  
  render() {
    const { editHours, editMinutes } = this.state;
    
    const { moment, language, visible } = this.props;
    return (
      <TimeContainer visible={visible}>
        <TimeInputContainer>
          <Input
            type="text"
            defaultValue={moment.format('HH')}
            onBlur={this.getHours}
            min={0}
            max={23}
            innerRef={(node) => { this.hours = node; }}
            show={editHours}
          />
          <Label visible={!editHours} onClick={this.editHours}>
            {moment.format('HH')}
          </Label>
          <Separater>:</Separater>
          <Input
            type="text"
            className="time"
            defaultValue={moment.format('mm')}
            onBlur={this.getMinutes}
            min={0}
            max={23}
            innerRef={(node) => { this.minutes = node; }}
            show={editMinutes}
          />
          <Label visible={!editMinutes} onClick={this.editMinutes}>
            {moment.format('HH')}
          </Label>
        </TimeInputContainer>

        {/* <div className="sliders">
          <div className="time-text">{labels[language].hours}:</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={23}
            x={moment.hour()}
            onChange={this.changeHours}
          />
          <div className="time-text">{labels[language].minutes}:</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={59}
            x={moment.minute()}
            onChange={this.changeMinutes}
          />
        </div> */}
      </TimeContainer>
    );
  }
}

export default Time;
