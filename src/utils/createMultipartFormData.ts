const createMultipartFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

export default createMultipartFormData;
