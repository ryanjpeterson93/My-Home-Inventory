import React from "react";
import axios from "axios";
import { Form, InputNumber, DatePicker } from "antd";

class AssessmentForm extends React.Component {
  state = {
    date: null,
    land_value: "",
    structure_value: "",
    total_value: "",
  };


  handleSubmit = () => {
    const { homeId } = this.props

    axios.post(`/api/homes/${homeId}/assessments`, this.state).then((res) => {
      console.log(res);
      this.setState({
        date: null,
        land_value: "",
        structure_value: "",
        total_value: "",
      })
    });
  };

  handleDate = (date) => {
    this.setState({ date: date });
  };

  handleLandValueChange = (value) => {
    this.setState({ land_value: value });
  };

  handleStructureValueChange = (value) => {
    this.setState({ structure_value: value });
  };

  handleTotalValueChange = (value) => {
    this.setState({ total_value: value });
  };

  render() {
    const {
      date, 
      land_value, 
      structure_value,
      total_value
    } = this.state;
    return (
      <>
        <div>
        <Form onFinish={this.handleSubmit}>
        <Form.Item >
        <p>Date</p>
            <DatePicker
              label="Date"
              placeholder="Assessment Date"
              autoFocus
              required
              name="date"
              value={date}
              onChange={this.handleDate}
              style={inputWidth}
            />
          </Form.Item>
          <Form.Item>
          <p>Land Value</p>
            <InputNumber
              label="Land Value"
              required
              name="land_value"
              value={land_value}
              defaultValue={0}
              placeholder="price"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={this.handleLandValueChange}
              style={inputWidth}
              />
          </Form.Item>
          <Form.Item>
          <p>Structure Value</p>
            <InputNumber
              label="Structure Value"
              required
              name="structure_value"
              value={structure_value}
              defaultValue={0}
              placeholder="Structure Value"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={this.handleStructureValueChange}
              style={inputWidth}
            />
          </Form.Item>
          <Form.Item>
          <p>Total Value</p>
            <InputNumber
              label="Total Value"
              required
              name="total_value"
              value={total_value}
              defaultValue={0}
              placeholder="Total Value"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={this.handleTotalValueChange}
              style={inputWidth}
            />
          </Form.Item>
          </Form>
        </div>
      </>
    );
  }
}

const inputWidth = {
  width: '180px'
}


export default AssessmentForm;