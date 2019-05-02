export const setBase = (base) => {
  console.log(19999);
  return fetch(base)
    .then(res => res.blob())
    .then(blob => {
      return new File([blob], "eskiz");
    })
    .catch((error)=> console.log(error.message));
};

export const getBase = (file, next) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
    return next(reader.result);
  };
};

