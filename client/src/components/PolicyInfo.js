import React from 'react';
import axios from 'axios';

export default class RenderPolicy extends React.Component {
  state = {
    policy: {}
  };

  componentDidMount() {
    const { policyId, homeId } = this.props
    if (policyId !== null) {
      axios.get(`/api/homes/${homeId}/policies/${policyId}`).then((res) => {
        console.log(res)
        this.setState({policy: res.data});
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  componentDidUpdate() {
    const { policyId, homeId } = this.props
    if( policyId !== null && policyId !== this.state.policy.id ) {
    axios.get(`/api/homes/${homeId}/policies/${policyId}`).then((res) => {
      console.log(res)
      this.setState({policy: res.data});
    }).catch((err) => {
      console.log(err)
    })
   }
  }
  render() {
    const { policy } = this.state
    if (this.state.policy.id) {
    return (
      <>
        <h3>{policy.name}</h3>
        <p>Issuer: {policy.issuer}</p>
        <p>{policy.issue_date}</p>
        <p>Policy Number: {policy.policy_num}</p>
        <p>Policy Type: {policy.type}</p>
        <p>Contact Info: {policy.contact_info}</p>
      </>
    )}
    return (
      <>
      </>
    )
  }
}