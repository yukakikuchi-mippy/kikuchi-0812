<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h2 class="text-h4 font-weight-bold my-6 text-center">ぬいぐるみ 登録ページ</h2> <!-- ここまで前回の課題と同じ感じ -->

        <!-- ID入力  v-modelの:valueはエラーになった。つけなくてよさそう。v-text-fieldででてきたサイトからいじったやつとレクのを合わせた-->
        <v-text-field
          class="mb-4"
          v-model="ID"     
          label="ID（整数値）を入力してください"
          placeholder="例：5"
          counter="4"
          color="green darken-5"
          clearable
          outlined
          maxlength="4"
        ></v-text-field>


        <!-- Name入力-->
        <v-text-field
          class="mb-4"
          v-model="Name"     
          label="名前を入力してください"
          placeholder="例：うさこ"
          counter="30"
          color="green darken-5"
          clearable
          outlined
          maxlength="30"
        ></v-text-field>

        <!-- Type入力 -->
        <v-text-field
          class="mb-4"
          v-model="Type"     
          label="種類を入力してください"
          placeholder="例：うさぎ"
          counter="30"
          color="green darken-5"
          clearable
          outlined
          maxlength="30"
        ></v-text-field>

        <!-- 登録ボタン レクのから配置と大きさいじった-->
        <v-btn
          v-on:click="addData"
          color="indigo"
          dark
          class="mt-4 mx-auto"
          block
          height="50"
        >
          登録する
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

//前回の課題・レクのJSコード参考
export default {
  name: 'RegisterView',
  data() {
    // Vue内部で使いたい変数は全てこの中に定義する
    return {
      ID: '',
      Name: '',
      Type: '',
      errorMessage: '', //エラー用
      successMessage: ''      //成功用
    };
  },
  methods: {
    async addData() {
     
      //NameとTypeの入力チェック（空白ならエラーメッセージ）
      if (!this.Name || !this.Type) {
        this.errorMessage = 'すべての項目を入力してください';
        return;
      }

      //メッセージ初期化あったほうがいい後付けした
      this.errorMessage = '';
      this.successMessage = '';

      //POSTメソッドで送るパラメーターを作成
      const param = {
        ID: this.ID,
        Name: this.Name,
        Type: this.Type
      };

    //エラー時用に try catchでエラー表示がわかりやすいと考えた（新人研修の時そうだった）
     //INSERT用のAPIを呼び出し
      try {
        await axios.post('https://m3h-kikuchi-0804-2-gdaxhhcjh8a0hsah.japaneast-01.azurewebsites.net/api/INSERT?', param);//一覧で登録できたかは確認する

        //成功時
        this.successMessage = `登録しました`;
        //成功したら入力中身リセット
        this.ID = '';
        this.Name = '';
        this.Type = '';

        // 1秒後に一覧ページに移動
        setTimeout(() => {
          this.$router.push('/list');
        }, 1000);

        
      } catch (error) {
        //失敗時
        console.error(error);
        this.errorMessage = '登録に失敗しました';
      }
    }
  }
};
</script>