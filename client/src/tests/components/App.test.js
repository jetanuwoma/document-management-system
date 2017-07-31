import React from 'react';
import ReactDOM from 'react-dom';
import PreLoader from '../../components/templates/PreLoader.jsx';
import TestWrapper from './TestWrapper';
import App from '../../components/App.jsx';

describe('Main Wrapper component', () => {
  const wrapper = TestWrapper.mounts(App,
    { children: <PreLoader />, location: { pathname: '/' } });

  const rendered = TestWrapper.renders(App,
   { children: <PreLoader />, location: { pathname: '/' } }).html();

  it('should contain a wrapper `div`', () => {
    expect(wrapper.find('div').length).toBe(12);
  });

  it('Should mount the header component', () => {
    expect(wrapper.find('Header').length).toBe(1);
  });

  it('Should mount the default Preloader as child', () => {
    expect(rendered.includes('<div class="circle"></div>')).toBe(true);
    expect(rendered.includes('<div class="preloader-wrapper big active">')).toBe(true);
  });
});
