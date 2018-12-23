<template>
  <v-layout column>
    <v-flex sm10>
      <div>
        <p>文章を入力すると、ゆめかわになって返ってくるよ！</p>
      </div>
      <v-card>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-text-field
            v-model="text"
            :rules="textRules"
            label="text"
            required
          />
          <v-btn
            color="yellow"
            @click="submit"
          >ゆめかわっ！</v-btn>
          <v-btn
            @click="clear"
          >リセット</v-btn>
        </v-form>
        <v-text-field
          v-model="after"
          label="after"
        />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    text: '',
    textRules: [
      v => !!v || '空っぽはユメだめぇ'
    ],
    after: ''
  }),
  methods: {
    submit() {
      console.log(this.text)
      if (this.$refs.form.validate()) {
        // const protocol = location.protocol
        // const host = location.hostname
        // const baseURL = `${protocol}//${host}`
        // console.log(baseURL)
        this.$axios.$post('/api', { text: this.text })
                   .then((res) => {
                     console.log(res)
                     this.after = res.text
                   })
                   .catch((err) => {
                     console.log(err)
                   })
      }
    },
    clear() {
      this.$refs.form.reset()
      this.after = ''
    }
  }
}
</script>
