const Response = {
  message: (h, code, message) => h.response({ status: code === 200 || code === 201 ? 'success' : 'fail', message }).code(code),
  data: (h, code, message, data) => h.response({ status: code === 200 || code === 201 ? 'success' : 'fail', message, data }).code(code),
  dataOnly: (h, code, data) => h.response({ status: code === 200 || code === 201 ? 'success' : 'fail', data }).code(code),
};

export default Response;
