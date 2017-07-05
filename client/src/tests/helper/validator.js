import TestWrapper from '../components/TestWrapper';

// mock jquery validator
export default global.window.$ = jest.fn((details) => {
  return {
    validate: (context) => {
      return Promise.resolve(context.submitHandler());
    },
    data: () => true,
    append: (error) => {
      TestWrapper.call().state.error = error;
    },
    validator: {
      addMethod: () => {}
    },
    on: jest.fn(),
    sideNav: jest.fn(),
    tabs: jest.fn(),
    material_select: jest.fn(),
  };
});
