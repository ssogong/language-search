const BaseUrl = 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev';

export const getResult = (keyword) => {
  if (keyword.length === 0)
    return [];
  const result = fetch(BaseUrl + '/languages?' + new URLSearchParams({
    keyword: keyword
  }))
  .then(res => res.json())
  .then(data => data)
  return result;
};