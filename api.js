const BaseUrl = 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev';

export const getResult = async (keyword) => {
  const result = fetch(BaseUrl + '/languages?' + new URLSearchParams({
    keyword: keyword
  }))
  .then(async res => res.json())
  .then(async data => data);
  return result;
};