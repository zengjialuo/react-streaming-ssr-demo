let data;
const getData = () => {
  if (!data) {
    data = new Promise((resolve) => {
      setTimeout(() => {
        data = "content from remote";
        resolve();
      }, 2000);
    });
    throw data;
  }

  // promise-like
  if (data && data.then) {
    throw data;
  }

  const result = data;
  data = undefined;
  return result;
};

export default function Content() {
  const data = getData();
  // const data = 'local content'
  return <div>{data}</div>;
}
