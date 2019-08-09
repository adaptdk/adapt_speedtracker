import * as Utils from './Utils';
import { apiUrl } from './Constants';

const sendProfile = values => (
  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(Utils.formatProfileValues(values)),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(data => data)
    .catch(err => err)
);

export default sendProfile;
