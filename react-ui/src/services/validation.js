// checks if the value falls under the wrong value

export default (value, type, mod)=> {

  if(mod === "SEND") {

    if(value.length === 0) {

      switch (type) {
        case "MESSAGE":
          return false;

        case "FILE":
          return false;

        default:
          return true;
      }

    }

  } else {

    if(value.length === 0) {
      return null
    }

  }

  switch (type) {

    case "NAME":
      return value.match(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/) === null;

    case "PHONE":
      return value.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/) === null;

    case "EMAIL":
      return value.match(/^[-A-Z-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:ru|aero|arpa|asia|biz|cat|com|ua|rus|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/) === null;

    case "TEXT":
      return value.match(/^(?!<$)(?!>$)(?!https:$|http:$)(.*)/) === null || value.length < 5 || value.length > 100

    case "MESSAGE":
      return value.match(/^(?!<$)(?!>$)(?!https:$|http:$)(.*)/) === null || value.length > 500;

    case "FILE":
      return value.size > 2500000 && value.length > 1000;

    default:
      return false;

  }

}
