/**
* Feed.js
*
* @description :: Save the feeds a user has subscribed to
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    link: {
      type: 'url',
      required: true
    },
    title: {
      type: 'string',
      required: true,
    },
    tags: 'string',
    color: {
      type: 'string',
      required: true
    },
    read: 'array',
    owner: {
      model: 'user',
      required: true
    }
  }
};

