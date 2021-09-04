import config from '../../../env.json'

export const share = ({ title, objectID }: { title: string; objectID: string }) => {
  window.Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: title,
      description: '',
      imageUrl: `${config.baseURL}/modern-grotesque-times-share.png`,
      link: {
        mobileWebUrl: `${config.baseURL}/post/${objectID}`,
        androidExecParams: 'test'
      }
    },
    buttons: [
      {
        title: '웹으로 이동',
        link: {
          mobileWebUrl: `${config.baseURL}/post/${objectID}`
        }
      }
    ]
  })
}
