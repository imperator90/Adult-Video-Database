<script>
export default {
  methods: {
    getVideosTotalSize(videos) {
      let sizes = videos.map(video=>(video.size))
      let total = 0
      for (let i=0; i<sizes.length; i++) {
        total += sizes[i]
      }
      if (total > 1000000000000) {
        total = (total/1024/1024/1024/1024-0.01).toFixed(2) + ' TB'
      } else if (total > 1000000000) {
        total = (total/1024/1024/1024-0.01).toFixed(2) + ' GB'
      } else if (total > 1000000) {
        total = (total/1024/1024-0.01).toFixed(0) + ' MB'
      } else if (total > 1000) {
        total = (total/1024-0.01).toFixed(0) + ' KB'
      } else {
        total += ' B'
      }
      return total
    },
    calcSize(size) {
      if (size > 1000000000000) {
        size = (size/1024/1024/1024/1024-0.01).toFixed(2) + ' TB'
      } else if (size > 1000000000) {
        size = (size/1024/1024/1024-0.01).toFixed(2) + ' GB'
      } else if (size > 1000000) {
        size = (size/1024/1024-0.01).toFixed(0) + ' MB'
      } else if (size > 1000) {
        size = (size/1024-0.01).toFixed(0) + ' KB'
      } else {
        size += ' B'
      }
      return size
    },
    calcBitrate(value) {
      if (value > 1000000) {
        value = (value/1024/1024-0.01).toFixed(0) + ' Mbps'
      } else if (value > 1000) {
        value = (value/1024-0.01).toFixed(0) + ' Kbps'
      } else {
        value += ' bps'
      }
      return value
    },
  },
}
</script>