<script setup>
const user = useSupabaseUser()
</script>

<template>
  <div id="profile">
    <NuxtLink v-if="user" to="/account">
      {{ user.email.split('@')[0] }}
    </NuxtLink>
    <NuxtLink v-else to="/auth">
      Login
    </NuxtLink>
  </div>
</template>