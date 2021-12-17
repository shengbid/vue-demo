<template>
  <div class='container'>
    <h3>vue-tree-chart组件</h3>
      <vue-tree
        style="width: 1000px; height: 600px; border: 1px solid gray;"
        :dataset="vehicules"
        :config="treeConfig"
        linkStyle="straight"
      >
        <template v-slot:node="{ node, collapsed }">
          <div
            class="rich-media-node"
            :style="{ border: collapsed ? '2px solid grey' : '' }"
          >
            <span style="padding: 4px 0; font-weight: bold;"
            >能力值{{ node.name }}</span
            >
          </div>
        </template>
      </vue-tree>
      <vue-tree
        style="width: 1000px; height: 600px; border: 1px solid gray;"
        :dataset="vehicules"
        :config="treeConfig"
        direction="horizontal"
      >
        <template v-slot:node="{ node, collapsed }">
          <div
            class="rich-media-node"
            :style="{ border: collapsed ? '2px solid grey' : '' }"
          >
            <span style="padding: 4px 0; font-weight: bold;"
            >能力值{{ node.name }}</span
            >
          </div>
        </template>
      </vue-tree>
  </div>
</template>
<script>
import VueTree from '@ssthouse/vue-tree-chart'

export default {
  name: 'treemap',
  components: { VueTree },
  data() {
    return {
      vehicules: {
        name: 'Wheels',
        children: [
          {
            name: 'Wings',
            children: [
              {
                name: 'Plane'
              }
            ]
          },
          {
            name: 'Piston',
            customID: 3
          },
          {
            name: 'Carburetor',
            children: [
              {
                name: 'Truck',
                customID: 2
              },
              {
                name: 'Car',
                customID: 2
              }
            ]
          },
          {
            name: 'Valve',
            customID: 4
          },
          {
            name: 'Crankshaft',
            customID: 1
          }
        ],
        // links: [
        //   { parent: 1, child: 2 },
        //   { parent: 3, child: 2 },
        //   { parent: 4, child: 2 }
        // ],
        // identifier: 'customID'
      },
      treeConfig: { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .box {
    width: 1000px; height: 800px; border: 1px solid gray;margin-top:20px;
  }
}

.rich-media-node {
  width: 80px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #f7c616;
  border-radius: 4px;
}
</style>
