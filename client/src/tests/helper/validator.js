import TestWrapper from '../components/TestWrapper';

// mock jquery validator
export default global.window.$ = jest.fn((details) => {
  return {
    validate: (context) => {
      const error = {};
      Object.keys(context.rules).forEach((key) => {
        if (context.rules[key].required) {
          if (TestWrapper.call().state.user[key].length > 0) {
            return Promise.resolve(context.submitHandler());
          } else {
            error[key] = 'must not be empty';
            context.errorPlacement(error);
          }
        }
      });
    },
    data: () => true,
    append: (error) => {
      TestWrapper.call().state.error = error;
    },
    validator: {
      addMethod: () => {}
    },
    on: jest.fn(),
  };
});
