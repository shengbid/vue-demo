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
            return
            // 方法2
            // return data
          }

          const number =  Mock.mock({
            "number|1-6": 6
          })
          item.childs = loop([], number.number, level)
          
          // 方法2
          // const childrens = Mock.mock({
          //   "array|1-6": [
          //     "Mock.js"
          //   ]
          // })
          // childrens.array.forEach(() => {
          //   item.childs = []
          //   const number =  Mock.mock({
          //     "number|1-6": 6
          //   })
          //   return loop(item.childs, number.number, level)
          // })
          data.push(item)
        }

        // 方法2不需要return
        return data
      }
      loop(data)
      return {
        code: 200,
        message: 'success',
        data,
      }
    }
  },
  {
    url: '/get/check/table/list',
    type: 'get',
    response: (config) => {
      const page = config.body ? (JSON.parse(config.body)).page : 1
      let index = 0
      switch (Number(page)) {
        case 2:
          index = 10
          break;
        case 3:
          index = 20
          break;
      
        default:
          index = 0
          break;
      }
      let data = []
      for (let i = index; i < index + 10; i++) {
        const obj = {
          id: i,
          name: '黎明' + i,
          age: Math.floor(Math.random() * 20 + 1),
          class: Math.floor(Math.random() * 5 + 1)
        }
        data.push(obj)
      }
      return {
        code: 200,
        message: 'success',
        data
      }
    }
  }
]