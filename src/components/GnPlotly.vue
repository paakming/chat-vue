<template>  
    <div :id="`chart-container-${entry.chartId}`" style="width: 600px; height: 400px;"></div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import Plotly from 'plotly.js-dist-min';

// 渲染图表的函数
const renderChart = (chartId) => {
    const trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 11, 12, 13],
        mode: 'lines+markers',
        type: 'scatter'
    };

    const data = [trace1];

    const layout = {
        title: '简单的折线图',
        width: 600,
        height: 400
    };

    Plotly.newPlot(`chart-container-${chartId}`, data, layout);
};

// 定义 props 并保证它们是响应式的
const props = defineProps({
    entry: {
        type: Object,
        required: true
    }
});


onMounted(() => {
    if (props.entry && props.entry.chartId) {
        debugger
        renderChart(props.entry.chartId);
    }

});


</script>