<template>
  <vuescroll ref="mainContainer" @handle-scroll="handleScroll">
    
    <div class="headline text-h3 text-center my-6">Home</div>

    <v-container class="text-center">
      <div v-if="$store.getters.videosTotal==0">
        <img alt="AMDB" width="200" height="200" :src="logoPath">
        <h2 class="mt-8">Welcome to Adult Video Database application!</h2>
        <v-divider class="my-10"></v-divider>
      </div>
      <v-row v-else>
        <v-col cols="12" sm="6">
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  Total videos: {{$store.getters.videosTotal}}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  {{$store.state.quantityRecentVideos}} recently added videos
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <div class="recent-videos-grid"> 
              <v-hover v-for="video in recentVideos" :key="video.id">
                <template v-slot:default="{ hover }">
                  <v-img :src="getVideoThumbUrl(video.id)" 
                    @click="playVideo(video.path)" aspect-ratio="1"
                  >
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="primary">
                        <v-btn icon x-large outlined>
                          <v-icon>mdi-play</v-icon>
                        </v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-img>
                </template>
              </v-hover>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined class="ma-2" color="primary" to="/videos">Open Videos</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  Total performers: {{$store.getters.performersTotal}}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Top {{$store.state.quantityRecentVideos}} best performers by rating
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <div class="top-performers-grid"> 
              <v-hover v-for="perf in topPerformers" :key="perf.id">
                <template v-slot:default="{ hover }">
                  <v-img :src="getPerformerImg(perf.id)" aspect-ratio="1"
                    @click="openPerformerPage(perf.id)" position="top"
                  >
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="primary">
                        <v-btn x-small height="auto" width="auto" class="pa-1" outlined>
                          {{perf.name}}
                        </v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-img>
                </template>
              </v-hover>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined class="ma-2" color="primary" to="/performers">Open Performers</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  Total tags: {{$store.getters.tagsTotal}}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Top most used tags in videos
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            
            <v-card-text>
              <apexchart type="pie" height="320" :options="chartOptionsTags" :series="seriesTags"/>
            </v-card-text>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined class="ma-2" color="primary" to="/tags">Open tags</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  Total websites: {{$store.getters.websitesTotal}}
                </v-list-item-title>
                <v-list-item-subtitle class="caption">
                  Top websites by number of videos
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-text>
              <apexchart type="pie" height="320" :options="chartOptionsWebsites" :series="seriesWebsites"/>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined class="ma-2" color="primary" to="/websites">Open websites</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card hover to="/settings">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="">
                  Add new videos, change theme colors and more
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined class="ma-2" color="primary" to="/settings">Open settings</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <div v-if="$store.getters.videosTotal==0">
        <h2>First of all add videos in settings</h2>
        <v-btn class="ma-2" color="primary" to="/settings">Open settings</v-btn>
      </div>
    </v-container>
    <div v-show="$store.getters.navigationSide=='0'" class="py-6"></div>
    
    <v-btn @click="scrollToTop" v-show="isScrollToTopVisible" 
      class="scroll-to-top" fixed fab color="primary">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </vuescroll>
</template>

<script>
const path = require('path')
const fs = require('fs')
const shell = require('electron').shell

