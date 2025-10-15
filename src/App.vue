<script setup lang="ts"></script>

<template>
	<router-view v-slot="{ Component, route }">
		<component :is="Component" :key="route.path" class="page-wrapper" />
	</router-view>
</template>

<style lang="scss" scoped></style>
