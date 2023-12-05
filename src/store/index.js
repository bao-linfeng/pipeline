import { reactive, inject } from 'vue';
import { getValue } from '../util/ADS';

const stateSymbol = Symbol('state');

const state = reactive({ 
  token: getValue('token') || '',
  userKey: getValue('userKey') || '',
  userName: getValue('userName') || '',
  profile: getValue('profile') ? JSON.parse(getValue('profile')) : {},
  avatar: getValue('avatar') || '',
  siteKey: '1528234980',
  origin: window.location.origin || '',
  switchToken: '',
});

const changePropertyValue = (property, value) => {
  state[property] = value;
}

const useState = () => inject(stateSymbol);

export {
  stateSymbol, state, useState, changePropertyValue,
}