<template>
  <div class="mt-4">
    <el-button>ADD</el-button>
  </div>
  <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" :selectable="selectable" width="55" />
    <el-table-column property="question" label="提问" width="120"></el-table-column>
    <el-table-column property="content" label="内容" width="120" />
    <el-table-column property="type" label="训练数据类型" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="demo-pagination-block">

    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 50, 100, 200]"
      :size="size" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const multipleTableRef = ref()
const multipleSelection = ref([])

const selectable = (row) => ![1, 2].includes(row.id)

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const tableData = [
  {
    id: 1,
    question: 'question',
    content: 'content',
    type: 'type',
  }

]

const currentPage = ref(5)

const pageSize = ref(10)

const size = ref('default')
const background = ref(true)
const disabled = ref(false)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped>
.demo-pagination-block+.demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>