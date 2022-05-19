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
            <li v-if='main.length + extended.length + legacy.length > 0'>
              <h2 class='font-s5'>Hardest demon</h2>
                <a class='font-w900' :href='hardest.video' target='_blank'>{{ hardest.name }}
                  <span class='font-w100 txt-grey txt-light-1 font-s2'>(#{{ hardest.position }})</span>
                </a>
            </li>
            <li v-else>
              <h2>0 LIST DEMONS BEATEN LOL</h2>
            </li>

            <div class='divider mt-3' />
            <li v-if='main.length + extended.length + legacy.length > 0'>
              <h2 class='font-s5'>Demons completed <span
                class='font-w100 txt-grey txt-light-1 font-s3'>({{ member.records.length }})</span></h2>
              <div>
                <div v-if='main.length > 0'>
                  <h3 class='font-s3'>Main list <span
                    class='font-w100 txt-grey txt-light-1 font-s2'>({{ main.length }})</span></h3>
                  <ul class='grix xs1 sm2 md3 txt-left pl-0'>
                    <span v-for='demon of main' :key='demon.position'>
                    <a :href='demon.video' target='_blank' class='font-w800'>- {{ demon.name }} <span
                      class='font-w100 txt-grey txt-light-1 font-s2'>#{{ demon.position }}</span>
                    </a>
                      </span>
                  </ul>
                </div>

                <div v-if='extended.length > 0'>
                  <h3 class='font-s3'>Extended list <span
                    class='font-w100 txt-grey txt-light-1 font-s2'>({{ extended.length }})</span></h3>
                  <ul class='grix xs1 sm2 md3 txt-left pl-0'>
                    <span v-for='demon of extended' :key='demon.position'>
                    <a :href='demon.video' target='_blank'>- {{ demon.name }} <span class='font-w100 txt-grey txt-light-1 font-s2'>#{{ demon.position
                      }}</span>
                    </a>
                      </span>
                  </ul>
                </div>

                <div v-if='legacy.length > 0'>
                  <h3 class='font-s3'>Legacy list <span
                    class='font-w100 txt-grey txt-light-1 font-s2'>({{ legacy.length }})</span></h3>
                  <ul class='grix xs1 sm2 md3 txt-left pl-0'>
                    <span v-for='demon of legacy' :key='demon.position'>
                    <a class='legacy txt-grey font-w400' :href='demon.video' target='_blank'>- {{ demon.name }}</a>
                    </span>
                  </ul>
                </div>
              </div>
            </li>

            <div v-if='main.length + extended.length + legacy.length > 0' class='divider mt-3' />

            <li v-if='verified.length > 0'>
              <h2 class='font-s5'>Demons verified <span
                class='font-w100 txt-grey txt-light-1 font-s2'>({{ verified.length }})</span></h2>
              <ul class='grix xs1 sm2 md3 txt-left pl-0'>
                    <span v-for='demon of verified' :key='demon.position'>
                    <li class='font-w800'>- {{ demon.name }} <span
                      class='font-w100 txt-grey txt-light-1 font-s2'>#{{ demon.position }}</span>
                    </li>
                      </span>
              </ul>
            </li>

            <div v-if='verified.length > 0' class='divider mt-3' />
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
    records() {
      let records = this.member.records
      records = records.filter(record => record.progress === 100)
      return records.map(record => ({ ...record.demon, video: record.video }))
    },
    hardest() {
      let demons = this.records
      demons = demons.sort(function(a, b) {
        return a.position - b.position
      })

      let verified = this.member.verified
      if (verified.length > 0) {
        verified = verified.sort(function(a, b) {
          return a.position - b.position
        })

        return verified[0].position > demons[0].position ? demons[0] : verified[0]
      }

      return demons.length > 0 ? demons[0] : []
    },
    main() {
      let demons = this.records
      demons = demons.filter(demon => demon.position <= 75)

      demons = demons.sort(function(a, b) {
        return a.position - b.position
      })
      return demons
    },
    extended() {
      let demons = this.records
      demons = demons.filter(demon => demon.position > 75 && demon.position <= 150)
      demons = demons.sort(function(a, b) {
        return a.position - b.position
      })
      return demons
    },
    legacy() {
      let demons = this.records
      demons = demons.filter(demon => demon.position > 150)
      demons = demons.sort(function(a, b) {
        return a.position - b.position
      })
      return demons
    },
    verified() {
      let demons = this.member.verified
      demons = demons.sort(function(a, b) {
        return a.position - b.position
      })
      return demons
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
