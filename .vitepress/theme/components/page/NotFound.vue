<template>
    <v-card class="mt-n16">
        <v-img src="https://api.dujin.org/bing/1920.php" height="200px" cover></v-img>
        <v-card-title>你要找的页面不存在啦</v-card-title>
        <v-container>
            <p class="text-body-1 mb-3">你请求的页面返回了 404 错误，请检查 URL 地址是否输入正确，亦或是被删除啦。</p>
            <v-btn prepend-icon="arrow_back" href="/">
                返回主页
            </v-btn>
        </v-container>
    </v-card>
</template>