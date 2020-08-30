import Mock from 'mockjs'
const Random = Mock.Random

export default [
  {
    url: '/upload/file',
    type: 'post',
    response: () => {
      const color = Random.color()
      const text = Random.word(4, 10)
      return {
        code: 200,
        message: 'success',
        data: {
          file: Random.image('400x300', color, '#FFF', text),
        }
      }
    }
  },
  {
    url: '/get/file/list',
    type: 'get',
    response: () => {
      const color = Random.color()
      const text = Random.word(4, 10)
      const data = {
        processList: []
      }
      for (let i = 1; i < 5; i++) {
        const item = {
          id: Random.id(),
          title: '流程' + i,
          fileList: []
        }
        if (i === 3) {
          item.fileList = [
            {
              uid: Random.id(),
              name: '测试文件1',
              url: Random.image('400x300', color, '#FFF', text),
            }
          ]
        }
        data.processList.push(item)
      }
      return {
        code: 200,
        message: 'success',
        data,
      }
    }
  }
]