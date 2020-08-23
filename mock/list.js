import Mock from 'mockjs'
const Random = Mock.Random

export default [
  {
    url: '/get/classify/list',
    type: 'get',
    response: () => {
      // 创建树形数据
      let data = []
      const loop = (data, count = 3, l = 0) => {
        const level = l + 1
        for (let i = 0; i < count; i++) {
          const item = {
            id: Random.id(),
            level,
            name: Random.title(1, 4), 
          }
          if (level > 4) {
            return data
          }
          const childrens = Mock.mock({
            "array|1-6": [
              "Mock.js"
            ]
          })

          childrens.array.forEach(() => {
            item.childs = []
            const number =  Mock.mock({
              "number|1-6": 6
            })
            return loop(item.childs, number.number, level)
          })
          data.push(item)
        }

      }
      loop(data)
      return {
        code: 200,
        message: 'success',
        data,
      }
    }
  }
]