<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="alert" data-test-id="error-item">
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
    {{ message }}
  </div>
</template>

<style scoped>
/* The alert message box */
.alert {
  padding: 20px;
  background-color: #f44336; /* Red */
  color: white;
  margin-bottom: 15px;
}

/* The close button */
.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

/* When moving the mouse over the close button */
.closebtn:hover {
  color: black;
}
</style>
