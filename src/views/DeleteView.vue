<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h2 class="text-h4 font-weight-bold my-6 text-center">ぬいぐるみ 削除ページ</h2>

        <!--ID入力、登録と同じ-->
        <v-text-field
          class="mb-4"
          v-model="ID"
          label="削除するIDを入力してください"
          placeholder="例：1"
          counter="3"
          color="red darken-1"
          clearable
          outlined
          maxlength="4"
        ></v-text-field>

        <!--削除ボタン 登録と同じ-->
        <v-btn
          v-on:click="deleteData"
          color="red darken-1"
          dark
          class="mt-4 mx-auto"
          block
          height="50"
        >
          削除する
        </v-btn>

        <!--エラーメッセージ-->
        <v-alert v-if="errorMessage" type="error" class="mt-4">
          {{ errorMessage }}
        </v-alert>

        <!--成功メッセージ-->
        <v-alert v-if="successMessage" type="success" class="mt-4">
          {{ successMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DeleteView',
  data() {
    return {
      ID: '',                 //削除するID
      errorMessage: '',       //エラー用
      successMessage: ''      //成功用
    };
  },
  methods: {
    async deleteData() {
      //メッセージ初期化
      this.errorMessage = '';
      this.successMessage = '';

      //入力チェック（IDが未入力や数字でない場合）
      if (!this.ID || isNaN(this.ID)) {
        this.errorMessage = '削除するIDを数字で入力してください';
        return;
      }

      //POSTメソッドで送るパラメーターを作成
      const param = {
        ID: this.ID
      };

      try {
        //DELETE用のAPIを呼び出し
        await axios.post('https://m3h-kikuchi-0804-2-gdaxhhcjh8a0hsah.japaneast-01.azurewebsites.net/api/DELETE?', param);

        //成功時
        this.successMessage = `ID: ${this.ID} を削除しました`;
        this.ID = ''; //入力リセット

      } catch (error) {
        console.error(error);
        this.errorMessage = '削除に失敗しました';
      }
    }
  }
};
</script>
