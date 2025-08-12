<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold my-6 text-center">ぬいぐるみ 一覧ページ</h2>

    <!-- 一覧表 v-data-table vuetify公式サイトの一番上基本ぽいやつ-->
    <v-data-table
      :headers="headers"
      :items="dataList"
      :items-per-page="5"
      class="elevation-1"
    >
      <!-- v-data-tableのslotのとこ参考 -->
      <template v-slot:body="{ items }">
        <tbody>
            <tr v-for="item in items" :key="item.ID">
            <td>{{ item.ID }}</td>
            <td>{{ item.Name }}</td>
            <td>{{ item.Type }}</td>
            </tr>
        </tbody>
      </template>
 </v-data-table>


    <!-- エラーメッセージ -->
    <v-alert v-if="errorMessage" type="error" class="mt-4">
      {{ errorMessage }}
    </v-alert>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListView',
  data() {
    return {
      dataList:[], //一覧データを格納
      errorMessage: '',//エラー用

      //v-data-table vuetify公式サイトのscript参考
      headers: [
        { text: 'ID', value: 'ID' },
        { text: '名前', value: 'Name' },
        { text: '種類', value: 'Type' }
      ]
    };
  },
 
  //axiosを使ってVue.jsアプリからHTTPリクエストを送信するコード サイトから
  methods: {
    async fetchData() {
      try {
        //select用のAPIを呼び出し
        const response = await axios.get('https://m3h-kikuchi-0804-2-gdaxhhcjh8a0hsah.japaneast-01.azurewebsites.net/api/SELECT?');
        // APIから返ってきたデータをdataListにセット
        this.dataList = response.data.List;
      } catch (error) {
        console.error(error);
        this.errorMessage = 'データの取得に失敗しました';
      }
    }
  },
   mounted() {
    this.fetchData(); //ページ表示時に呼び出し
  }
};
</script>