import vuescroll from 'vuescroll'
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'HomePage',
  components: {
    vuescroll,
    apexchart: VueApexCharts,
  },
  mounted() {
    this.$nextTick(function () {
    })
  },
  data: ()=>({
    seriesTags: [],
    seriesWebsites: [],
    isScrollToTopVisible: false,
  }),
  computed: {
    logoPath() {
      return path.join(__static, '/icons/icon.png')
    },
    recentVideos() {
      let qnt = this.$store.state.quantityRecentVideos
      return this.$store.getters.videos
        .orderBy('date', ['desc'])
        .take(qnt)
        .value()
    },
    topPerformers() {
      let qnt = this.$store.state.quantityRecentVideos
      return this.$store.getters.performers
        .orderBy('rating', ['desc'])
        .take(qnt)
        .value()
    },
    topTags() {
      let tagUsage = this.$store.getters.tags.map(tag=>{
        let videos = this.$store.getters.videos.filter(video=>(video.tags.includes(tag.name))).value()
        return {
          tagId: tag.id,
          tagColor: tag.color,
          tagName: tag.name,
          videos: videos.length
        }
      }).value()
      tagUsage = _.orderBy(tagUsage, ['videos'], ['desc'])
      tagUsage = tagUsage.slice(0,9)
      return tagUsage
    },
    chartOptionsTags(){
      let chartOptions = {
        labels: [], // push here name of tag
        colors: [], // push here colors of tag
        stroke: {
          width: 1
        },
        legend: {
          labels: {
            colors: '#909090',
          },
          itemMargin: {
              horizontal: 5,
              vertical: 5
          },
          position: 'left',
          fontSize: '14px',
        }
      }
      for (const tag of this.topTags) {
        this.seriesTags.push(tag.videos)
        chartOptions.labels.push(tag.tagName)
        if (tag.tagColor) {
          chartOptions.colors.push(tag.tagColor)
        } else chartOptions.colors.push('#9b9b9b')
      }
      return chartOptions
    },
    topWebsites() {
      let websiteUsage = this.$store.getters.websites.map(website=>{
        let videos = this.$store.getters.videos.filter(video=>(video.website===website.name)).value()
        return {
          websiteId: website.id,
          websiteColor: website.color,
          websiteName: website.name,
          videos: videos.length
        }
      }).value()
      let unknown = this.$store.getters.videos.filter(video=>(video.website==='')).value()
      websiteUsage.push({
        websiteId: null,
        websiteColor: null,
        websiteName: 'Unknown',
        videos: unknown.length
      })
      websiteUsage = _.orderBy(websiteUsage, ['videos'], ['desc'])
      websiteUsage = websiteUsage.slice(0,9)
      return websiteUsage
    },
    chartOptionsWebsites(){
      let chartOptions = {
        labels: [], // push here name of website
        colors: [], // push here colors of website
        stroke: {
          width: 1
        },
        legend: {
          labels: {
            colors: '#909090',
          },
          itemMargin: {
              horizontal: 5,
              vertical: 5
          },
          position: 'left',
          fontSize: '14px',
        }
      }
      for (const website of this.topWebsites) {
        this.seriesWebsites.push(website.videos)
        chartOptions.labels.push(website.websiteName)
        if (website.websiteColor) {
          chartOptions.colors.push(website.websiteColor)
        } else chartOptions.colors.push('#9b9b9b')
      }
      return chartOptions
    },
    pathToUserData() {
      return this.$store.getters.getPathToUserData
    },
  },
  methods: {
    scrollToTop() {
      this.$refs.mainContainer.scrollTo({y: 0},500,"easeInQuad")
    },
    handleScroll(vertical) {
      if (vertical.scrollTop > 150) {
        this.isScrollToTopVisible = true
      } else this.isScrollToTopVisible = false
    },
    getVideoThumbUrl(videoId) {
      let imgPath = path.join(this.pathToUserData, `/media/thumbs/${videoId}.jpg`)
      return this.checkVideoImageExist(imgPath)+'?lastmod='+Date.now()
    },
    getVideoUrl(videoId) {
      let videoPath = path.join(this.pathToUserData, `/media/previews/${videoId}.mp4`)
      return this.checkVideoExist(videoPath)+'?lastmod='+Date.now()
    },
    checkVideoImageExist(imgPath) {
      if (fs.existsSync(imgPath)) {
        return imgPath
      } else {
        return path.join(this.pathToUserData, '/img/templates/thumb.jpg')
      }
    },
    playVideo(pathToVideo) {
      if (!fs.existsSync(pathToVideo)) {
        this.$store.state.Videos.dialogErrorPlayVideo = true
        this.$store.state.Videos.errorPlayVideoPath = pathToVideo
        return
      }
      shell.openItem(pathToVideo)
    },
    getPerformerImg(id) {
      let imgAvaPath = this.getPerformerImgUrl(id + '_avatar.jpg')
      let imgMainPath = this.getPerformerImgUrl(id + '_main.jpg')
      return this.checkAvatarImageExist(imgAvaPath, imgMainPath)
    },
    getPerformerImgUrl(img) {
      return  path.join(this.pathToUserData, `/media/performers/${img}`)
    },
    checkAvatarImageExist(imgAvaPath, imgMainPath) {
      if (fs.existsSync(imgAvaPath)) {
        return imgAvaPath
      } else if (fs.existsSync(imgMainPath)) {
        return imgMainPath
      } else {
        return path.join(this.pathToUserData, '/img/templates/performer.png')
      }
    },
    openPerformerPage(id) {
      this.$router.push(`/performer/:${id}?tabId=default`)
    },
  },
}
</script>

<style lang="less">
  .recent-videos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12%, 20%));
    .v-image {
      cursor: pointer;
    }
  }
  .top-performers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15%, 20%));
    .v-image {
      cursor: pointer;
    }
    .v-btn {
      max-width: 90%;
      min-width: 0 !important;
    }
    .v-btn__content {
      white-space: normal;
      max-width: 100%;
      font-size: 8px;
    }
  }
</style>