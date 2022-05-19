<template>
  <div class='d-flex fx-center mb-5'>
    <div class='card shadow-1 fx-row rounded-2 grey light-4'>
      <div class='flex fx-col fx-grow'>
        <div class='card-header d-flex centered fx-center pb-0'>
          <p class='score font-s2 m-0 ml-2 mt-2 txt-dark-4'><span
              class='font-w900'>List points: </span>{{ member.score }}</p>
          <p class='position font-s2 m-0 mr-2 mt-2 txt-grey txt-dark-4'>#{{ member.ladsRank }}</p>
          <div class='vself-center'>
            <img :src='member.avatar_url'
                 alt='Profile picture'
                 width='50'
                 class='rounded-4 mr-3'
            />
          </div>
          <p>{{ member.username }}</p>
        </div>
        <div class='card-content txt-center pt-0'>
          <ul>
            <li v-if='totalLength > 0'>
              <h2 class='font-s5'>Hardest demon</h2>
              <a class='font-w900' :href='hardest.video' target='_blank'>{{ hardest.name }}
                <span class='font-w100 txt-grey txt-light-1 font-s2'>(#{{ hardest.position }})</span>
              </a>
            </li>
            <li v-else>
              <h2>0 LIST DEMONS BEATEN LOL</h2>
            </li>

            <div class='divider mt-3'/>
            <li v-if='totalLength > 0'>
              <h2 class='font-s5'>Demons completed <span
                  class='font-w100 txt-grey txt-light-1 font-s3'>({{ member.records.length }})</span></h2>
              <div>
                <div v-if='main.length > 0'>
                  <h3 class='font-s3'>Main list <span
                      class='font-w100 txt-grey txt-light-1 font-s2'>({{ main.length }})</span></h3>
                  <ul class='grix xs1 sm2 md3 txt-left pl-0'>
                    <a v-for='demon of main' :key='demon.position' :href='demon.video' target='_blank'
                       class='font-w800'>- {{ demon.name }} <span
                        class='font-w100 txt-grey txt-light-1 font-s2'>#{{ demon.position }}</span>
                    </a>
                  </ul>
                </div>

                <div v-if='extended.length > 0'>
                  <h3 class='font-s3'>Extended list <span
                      class='font-w100 txt-grey txt-light-1 font-s2'>({{ extended.length }})</span></h3>
                  <ul class='grix xs1 sm2 md3 txt-left pl-0'>
                    <a v-for='demon of extended' :key='demon.position' :href='demon.video' target='_blank'>-
                      {{ demon.name }} <span class='font-w100 txt-grey txt-light-1 font-s2'>#{{
                          demon.position
                        }}</span>
                    </a>
                  </ul>
                </div>

                <div v-if='legacy.length > 0'>
                  <h3 class='font-s3'>Legacy list <span
                      class='font-w100 txt-grey txt-light-1 font-s2'>({{ legacy.length }})</span></h3>
                  <ul class='grix xs1 sm2 md3 txt-left pl-0'>
                    <a v-for='demon of legacy' :key='demon.position' class='legacy txt-grey font-w400'
                       :href='demon.video' target='_blank'>- {{ demon.name }}</a>
                  </ul>
                </div>
              </div>
            </li>

            <div v-if='totalLength > 0' class='divider mt-3'/>

            <li v-if='verified.length > 0'>
              <h2 class='font-s5'>Demons verified <span
                  class='font-w100 txt-grey txt-light-1 font-s2'>({{ verified.length }})</span></h2>
              <ul class='grix xs1 sm2 md3 txt-left pl-0'>
                <li v-for='demon of verified' :key='demon.position' class='font-w800'>- {{ demon.name }} <span
                    class='font-w100 txt-grey txt-light-1 font-s2'>#{{ demon.position }}</span>
                </li>
              </ul>
            </li>

            <div v-if='verified.length > 0' class='divider mt-3'/>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerCard',
  props: ['member'],
  computed: {
    totalLength() {
      return this.main.length + this.extended.length + this.legacy.length
    },
    records() {
      let recordsDemons = this.member.records
      recordsDemons = recordsDemons.filter(record => record.progress === 100)
      return recordsDemons.map(record => ({...record.demon, video: record.video}))
    },
    hardest() {
      let hardestDemon = this.records
      hardestDemon = hardestDemon.sort(function (a, b) {
        return a.position - b.position
      })

      let verifiedDemon = this.member.verified
      if (verifiedDemon.length > 0) {
        verifiedDemon = verifiedDemon.sort(function (a, b) {
          return a.position - b.position
        })

        return verifiedDemon[0].position > hardestDemon[0].position ? hardestDemon[0] : verifiedDemon[0]
      }

      return hardestDemon.length > 0 ? hardestDemon[0] : []
    },
    main() {
      let mainlistDemons = this.records
      mainlistDemons = mainlistDemons.filter(demon => demon.position <= 75)

      return mainlistDemons.sort(function (a, b) {
        return a.position - b.position
      })
    },
    extended() {
      let extendedlistDemons = this.records
      extendedlistDemons = extendedlistDemons.filter(demon => demon.position > 75 && demon.position <= 150)
      return extendedlistDemons.sort(function (a, b) {
        return a.position - b.position
      })
    },
    legacy() {
      let legacylistDemons = this.records
      legacylistDemons = legacylistDemons.filter(demon => demon.position > 150)
      return legacylistDemons.sort(function (a, b) {
        return a.position - b.position
      })
    },
    verified() {
      let verifiedDemons = this.member.verified
      return verifiedDemons.sort(function (a, b) {
        return a.position - b.position
      })
    }
  }
}
</script>

<style scoped>
.position {
  position: absolute;
  top: 0;
  right: 0;
}

.score {
  position: absolute;
  top: 0;
  left: 0;
}

.legacy {
  font-style: italic;
}

ul {
  list-style: none;
}

@media screen and (min-width: 850px) {
  .card {
    min-width: 800px;
  }


}
</style>
